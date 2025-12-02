import * as z from "zod";

export const SectionTranslationSchema = z.object({
  en: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    subTitle: z.string().min(1, { message: "Sub Title is required" }).optional(),
    actionButtonText: z.string().min(1, { message: "Action Button Text is required" }).optional(),
    actionButtonLink: z.string().min(1, { message: "Action Button Link is required" }).optional(),
    actionButton2Text: z.string().min(1, { message: "Action Button 2 Text is required" }).optional(),
    actionButton2Link: z.string().min(1, { message: "Action Button 2 Link is required" }).optional(),
  }),
  ar: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    subTitle: z.string().min(1, { message: "Sub Title is required" }).optional(),
    actionButtonText: z.string().min(1, { message: "Action Button Text is required" }).optional(),
    actionButtonLink: z.string().min(1, { message: "Action Button Link is required" }).optional(),
    actionButton2Text: z.string().min(1, { message: "Action Button 2 Text is required" }).optional(),
    actionButton2Link: z.string().min(1, { message: "Action Button 2 Link is required" }).optional(),
  }),
});
