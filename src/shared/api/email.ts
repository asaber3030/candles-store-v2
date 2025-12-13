import nodemailer from "nodemailer";
import emailConfig from "../config/services/email.config";

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

class EmailService {
  private static transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: Number(emailConfig.port),
    secure: Number(emailConfig.port) === 465,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.password,
    },
  });

  static async sendEmail(options: EmailOptions) {
    try {
      if (!options.to || !options.subject || (!options.text && !options.html)) {
        throw new Error("Missing required email fields.");
      }

      const info = await this.transporter.sendMail({
        from: `${emailConfig.fromName} <${emailConfig.fromAddress}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      return info;
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email." + (error instanceof Error ? error.message : ""));
    }
  }
}

export default EmailService;
