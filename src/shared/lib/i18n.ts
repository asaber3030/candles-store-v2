import { cookies } from "next/headers"
import { getRequestConfig } from "next-intl/server"

import localeConfig from "@/shared/config/services/locale.config"

export default getRequestConfig(async () => {
  const store = await cookies()
  const language = store.get(localeConfig.cookieName)?.value || "en"
  const locale = localeConfig.supportedLocales.includes(language) ? language : "en"

  return {
    locale,
    messages: (await import(`../languages/${locale}.json`)).default
  }
})
