"use server"

import prisma from "@/shared/api/prisma"

import { Prisma } from "@prisma/client"
import { Category } from "@/shared/models/category.model"
import { CreateCategorySchema } from "../model/category.schema"
import { TCreateCategoryPayload } from "../model/category"
import { ZodError } from "zod"

import { actionResponse } from "@/shared/lib/api"

export async function getCategoriesPaginated(sp: TObject = {}) {
  try {
    if (!sp.page) sp.page = 1
    if (!sp.pageSize) sp.pageSize = 10

    let where: Prisma.CategoryWhereInput = {}

    if (sp.search) {
      where.name = { contains: String(sp.name) }
    }

    const categories = await Category.paginate({
      page: sp.page,
      pageSize: sp.pageSize,
      orderBy: { [sp.orderBy || "id"]: sp.orderDirection || "asc" },
      where
    })

    return categories
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching paginated categories")
  }
}

export async function getAllCategories(sp: TObject = {}) {
  try {
    let where: Prisma.CategoryWhereInput = {}

    if (sp.search) {
      where.name = { contains: String(sp.search) }
    }

    const categories = await prisma.category.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { [sp.orderBy || "id"]: sp.orderDirection || "asc" },
      include: { _count: { select: { products: true } } }
    })

    return categories
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching all categories")
  }
}

export async function getCategory(categoryId: number) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    })
    return category
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching category")
  }
}

/* Admin Actions */
export async function createCategoryAction(data: TCreateCategoryPayload) {
  try {
    const parsed = CreateCategorySchema.parse(data)
    const newCategory = await prisma.category.create({
      data: parsed
    })
    return actionResponse({
      status: 201,
      message: "Category created successfully",
      data: newCategory
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
      message: error instanceof Error ? error.message : "Error creating category"
    })
  }
}

export async function updateCategoryAction(categoryId: number, data: TCreateCategoryPayload) {
  try {
    const parsed = CreateCategorySchema.parse(data)
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: parsed
    })
    return actionResponse({
      status: 200,
      message: "Category updated successfully",
      data: updatedCategory
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
      message: error instanceof Error ? error.message : "Error updating category"
    })
  }
}

export async function deleteCategoryAction(categoryId: number) {
  try {
    await prisma.category.update({
      where: { id: categoryId },
      data: { deletedAt: new Date() }
    })
    return actionResponse({
      status: 200,
      message: "Category deleted successfully"
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error deleting Category"
    })
  }
}

export async function restoreCategoryAction(categoryId: number) {
  try {
    await prisma.category.update({
      where: { id: categoryId },
      data: { deletedAt: null }
    })
    return actionResponse({
      status: 200,
      message: "Category restored successfully"
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error restoring Category"
    })
  }
}
