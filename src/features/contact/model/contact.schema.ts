import regex from "@/shared/lib/regex";
import z from "zod";

export const ContactSchema = z.object({
  name: z.string("Required").min(2, "Name must be at least 2 characters long"),
  subject: z.string("Required").min(2, "Subject must be at least 2 characters long"),
  email: z.email("Invalid email address").nonempty("Email is required"),
  phoneNumber: z.string("Required").regex(regex.phoneNumber, "Invalid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters long").max(2000, "Message must be at most 2000 characters long"),
});
