const authConfig = {
  authCookieName: process.env.AUTH_COOKIE_NAME!,
  authSecret: process.env.AUTH_SECRET!,
  expirationDays: process.env.AUTH_TOKEN_EXPIRATION_DAYS ? parseInt(process.env.AUTH_TOKEN_EXPIRATION_DAYS) : 7
}

export default authConfig
