import * as z from "zod";

import { AllowedPaymentMethodsList, AnimationList } from "@/shared/config/defaults";

export const SettingsSchema = z.object({
  siteName: z.string("Required").min(1, "Site name is required"),
  description: z.string("Required").min(1, "Description is required"),
  arDescription: z.string("Required").min(1, "Arabic description is required"),
  phoneNumber: z.string("Required").min(1, "Phone number is required"),
  email: z.email("Invalid email address"),
  address: z.string("Required").min(1, "Address is required"),
  defaultAnimation: z.enum(AnimationList).default("Default"),
  allowedPaymentMethod: z.enum(AllowedPaymentMethodsList).default("Both"),
  facebook: z.url("Invalid URL").optional().or(z.literal("")),
  instagram: z.url("Invalid URL").optional().or(z.literal("")),
  twitter: z.url("Invalid URL").optional().or(z.literal("")),
  snapchat: z.url("Invalid URL").optional().or(z.literal("")),
  tiktok: z.url("Invalid URL").optional().or(z.literal("")),
  youtube: z.url("Invalid URL").optional().or(z.literal("")),
});
