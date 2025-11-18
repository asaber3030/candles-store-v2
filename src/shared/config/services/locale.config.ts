const localeConfig = {
  defaultLocale: process.env.NEXT_PUBLIC_APP_DEFAULT_LANGUAGE || "en",
  supportedLocales: process.env.NEXT_PUBLIC_APP_AVAILABLE_LANGUAGES?.split(",") || ["en", "ar"],
  cookieName: "app-language",
  languages: [
    {
      code: "en",
      name: "language.english",
      image: "/defaults/languages/english.svg"
    },
    {
      code: "ar",
      name: "language.arabic",
      image: "/defaults/languages/arabic.svg"
    }
  ]
}

export default localeConfig
