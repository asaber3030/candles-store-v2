"use server"

import prisma from "@/shared/api/prisma"

import { extractCloudinaryPublicId, getErrorMessage } from "@/shared/lib/functions"
import { deleteFromCloudinary, uploadToCloudinary } from "@/shared/api/cloudinary"
import { actionResponse } from "@/shared/lib/api"
import { revalidatePath } from "next/cache"
import { adminRoutes } from "@/shared/config/routes"
import { isImageFile, isVideoFile } from "@/shared/lib/functions"
import appConfig from "@/shared/config/defaults/app"

export async function getBannerImages() {
  try {
    const images = await prisma.bannerImage.findMany({ orderBy: { id: "desc" } })
    return images
  } catch (error) {
    console.error("Error fetching banner images:", error)
    throw new Error(getErrorMessage(error, "Failed to fetch banner images"))
  }
}

export async function createBannerImageAction(image: File | null) {
  try {
    if (!image) return actionResponse({ message: "No image provided", status: 400 })
    if (image.size > appConfig.maxUploadFileSize) return actionResponse({ message: "Image size is too large. Max file size is 10MB", status: 400 })
    if (!isImageFile(image) && !isVideoFile(image)) return actionResponse({ message: "Invalid image file", status: 400 })

    const uploaded = await uploadToCloudinary(image, "banner")

    const updatedPopup = await prisma.bannerImage.create({
      data: {
        image: uploaded.url,
        extension: image.type.split("/")[1] || "",
      },
    })
    revalidatePath(adminRoutes.bannerSettings)
    return actionResponse({ message: "Banner image created successfully", status: 200, data: updatedPopup })
  } catch (error) {
    return actionResponse({
      message: getErrorMessage(error, "Failed to create banner image"),
      status: 500,
    })
  }
}

export async function deleteBannerImageAction(imageId: number) {
  try {
    const imageRecord = await prisma.bannerImage.findUnique({ where: { id: imageId } })
    if (!imageRecord) return actionResponse({ message: "Banner image not found", status: 404 })

    await deleteFromCloudinary(extractCloudinaryPublicId(imageRecord.image))
    await prisma.bannerImage.delete({ where: { id: imageId } })

    revalidatePath(adminRoutes.bannerSettings)
    return actionResponse({ message: "Banner image deleted successfully", status: 200 })
  } catch (error) {
    return actionResponse({
      message: getErrorMessage(error, "Failed to delete banner image"),
      status: 500,
    })
  }
}
