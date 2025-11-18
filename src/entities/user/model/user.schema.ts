import { UserRolesList } from "@/shared/config/defaults"
import regex from "@/shared/lib/regex"
import * as z from "zod"

export const CreateUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email(),
  phoneNumber: z.string().regex(regex.phoneNumber, { message: "Invalid Phone Number" }).min(1, { message: "Phone Number is required" }),
  countryId: z.number().min(1, { message: "Country is required" }),
  cityId: z.number().min(1, { message: "City is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(UserRolesList)
})

export const CreateAddressSchema = z.object({
  streetName: z.string().min(1, { message: "Street Name is required" }),
  streetNo: z.string().min(1, { message: "Street Number is required" }),
  phoneNumber: z.string().regex(regex.phoneNumber, { message: "Invalid Phone Number" }).min(1, { message: "Phone Number is required" }),
  notes: z.string().optional(),
  isDefault: z.boolean().optional(),
  countryId: z.number().min(1, { message: "Country is required" }),
  cityId: z.number().min(1, { message: "City is required" })
})
