const localeConfig = {
  defaultLocale: process.env.APP_DEFAULT_LANGUAGE || "ar",
  supportedLocales: process.env.APP_AVAILABLE_LANGUAGES?.split(",") || ["en", "ar"],
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
