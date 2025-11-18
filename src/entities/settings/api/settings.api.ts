"use server"

import prisma from "@/shared/api/prisma"

import { TUpdateSettingsPayload } from "../model/settings"
import { SettingsSchema } from "../model/settings.schema"
import { ZodError } from "zod"

import { uploadToCloudinary } from "@/shared/api/cloudinary"
import { actionResponse } from "@/shared/lib/api"

export async function getAppSettings(appId: number = 1) {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: appId }
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
      const publicUrl = await uploadToCloudinary(logo, "settings")
      logoUrl = publicUrl.url
    }
    if (defaultBanner) {
      const publicUrl = await uploadToCloudinary(defaultBanner, "settings")
      defaultBannerUrl = publicUrl.url
    }

    const validatedData = SettingsSchema.parse(data)
    await prisma.settings.update({
      where: { id: settings.id },
      data: {
        ...validatedData,
        logo: logoUrl,
        defaultBanner: defaultBannerUrl
      }
    })
    return actionResponse({
      status: 200,
      message: "Settings updated successfully"
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
