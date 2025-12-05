import * as z from "zod"

export const SectionTranslationSchema = z.object({
  en: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    subTitle: z.string().optional(),
    actionButtonText: z.string().optional(),
    actionButtonLink: z.string().optional(),
    actionButton2Text: z.string().optional(),
    actionButton2Link: z.string().optional(),
  }),
  ar: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    subTitle: z.string().optional(),
    actionButtonText: z.string().optional(),
    actionButtonLink: z.string().optional(),
    actionButton2Text: z.string().optional(),
    actionButton2Link: z.string().optional(),
  }),
})
