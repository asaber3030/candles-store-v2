"use server"

import prisma from "@/shared/api/prisma"

import { SectionTranslationSchema } from "../model/section.schema"
import { SectionListItem } from "../model/section"

import { actionResponse } from "@/shared/lib/api"
import { z } from "zod"
import { uploadToCloudinary } from "@/shared/api/cloudinary"

export async function updateSectionTranslationAction(sectionId: number, data: z.infer<typeof SectionTranslationSchema>, list: SectionListItem[], arList: SectionListItem[], imageFile: File | null) {
  try {
    return await prisma.$transaction(async (tx) => {
      const translations = await tx.sectionTranslation.findMany({
        where: {
          sectionId,
          locale: { in: ["en", "ar"] },
        },
      })

      const arTranslation = translations.find((t) => t.locale === "ar")
      const enTranslation = translations.find((t) => t.locale === "en")

      let finalImageUrl: string | null = null

      if (imageFile) {
        const upload = await uploadToCloudinary(imageFile)
        finalImageUrl = upload.url
      } else {
        finalImageUrl = arTranslation?.image ?? enTranslation?.image ?? null
      }

      const upsertTranslation = async (
        locale: "ar" | "en",
        payload: {
          title: string
          content: string
          subTitle?: string
          list: SectionListItem[]
          actionButtonText?: string
          actionButtonLink?: string
          actionButton2Text?: string
          actionButton2Link?: string
        }
      ) => {
        const data = {
          title: payload.title,
          content: payload.content,
          subTitle: payload.subTitle,
          list: payload.list,
          actionButtonText: payload.actionButtonText,
          actionButtonLink: payload.actionButtonLink,
          actionButton2Text: payload.actionButton2Text,
          actionButton2Link: payload.actionButton2Link,
          image: finalImageUrl,
        }

        if (locale === "ar" && arTranslation) {
          await tx.sectionTranslation.update({
            where: { id: arTranslation.id },
            data,
          })
        } else if (locale === "en" && enTranslation) {
          await tx.sectionTranslation.update({
            where: { id: enTranslation.id },
            data,
          })
        } else {
          await tx.sectionTranslation.create({
            data: {
              sectionId,
              locale,
              ...data,
            },
          })
        }
      }

      await Promise.all([
        upsertTranslation("en", {
          title: data.en.title,
          subTitle: data.en.subTitle,
          content: data.en.content,
          list,
          actionButtonText: data.en.actionButtonText,
          actionButtonLink: data.en.actionButtonLink,
          actionButton2Text: data.en.actionButton2Text,
          actionButton2Link: data.en.actionButton2Link,
        }),
        upsertTranslation("ar", {
          title: data.ar.title,
          subTitle: data.ar.subTitle,
          content: data.ar.content,
          list: arList,
          actionButtonText: data.ar.actionButtonText,
          actionButtonLink: data.ar.actionButtonLink,
          actionButton2Text: data.ar.actionButton2Text,
          actionButton2Link: data.ar.actionButton2Link,
        }),
      ])

      return actionResponse({
        status: 200,
        message: "Section updated successfully!",
      })
    })
  } catch (error) {
    console.error("Error updating section translation:", error)
    return actionResponse({
      status: 500,
      message: "Something went wrong, please try again later.",
    })
  }
}
