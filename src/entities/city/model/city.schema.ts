import * as z from "zod"

export const CreateCitySchema = z.object({
  name: z.string("Required").nonempty("Required").min(1, { message: "Name is required" }).max(100, { message: "Cannot be more than 50 characters" }),
  code: z.string("Required").min(1, { message: "Code is required" }).max(10, { message: "Cannot be more than 10 characters" }),
  price: z.number("Required to be a number").min(0, { message: "Price must be at least 0" }),
  isActive: z.boolean().optional(),
  countryId: z.number("Required").nonoptional("Country ID is required")
})
