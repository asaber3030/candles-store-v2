"use server"

import appConfig from "@/shared/config/defaults/app"
import prisma from "@/shared/api/prisma"

import { TUpdateSettingsPayload } from "../model/settings"
import { SettingsSchema } from "../model/settings.schema"
import { ZodError } from "zod"

import { isImageFile, isVideoFile } from "@/shared/lib/functions"
import { uploadToCloudinary } from "@/shared/api/cloudinary"
import { actionResponse } from "@/shared/lib/api"

export async function getUserCounts() {
  try {
    const [productsCount, categoriesCount] = await Promise.all([prisma.product.count(), prisma.category.count()])
    return { productsCount, categoriesCount }
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching user counts")
  }
}

export async function getAppSettings(appId: number = 1) {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: appId },
    })
    return settings
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching settings")
  }
}

/* Admin Actions */

export async function updateSettingsAction(data: TUpdateSettingsPayload, logo: File | null = null, defaultBanner: File | null = null) {
  try {
    const settings = await getAppSettings()
    if (!settings) throw new Error("Settings not found")

    let logoUrl = settings.logo
    let defaultBannerUrl = settings.defaultBanner

    if (logo) {
      if (logo.size > appConfig.maxUploadFileSize) return actionResponse({ message: "Image size is too large. Max file size is 10MB", status: 400 })
      if (!isImageFile(logo)) return actionResponse({ message: "Invalid image file", status: 400 })
      const publicUrl = await uploadToCloudinary(logo, "settings")
      logoUrl = publicUrl.url
    }
    if (defaultBanner) {
      if (defaultBanner.size > appConfig.maxUploadFileSize) return actionResponse({ message: "Image size is too large. Max file size is 10MB", status: 400 })
      if (!isImageFile(defaultBanner) && !isVideoFile(defaultBanner)) return actionResponse({ message: "Invalid image file", status: 400 })
      const publicUrl = await uploadToCloudinary(defaultBanner, "settings")
      defaultBannerUrl = publicUrl.url
    }

    const validatedData = SettingsSchema.parse(data)
    await prisma.settings.update({
      where: { id: settings.id },
      data: {
        ...validatedData,
        logo: logoUrl,
        bannerExtension: defaultBanner ? defaultBanner.type.split("/")[1] : settings.bannerExtension,
        defaultBanner: defaultBannerUrl,
      },
    })
    return actionResponse({
      status: 200,
      message: "Settings updated successfully",
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return actionResponse({
        status: 400,
        message: "Invalid input data",
      })
    }
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error updating category",
    })
  }
}
