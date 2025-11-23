const appConfig = {
  maxUploadFileSize: 5 * 1024 * 1024,
  appName: process.env.APP_NAME || "Sharkia Candles",
  appDescription: process.env.APP_DESCRIPTION || "E-commerce platform for candles and home fragrances.",
  defaultEmail: process.env.APP_EMAIL || "abdulrahmansaber120@gmail.com",
  defaultNumber: "+201123525123",
  defaultDeliveryFees: process.env.DEFAULT_DELIVERY_FEES ? Number(process.env.DEFAULT_DELIVERY_FEES) : 70,
  defaultAddress: "Egypt, El Sharkia, Zagazig",
  appUrl: process.env.APP_URL || "http://localhost:3000",
  apiUrl: process.env.API_URL || "http://localhost:3000/api"
}

export default appConfig
