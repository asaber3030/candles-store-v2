"use client"

import appConfig from "@/shared/config/defaults/app"

import Link from "next/link"

import { useLocale, useTranslations } from "next-intl"
import { useContext } from "react"

import { userRoutes } from "@/shared/config/routes"

import { Facebook, Instagram, Locate, MailIcon, PhoneIcon } from "lucide-react"
import { AppSettingsContext } from "@/shared/providers/settings.provider"
import { DefaultContainer } from "@/shared/components/common/default-container"

export function AppFooter() {
  const t = useTranslations()
  const settings = useContext(AppSettingsContext)
  const locale = useLocale()
  const currentYear = new Date().getFullYear()

  return (
    <footer className='w-full bg-card border-t border-border'>
      <DefaultContainer className='px-4 sm:px-6 lg:px-8 py-8'>
        {/* Links Section */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12'>
          <div>
            <h4 className='font-semibold text-foreground mb-4'>{t("footer.links")}</h4>
            <ul className='space-y-2'>
              <li>
                <Link href='/' className='text-muted-foreground hover:text-primary transition-colors'>
                  {t("Home")}
                </Link>
              </li>
              <li>
                <Link href='/about' className='text-muted-foreground hover:text-primary transition-colors'>
                  {t("About")}
                </Link>
              </li>
              <li>
                <Link href={userRoutes.login} className='text-muted-foreground hover:text-primary transition-colors'>
                  {t("Login")}
                </Link>
              </li>
              <li>
                <Link href={userRoutes.register} className='text-muted-foreground hover:text-primary transition-colors'>
                  {t("Register")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold text-foreground mb-4'>{settings?.siteName || appConfig.appName}</h4>
            <ul className='space-y-2'>
              <li>
                <p className='text-muted-foreground text-sm'>{locale == "ar" ? settings?.arDescription || appConfig.appDescription : settings?.description || appConfig.appDescription}</p>
              </li>
              <li>
                <p className='text-muted-foreground text-sm flex gap-2 items-center'>
                  <MailIcon className='size-4' /> {settings?.email || appConfig.defaultEmail}
                </p>
              </li>
              <li>
                <p className='text-muted-foreground text-sm flex gap-2 items-center'>
                  <PhoneIcon className='size-4' /> {settings?.phoneNumber || appConfig.defaultNumber}
                </p>
              </li>
              <li>
                <p className='text-muted-foreground text-sm flex gap-2 items-center'>
                  <Locate className='size-4' /> {settings?.address || appConfig.defaultAddress}
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold text-foreground mb-4'>{t("Follow Us")}</h4>
            <div className='flex gap-4'>
              <a target='_blank' href={settings?.instagram || "#"} className='text-muted-foreground hover:text-primary transition-colors flex items-center gap-2'>
                <Instagram className='h-4 w-4' />
                Instagram
              </a>

              <a target='_blank' href={settings?.facebook || "#"} className='text-muted-foreground hover:text-primary transition-colors flex items-center gap-2'>
                <Facebook className='h-4 w-4' />
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className='text-center pt-8 border-t border-border'>
          <p className='text-sm text-muted-foreground'>
            &copy; {currentYear} {settings?.siteName || appConfig.appName}. {t("footer.copyright")}.
          </p>
        </div>
      </DefaultContainer>
    </footer>
  )
}
