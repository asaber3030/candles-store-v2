const kashierConfig = {
  baseUrl: process.env.KASHIER_BASE_URL || "https://checkout.kashier.io",
  merchantId: process.env.KASHIER_MERCHANT_ID,
  testMode: process.env.KASHIER_TEST_MODE === "true" || true,
  apiKey: process.env.KASHIER_API_KEY,
  secretKey: process.env.KASHIER_SECRET_API_KEY,
}

export default kashierConfig
