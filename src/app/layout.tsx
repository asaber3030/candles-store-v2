import "./globals.css"

import type { Metadata } from "next"
import { ReactQueryClientProvider } from "@/shared/providers/query-client.provider"
import { ToastContainer } from "react-toastify"
import { getLocale, getMessages } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { loadFont, loadPageDirection } from "@/shared/lib/fonts"

import { getAppSettings } from "@/entities/settings/api/settings.api"
import { AppSettingsProvider } from "@/shared/providers/settings.provider"

export const metadata: Metadata = {
  title: "SharkiaCandles",
  description: "SharkiaCandles"
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()
  const settings = await getAppSettings()

  return (
    <html lang={locale} dir={loadPageDirection(locale)}>
      <body className={loadFont(locale)}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ReactQueryClientProvider>
            <AppSettingsProvider settings={settings}>
              <ToastContainer />
              {children}
            </AppSettingsProvider>
          </ReactQueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
