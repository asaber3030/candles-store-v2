"use server"

import prisma from "@/shared/api/prisma"

import { Product } from "@/shared/models/product.model"
import { Prisma } from "@prisma/client"
import { CreateProductReviewSchema, CreateProductSchema, CreateProductSizeSchema } from "../model/product.schema"
import { TCreateProductColorPayload, TCreateProductPayload, TCreateProductReviewPayload, TCreateProductSizePayload } from "../model/product"
import { ZodError } from "zod"

import { deleteFromCloudinary, uploadToCloudinary } from "@/shared/api/cloudinary"
import { createPaginatedResponse, extractCloudinaryPublicId } from "@/shared/lib/functions"
import { actionResponse } from "@/shared/lib/api"
import { defaultValues } from "@/shared/config/defaults"
import { revalidatePath } from "next/cache"
import { adminRoutes, userRoutes } from "@/shared/config/routes"
import { generateSKU, slugify } from "@/shared/lib/strings"
import { getCurrentUser } from "@/entities/auth/api/auth.api"
import { safeParseNumber } from "@/shared/lib/numbers"

export async function getProductsPaginated(sp: TObject = {}) {
  try {
    const page = safeParseNumber(sp.page, 1)
    const pageSize = safeParseNumber(sp.pageSize, 10)
    const minPrice = safeParseNumber(sp.minPrice, 0)
    const maxPrice = safeParseNumber(sp.maxPrice, 0)
    const categoryId = safeParseNumber(sp.categoryId, 0)

    let where: Prisma.ProductWhereInput = {}

    if (sp.minPrice && !isNaN(Number(sp.minPrice))) {
      where.price = { gte: minPrice }
    }
    if (sp.maxPrice && !isNaN(Number(sp.maxPrice))) {
      where.price = { lte: maxPrice }
    }
    if (sp.categoryId && !isNaN(Number(sp.categoryId))) {
      where.categoryId = categoryId
    }
    if (sp.search) {
      where.name = { contains: String(sp.search) }
    }

    const products = await prisma.product.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where,
      include: {
        category: true,
        pictures: true
      }
    })

    const total = await prisma.product.count({ where })

    return createPaginatedResponse(products, total, page, pageSize)
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching paginated products")
  }
}

export async function getCategoryProductsPaginated(categoryId: number, sp: TObject = {}) {
  try {
    const page = safeParseNumber(sp.page, 1)
    const pageSize = safeParseNumber(sp.pageSize, 10)
    const minPrice = safeParseNumber(sp.minPrice, 0)
    const maxPrice = safeParseNumber(sp.maxPrice, 0)

    let where: Prisma.ProductWhereInput = { categoryId }

    if (sp.minPrice && !isNaN(Number(sp.minPrice))) {
      where.price = { gte: minPrice }
    }
    if (sp.maxPrice && !isNaN(Number(sp.maxPrice))) {
      where.price = { lte: maxPrice }
    }

    if (sp.search) {
      where.name = { contains: String(sp.search) }
    }

    const products = await prisma.product.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where,
      include: {
        category: true,
        pictures: true
      }
    })

    const total = await prisma.product.count({ where })

    return createPaginatedResponse(products, total, page, pageSize)
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching paginated products")
  }
}

export async function getFeaturedProducts(limit: number = 6) {
  try {
    const products = await prisma.product.findMany({
      take: limit,
      where: {},
      include: { category: true }
    })

    return products
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching featured products")
  }
}

export async function getProduct(productId: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
        pictures: true,
        sizes: true,
        reviews: { include: { user: true } },
        colors: true
      }
    })
    return product
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching product")
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        pictures: true,
        sizes: true,
        reviews: { include: { user: true } },
        colors: true
      }
    })
    return product
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching product")
  }
}

export async function userHasReviewedProduct(productId: number) {
  try {
    const currentUser = await getCurrentUser()
    const review = await prisma.productReview.findFirst({
      where: { productId, userId: currentUser?.id },
      select: { id: true }
    })
    return !!review
  } catch (error) {
    console.log(error)
    throw new Error("Error checking product review")
  }
}

export async function createProductReviewAction(productId: number, data: TCreateProductReviewPayload) {
  try {
    const parsed = CreateProductReviewSchema.parse(data)

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, slug: true }
    })
    if (!existingProduct) {
      return actionResponse({
        status: 400,
        message: "Product does not exist"
      })
    }

    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return actionResponse({
        status: 401,
        message: "Unauthorized"
      })
    }

    const review = await prisma.productReview.findFirst({
      where: { productId, userId: currentUser.id },
      select: { id: true }
    })
    if (review) {
      return actionResponse({
        status: 400,
        message: "You have already reviewed this product"
      })
    }

    const newReview = await prisma.productReview.create({
      data: {
        productId,
        userId: currentUser.id,
        rate: parsed.rate,
        review: parsed.review
      }
    })

    revalidatePath(userRoutes.products.viewBySlug(existingProduct.slug || ""))

    return actionResponse({
      status: 201,
      message: "Your review has been submitted successfully",
      data: newReview
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return actionResponse({
        status: 400,
        message: "Invalid input data"
      })
    }
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error creating product"
    })
  }
}

export async function deleteProductReviewAction(reviewId: number) {
  try {
    await prisma.productReview.delete({
      where: { id: reviewId }
    })

    return actionResponse({
      status: 200,
      message: "Review deleted successfully"
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error deleting review"
    })
  }
}

/* Admin Actions */

export async function createProductAction(data: TCreateProductPayload, file: File | null) {
  try {
    const parsed = CreateProductSchema.parse(data)

    if (!file) {
      return actionResponse({
        status: 400,
        message: "Please upload a product picture"
      })
    }

    let url = (await uploadToCloudinary(file)).url

    const slug = slugify(parsed.name)
    const sku = generateSKU(parsed.name)
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
      select: { id: true }
    })
    if (existingProduct) {
      return actionResponse({
        status: 400,
        message: "A product with this name already exists"
      })
    }

    const existingSKU = await prisma.product.findUnique({
      where: { sku },
      select: { id: true }
    })
    if (existingSKU) {
      return actionResponse({
        status: 400,
        message: "A product with this SKU already exists"
      })
    }

    const newProduct = await prisma.product.create({
      data: {
        slug,
        sku,
        name: parsed.name,
        picture: url,
        description: parsed.description,
        longDescription: parsed.longDescription,
        price: parsed.price,
        offerPrice: parsed.offerPrice,
        categoryId: parsed.categoryId,
        quantity: parsed.quantity
      }
    })

    return actionResponse({
      status: 201,
      message: "Product created successfully",
      data: newProduct
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return actionResponse({
        status: 400,
        message: "Invalid input data"
      })
    }
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error creating product"
    })
  }
}

export async function updateProductAction(productId: number, data: TCreateProductPayload, file: File | null) {
  try {
    const parsed = CreateProductSchema.parse(data)

    const oldProduct = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, picture: true, slug: true, sku: true, name: true }
    })

    if (!oldProduct) {
      return actionResponse({
        status: 404,
        message: "Product not found"
      })
    }

    let url = oldProduct.picture
    if (file) {
      url = (await uploadToCloudinary(file)).url
    }

    const slug = slugify(parsed.name)
    const sku = generateSKU(parsed.name)

    const existingProduct = await prisma.product.findUnique({
      where: { slug },
      select: { id: true }
    })

    if (existingProduct && existingProduct.id !== productId) {
      return actionResponse({
        status: 400,
        message: "A product with this name already exists"
      })
    }

    const existingSKU = await prisma.product.findUnique({
      where: { sku },
      select: { id: true }
    })

    if (existingSKU && existingSKU.id !== productId) {
      return actionResponse({
        status: 400,
        message: "A product with this SKU already exists"
      })
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        slug,
        sku,
        name: parsed.name,
        picture: url,
        description: parsed.description,
        longDescription: parsed.longDescription,
        price: parsed.price,
        offerPrice: parsed.offerPrice,
        categoryId: parsed.categoryId,
        quantity: parsed.quantity
      }
    })

    revalidatePath(adminRoutes.products.view(productId))

    return actionResponse({
      status: 200,
      message: "Product updated successfully",
      data: updatedProduct
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return actionResponse({
        status: 400,
        message: "Invalid input data"
      })
    }
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error updating product"
    })
  }
}

export async function deleteProductAction(productId: number) {
  try {
    await prisma.product.update({
      where: { id: productId },
      data: { deletedAt: new Date() }
    })
    revalidatePath(adminRoutes.products.view(productId || 0))

    return actionResponse({
      status: 200,
      message: "Product deleted successfully"
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error deleting product"
    })
  }
}

export async function restoreProductAction(productId: number) {
  try {
    await prisma.product.update({
      where: { id: productId },
      data: { deletedAt: null }
    })
    revalidatePath(adminRoutes.products.view(productId || 0))

    return actionResponse({
      status: 200,
      message: "Product restored successfully"
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error restoring product"
    })
  }
}

/* Product Pictures */

export async function createProductPictureAction(productId: number, file: File | null) {
  try {
    if (!file) {
      return actionResponse({
        status: 400,
        message: "No file provided"
      })
    }
    if (file.size > defaultValues.maxUploadFileSize) {
      return actionResponse({
        status: 400,
        message: "File size exceeds 5MB limit"
      })
    }
    const data = await uploadToCloudinary(file)
    if (!data.url) {
      return actionResponse({
        status: 500,
        message: "Error uploading file to Cloudinary"
      })
    }
    const newPicture = await prisma.productPicture.create({
      data: { productId, picture: data.url }
    })
    revalidatePath(adminRoutes.products.view(newPicture?.productId || 0))

    return actionResponse({
      status: 201,
      message: "Product picture added successfully",
      data: newPicture
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error adding product picture"
    })
  }
}

export async function deleteProductPictureAction(pictureId: number) {
  try {
    const picture = await prisma.productPicture.findUnique({
      where: { id: pictureId }
    })
    const publicId = extractCloudinaryPublicId(picture?.picture || "")
    await deleteFromCloudinary(publicId)
    await prisma.productPicture.delete({
      where: { id: pictureId }
    })
    revalidatePath(adminRoutes.products.view(picture?.productId || 0))
    return actionResponse({
      status: 200,
      message: "Product picture deleted successfully"
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error deleting product picture"
    })
  }
}

/* Product Colors */

export async function createProductColorAction(productId: number, data: TCreateProductColorPayload) {
  try {
    const newColor = await prisma.productColor.create({
      data: {
        productId,
        color: data.color
      }
    })
    revalidatePath(adminRoutes.products.view(newColor?.productId || 0))

    return actionResponse({
      status: 201,
      message: "Product color added successfully",
      data: newColor
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error adding product color"
    })
  }
}

export async function deleteProductColorAction(colorId: number) {
  try {
    const color = await prisma.productColor.update({
      where: { id: colorId },
      data: { deletedAt: new Date() }
    })
    revalidatePath(adminRoutes.products.view(color?.productId || 0))

    return actionResponse({
      status: 200,
      message: "Product color deleted successfully"
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error deleting product color"
    })
  }
}

export async function restoreProductColorAction(colorId: number) {
  try {
    const color = await prisma.productColor.update({
      where: { id: colorId },
      data: { deletedAt: null }
    })
    revalidatePath(adminRoutes.products.view(color?.productId || 0))

    return actionResponse({
      status: 200,
      message: "Product color restored successfully"
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error restoring product color"
    })
  }
}

/* Product Sizes */

export async function createProductSizeAction(productId: number, data: TCreateProductSizePayload) {
  try {
    const parsed = CreateProductSizeSchema.parse(data)
    const newSize = await prisma.productSize.create({
      data: { ...parsed, isCircle: !!parsed.isCircle, productId }
    })
    revalidatePath(adminRoutes.products.view(newSize?.productId || 0))

    return actionResponse({
      status: 201,
      message: "Product size added successfully",
      data: newSize
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error adding product size"
    })
  }
}

export async function updateProductSizeAction(sizeId: number, data: TCreateProductSizePayload) {
  try {
    const parsed = CreateProductSizeSchema.parse(data)
    const updatedSize = await prisma.productSize.update({
      where: { id: sizeId },
      data: { ...parsed, isCircle: !!parsed.isCircle }
    })
    revalidatePath(adminRoutes.products.view(updatedSize?.productId || 0))

    return actionResponse({
      status: 200,
      message: "Product size updated successfully",
      data: updatedSize
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error updating product size"
    })
  }
}

export async function deleteProductSizeAction(sizeId: number) {
  try {
    const size = await prisma.productSize.update({
      where: { id: sizeId },
      data: { deletedAt: new Date() }
    })
    revalidatePath(adminRoutes.products.view(size?.productId || 0))

    return actionResponse({
      status: 200,
      message: "Product size deleted successfully"
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error deleting product size"
    })
  }
}

export async function restoreProductSizeAction(sizeId: number) {
  try {
    const size = await prisma.productSize.update({
      where: { id: sizeId },
      data: { deletedAt: null }
    })
    revalidatePath(adminRoutes.products.view(size?.productId || 0))

    return actionResponse({
      status: 200,
      message: "Product size restored successfully"
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error restoring product size"
    })
  }
}
