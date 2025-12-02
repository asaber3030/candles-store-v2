"use server";

import prisma from "@/shared/api/prisma";

import { Prisma } from "@prisma/client";
import { Coupon } from "@/shared/models/coupon.model";
import { CreateCouponSchema } from "../model/coupon.schema";
import { TCreateCouponPayload } from "../model/coupon";
import { ZodError } from "zod";

import { actionResponse } from "@/shared/lib/api";

export async function getCouponsPaginated(sp: TObject = {}) {
  try {
    if (!sp.page) sp.page = 1;
    if (!sp.pageSize) sp.pageSize = 10;

    let where: Prisma.CouponWhereInput = {};

    if (sp.search) {
      where.name = { contains: String(sp.name) };
    }

    const coupons = await Coupon.paginate({
      page: sp.page,
      pageSize: sp.pageSize,
      orderBy: { id: "desc" },
      where,
    });

    return coupons;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching paginated coupons");
  }
}

export async function getAllCoupons(sp: TObject = {}) {
  try {
    let where: Prisma.CouponWhereInput = {};

    if (sp.search) {
      where.name = { contains: String(sp.search) };
    }

    const coupons = await prisma.coupon.findMany({
      where: { ...where, deletedAt: null },
      orderBy: { [sp.orderBy || "id"]: sp.orderDirection || "asc" },
    });

    return coupons;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching all coupons");
  }
}

export async function getCoupon(couponId: number) {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: { id: couponId },
    });
    return coupon;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching coupon");
  }
}

export async function checkCouponCode(code: string) {
  try {
    const coupon = await prisma.coupon.findFirst({
      where: {
        name: code,
        deletedAt: null,
      },
    });
    return coupon;
  } catch (error) {
    console.log(error);
    throw new Error("Error checking coupon code");
  }
}

/* Admin Actions */
export async function createCouponAction(data: TCreateCouponPayload) {
  try {
    const parsed = CreateCouponSchema.parse(data);
    const newCoupon = await prisma.coupon.create({
      data: parsed,
    });
    return actionResponse({
      status: 201,
      message: "Coupon created successfully",
      data: newCoupon,
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
      message: error instanceof Error ? error.message : "Error creating Coupon",
    });
  }
}

export async function updateCouponAction(CouponId: number, data: TCreateCouponPayload) {
  try {
    const parsed = CreateCouponSchema.parse(data);
    const updatedCoupon = await prisma.coupon.update({
      where: { id: CouponId },
      data: parsed,
    });
    return actionResponse({
      status: 200,
      message: "Coupon updated successfully",
      data: updatedCoupon,
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
      message: error instanceof Error ? error.message : "Error updating Coupon",
    });
  }
}

export async function deleteCouponAction(CouponId: number) {
  try {
    await prisma.coupon.update({
      where: { id: CouponId },
      data: { deletedAt: new Date() },
    });
    return actionResponse({
      status: 200,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error deleting Coupon",
    });
  }
}

export async function restoreCouponAction(CouponId: number) {
  try {
    await prisma.coupon.update({
      where: { id: CouponId },
      data: { deletedAt: null },
    });
    return actionResponse({
      status: 200,
      message: "Coupon restored successfully",
    });
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error restoring Coupon",
    });
  }
}
