const emailConfig = {
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  isSecure: process.env.EMAIL_SECURE === "true" || false,
  user: process.env.EMAIL_USER!,
  password: process.env.EMAIL_PASS!,
  fromName: process.env.EMAIL_FROM_NAME! || "Sharkia Candles",
  fromAddress: process.env.EMAIL_FROM_ADDRESS!,
  secret: process.env.EMAIL_SECRET! || "sharkia-candles-secret-email"
}

export default emailConfig
