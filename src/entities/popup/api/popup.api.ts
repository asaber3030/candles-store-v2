"use server";

import prisma from "@/shared/api/prisma";
import { extractCloudinaryPublicId, getErrorMessage } from "@/shared/lib/functions";
import z from "zod";
import { PopupSchema } from "../model/popup.schema";
import { actionResponse } from "@/shared/lib/api";
import { deleteFromCloudinary, uploadToCloudinary } from "@/shared/api/cloudinary";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/shared/config/routes";

export async function getPopupData() {
  try {
    const popup = await prisma.popup.findFirst({ include: { images: true } });
    return popup;
  } catch (error) {
    console.error("Error fetching popup data:", error);
    throw new Error(getErrorMessage(error, "Failed to fetch popup data"));
  }
}

export async function updatePopupData(data: z.infer<typeof PopupSchema>, image: File | null) {
  try {
    const parsed = PopupSchema.parse(data);
    const popup = await prisma.popup.findFirst();
    if (!popup) {
      return actionResponse({ message: "Popup not found", status: 404 });
    }
    let imageUrl = popup.image;

    if (image) {
      await deleteFromCloudinary(extractCloudinaryPublicId(popup.image));
      const uploaded = await uploadToCloudinary(image, "popups");
      imageUrl = uploaded.url;
    }

    const updatedPopup = await prisma.popup.update({
      where: { id: popup.id },
      data: {
        ...parsed,
        extension: image ? image.type.split("/")[1] || "" : popup.extension,
        image: imageUrl,
      },
    });
    revalidatePath(adminRoutes.popupSettings);
    return actionResponse({ message: "Popup updated successfully", status: 200, data: updatedPopup });
  } catch (error) {
    return actionResponse({
      message: getErrorMessage(error, "Failed to update popup data"),
      status: 500,
    });
  }
}

export async function togglePopupStatus(isActive: boolean) {
  try {
    const popup = await prisma.popup.findFirst();
    if (!popup) return actionResponse({ message: "Popup not found", status: 404 });

    const updatedPopup = await prisma.popup.update({
      where: { id: popup.id },
      data: { isActive },
    });
    revalidatePath(adminRoutes.popupSettings);
    return actionResponse({ message: "Popup status updated successfully", status: 200, data: updatedPopup });
  } catch (error) {
    return actionResponse({
      message: getErrorMessage(error, "Failed to toggle popup status"),
      status: 500,
    });
  }
}

export async function createPopupImage(image: File | null) {
  try {
    const popup = await prisma.popup.findFirst();
    if (!popup) return actionResponse({ message: "Popup not found", status: 404 });

    if (!image) {
      return actionResponse({ message: "No image provided", status: 400 });
    }

    const uploaded = await uploadToCloudinary(image, "popups");
    const imageRecord = await prisma.popupImage.create({
      data: {
        popupId: popup.id,
        image: uploaded.url,
        extension: image.type.split("/")[1] || "",
      },
    });
    revalidatePath(adminRoutes.popupSettings);
    return actionResponse({ message: "Popup image uploaded successfully", status: 200, data: uploaded });
  } catch (error) {
    return actionResponse({
      message: getErrorMessage(error, "Failed to upload popup image"),
      status: 500,
    });
  }
}

export async function deletePopupImage(imageId: number) {
  try {
    const imageRecord = await prisma.popupImage.findUnique({ where: { id: imageId } });
    if (!imageRecord) return actionResponse({ message: "Popup image not found", status: 404 });

    await deleteFromCloudinary(extractCloudinaryPublicId(imageRecord.image));
    await prisma.popupImage.delete({ where: { id: imageId } });

    revalidatePath(adminRoutes.popupSettings);
    return actionResponse({ message: "Popup image deleted successfully", status: 200 });
  } catch (error) {
    return actionResponse({
      message: getErrorMessage(error, "Failed to delete popup image"),
      status: 500,
    });
  }
}
