import * as z from "zod"

export const CreateCategorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Cannot be more than 50 characters" })
})
