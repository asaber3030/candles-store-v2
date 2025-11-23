const kashierConfig = {
  baseUrl: process.env.KASHIER_BASE_URL || "https://checkout.kashier.io",
  merchantId: process.env.KASHIER_MERCHANT_ID || "MID-36438-727",
  testMode: process.env.KASHIER_TEST_MODE === "true" || true,
  apiKey: process.env.KASHIER_API_KEY || "79540aeb-5908-4adb-8c47-1f73b6d1b31d",
  secretKey: process.env.KASHIER_SECRET_KEY
}

export default kashierConfig
