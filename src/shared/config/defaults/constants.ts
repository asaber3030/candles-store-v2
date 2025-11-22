export const defaultPictures = {
  logo: "/logo/logo-1.svg",
  user: "/defaults/images/user.png",
  placeholder: "/defaults/images/placeholder.png",
  social: {
    png: {
      white: (logo: string) => `/social/png/white/${logo}.png`,
      color: (logo: string) => `/social/png/color/${logo}.png`,
      black: (logo: string) => `/social/png/black/${logo}.png`
    },
    svg: {
      white: (logo: string) => `/social/svg/white/${logo}.svg`,
      color: (logo: string) => `/social/svg/color/${logo}.svg`,
      black: (logo: string) => `/social/svg/black/${logo}.svg`
    }
  }
} as const

export const defaultValues = {
  maxUploadFileSize: 5 * 1024 * 1024,
  appName: process.env.APP_NAME || "SharkiaCandles",
  appDescription: process.env.APP_DESCRIPTION || "E-commerce platform for candles and home fragrances.",
  defaultEmail: "abdulrahmansaber120@gmail.com",
  defaultNumber: "+201123525123",
  defaultDeliveryFees: process.env.DEFAULT_DELIVERY_FEES ? Number(process.env.DEFAULT_DELIVERY_FEES) : 70,
  defaultAddress: "Egypt, El Sharkia, Zagazig",
  appUrl: process.env.APP_URL || "http://localhost:3000",
  apiUrl: process.env.API_URL || "http://localhost:4000/api"
}
