import * as z from "zod"

export const CreateCouponSchema = z.object({
  name: z.string("Required").min(1, { message: "Name is required" }).max(100, { message: "Cannot be more than 50 characters" }),
  discount: z.number("Required").min(1, { message: "Discount is required" }).max(100, { message: "Cannot be more than 100%" }),
  usages: z.number("Required").min(1, { message: "Usages is required" }),
  active: z.boolean().optional()
})
