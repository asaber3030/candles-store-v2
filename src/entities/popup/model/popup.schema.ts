import * as z from "zod";

export const PopupSchema = z.object({
  title: z.string().min(1).max(1000),
  titleAr: z.string().min(1).max(1000),
  contentAr: z.string().min(1).max(5000),
  content: z.string().min(1).max(5000),
  isActive: z.boolean(),
  link: z.url("Must be a url").optional(),
});
