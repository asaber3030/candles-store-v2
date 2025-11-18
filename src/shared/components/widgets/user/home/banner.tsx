"use client"

import { useLocale, useTranslations } from "next-intl"
import { useContext } from "react"

import { userRoutes } from "@/shared/config/routes"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { AppSettingsContext } from "@/shared/providers/settings.provider"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { LinkBtn } from "@/shared/components/common/link-button"

import ParticlesAnimation from "./particles-animation"

export const HomeBanner = () => {
  const t = useTranslations()
  const locale = useLocale()

  const settings = useContext(AppSettingsContext)
  const bannerUrl = settings?.defaultBanner

  const Icon = locale === "ar" ? ArrowLeft : ArrowRight

  return (
    <div className='relative flex xl:h-[600px] w-full flex-col items-center justify-center overflow-hidden bg-black bg-opacity-85 z-10 py-24'>
      {bannerUrl && <img src={bannerUrl} alt='Home Banner' className='absolute w-full h-full left-0 top-0 -z-10 object-cover' />}

      <div className='container mx-auto flex gap-10 flex-col md:flex-row items-center md:items-start justify-between'>
        <DefaultContainer className='text-white mb-8 md:mb-0 p-4'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4 mt-10'>{t("landingPageTitle")}</h1>
          <p className='text-xl md:text-2xl mb-6 max-w-xl'>{t("landingPageDescription")}</p>
          <div className='flex space-x-4'>
            <LinkBtn href={userRoutes.shop} className='bg-primary text-primary-foreground hover:bg-primary/90'>
              {t("shopNow")}
            </LinkBtn>
          </div>
        </DefaultContainer>
        <div className='md:w-1/2 bg-white bg-opacity-90 p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold mb-4'>{t("whyChooseUs")}</h2>
          <ul className='space-y-3'>
            <li className='flex items-start'>
              <Icon className='mx-2 h-5 w-5 text-primary  mt-1' />
              <span>{t("feature01")}</span>
            </li>
            <li className='flex items-start'>
              <Icon className='mx-2 h-5 w-5 text-primary  mt-1' />
              <span>{t("feature02")}</span>
            </li>
            <li className='flex items-start'>
              <Icon className='mx-2 h-5 w-5 text-primary  mt-1' />
              <span>{t("feature03")}</span>
            </li>
            <li className='flex items-start'>
              <Icon className='mx-2 h-5 w-5 text-primary  mt-1' />
              <span>{t("feature04")}</span>
            </li>
          </ul>
          <LinkBtn href={userRoutes.about} className='mt-6' variant='link'>
            {t("learnMore")} <Icon className='ml-2 h-4 w-4' />
          </LinkBtn>
        </div>
      </div>
      {!bannerUrl && <ParticlesAnimation className='absolute inset-0' quantity={200} ease={80} color='#ffffff' refresh />}
    </div>
  )
}
