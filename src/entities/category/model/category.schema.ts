import * as z from "zod"

export const CreateCategorySchema = z.object({
  name: z.string("Required").nonempty("Required").min(1, { message: "Name is required" }).max(100, { message: "Cannot be more than 50 characters" }),
  nameAr: z.string("Required").nonempty("Required").min(1, { message: "Name in Arabic is required" }).max(100, { message: "Cannot be more than 50 characters" }),
  description: z.string("Required").nonempty("Required").max(255, { message: "Cannot be more than 255 characters" }).optional()
})
