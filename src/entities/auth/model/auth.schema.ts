import regex from "@/shared/lib/regex";
import * as z from "zod";

export const AuthLoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string("Required").nonempty("Password is required").min(8, "Password must be at least 8 characters long"),
  type: z
    .enum(["user", "admin", "deliveryCompany"], {
      error: "Login type is only: user, admin, or deliveryCompany",
    })
    .nonoptional("Login type is required"),
});

export const ForgetPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export const AuthRegisterSchema = z.object({
  name: z.string("Required").min(1, { message: "Name is required" }),
  email: z.email("Required").nonempty("Email is required"),
  phoneNumber: z.string("Required").regex(regex.phoneNumber, { message: "Invalid Phone Number" }).min(1, { message: "Phone Number is required" }),
  countryId: z.number("Required. Must be a number").min(1, { message: "Country is required" }),
  cityId: z.number("Required. Must be a number").min(1, { message: "City is required" }),
  password: z.string("Required").min(8, { message: "Password must be at least 8 characters" }),
  streetName: z.string("Required").min(1, { message: "Street Name is required" }),
  streetNo: z.string("Required").min(1, { message: "Street No is required" }),
  notes: z.string().nonempty("Notes is required"),
});

export const AuthUpdateInformationSchema = z.object({
  name: z.string("Required").min(1, { message: "Name is required" }),
  email: z.email("Required").nonempty("Email is required"),
  phoneNumber: z.string("Required").regex(regex.phoneNumber, { message: "Invalid Phone Number" }).min(1, { message: "Phone Number is required" }),
  countryId: z.number("Required. Must be a number").min(1, { message: "Country is required" }),
  cityId: z.number("Required. Must be a number").min(1, { message: "City is required" }),
});

export const AuthUpdatePasswordSchema = z
  .object({
    currentPassword: z.string("Required").min(8, { message: "Current Password must be at least 8 characters" }),
    newPassword: z.string("Required").min(8, { message: "New Password must be at least 8 characters" }),
    confirmNewPassword: z.string("Required").min(8, {
      message: "Confirm New Password must be at least 8 characters",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export const AuthResetPasswordSchema = z
  .object({
    newPassword: z.string("Required").min(8, { message: "New Password must be at least 8 characters" }),
    confirmNewPassword: z.string("Required").min(8, {
      message: "Confirm New Password must be at least 8 characters",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });
