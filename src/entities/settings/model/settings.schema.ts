import * as z from "zod"

import { AnimationList } from "@/shared/config/defaults"

export const SettingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  description: z.string().min(1, "Description is required"),
  arDescription: z.string().min(1, "Arabic description is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  defaultAnimation: z.enum(AnimationList).default("Default"),
  facebook: z.url("Invalid URL").optional().or(z.literal("")),
  instagram: z.url("Invalid URL").optional().or(z.literal(""))
})
