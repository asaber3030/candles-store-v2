"use server";

import prisma from "@/shared/api/prisma";

import { Prisma } from "@prisma/client";
import { Category } from "@/shared/models/category.model";
import { CreateCategorySchema } from "../model/category.schema";
import { TCreateCategoryPayload } from "../model/category";
import { ZodError } from "zod";

import { actionResponse } from "@/shared/lib/api";
import { uploadToCloudinary } from "@/shared/api/cloudinary";

export async function getCategoriesPaginated(sp: TObject = {}) {
  try {
    if (!sp.page) sp.page = 1;
    if (!sp.pageSize) sp.pageSize = 10;

    let where: Prisma.CategoryWhereInput = {};

    if (sp.search) {
      where.name = { contains: String(sp.name) };
    }

    const categories = await Category.paginate({
      page: sp.page,
      pageSize: sp.pageSize,
      orderBy: { [sp.orderBy || "id"]: sp.orderDirection || "asc" },
      where,
    });

    return categories;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching paginated categories");
  }
}

export async function getAllCategories(sp: TObject = {}) {
  try {
    let where: Prisma.CategoryWhereInput = {};

    if (sp.search) {
      where.name = { contains: String(sp.search) };
    }

    const categories = await prisma.category.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { [sp.orderBy || "id"]: sp.orderDirection || "asc" },
      include: { _count: { select: { products: true } } },
    });

    return categories;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching all categories");
  }
}

export async function getCategory(categoryId: number) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    return category;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching category");
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
    });
    return category;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching category");
  }
}

export async function getOffersCategory() {
  try {
    const category = await prisma.category.findFirst({
      where: { name: "Offers", deletedAt: null },
    });
    return category;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching category");
  }
}

/* Admin Actions */
export async function createCategoryAction(data: TCreateCategoryPayload, file: File | null) {
  try {
    const parsed = CreateCategorySchema.parse(data);
    const newCategory = await prisma.category.create({
      data: parsed,
    });
    let fileUrl = null;
    if (file) {
      const uploadResult = await uploadToCloudinary(file, "categories");
      fileUrl = uploadResult.url;
    }
    return actionResponse({
      status: 201,
      message: "Category created successfully",
      data: { ...newCategory, icon: fileUrl },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return actionResponse({
        status: 400,
        message: "Invalid input data",
      });
    }
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error creating category",
    });
  }
}

export async function updateCategoryAction(categoryId: number, data: TCreateCategoryPayload, file: File | null = null) {
  try {
    const parsed = CreateCategorySchema.parse(data);
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true, icon: true },
    });
    let fileUrl = category?.icon;

    if (file) fileUrl = (await uploadToCloudinary(file, "categories")).url;

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: { ...parsed, icon: fileUrl },
    });

    return actionResponse({
      status: 200,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return actionResponse({
        status: 400,
        message: "Invalid input data",
      });
    }
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error updating category",
    });
  }
}

export async function deleteCategoryAction(categoryId: number) {
  try {
    await prisma.category.update({
      where: { id: categoryId },
      data: { deletedAt: new Date() },
    });
    return actionResponse({
      status: 200,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error deleting Category",
    });
  }
}

export async function restoreCategoryAction(categoryId: number) {
  try {
    await prisma.category.update({
      where: { id: categoryId },
      data: { deletedAt: null },
    });
    return actionResponse({
      status: 200,
      message: "Category restored successfully",
    });
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error restoring Category",
    });
  }
}
