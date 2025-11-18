import * as z from "zod"

export const CreateCountrySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Cannot be more than 50 characters" }),
  code: z.string().min(1, { message: "Code is required" }).max(50, { message: "Cannot be more than 50 characters" }),
  isActive: z.boolean("Active status is required"),
  price: z.number().min(0)
})
