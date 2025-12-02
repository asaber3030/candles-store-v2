"use server";

import z from "zod";

import EmailService from "@/shared/api/email";

import { actionResponse } from "@/shared/lib/api";
import { ContactSchema } from "../model/contact.schema";
import { getAppSettings } from "@/entities/settings/api/settings.api";
import { ContactTemplate } from "@/shared/email-templates/contact-template";

export async function sendEmailToOwner(body: z.infer<typeof ContactSchema>) {
  try {
    const settings = await getAppSettings();
    if (!settings || !settings.email) {
      return actionResponse({
        message: "Please try again later",
        status: 404,
      });
    }
    const parsed = ContactSchema.parse(body);
    EmailService.sendEmail({
      to: settings.email,
      subject: `Website Form - New contact form submission - from ${parsed.name}`,
      html: ContactTemplate(parsed),
    });
    return actionResponse({
      message: "Email sent successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    if (error instanceof z.ZodError) {
      return actionResponse({
        message: "Invalid data",
        status: 400,
      });
    }
    return actionResponse({
      message: "Something went wrong",
      status: 500,
    });
  }
}
