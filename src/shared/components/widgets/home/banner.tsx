"use client"

import { useLocale, useTranslations } from "next-intl"
import { useContext, useEffect, useMemo, useRef, useState } from "react"

import { userRoutes } from "@/shared/config/routes"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { AppSettingsContext } from "@/shared/providers/settings.provider"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { LinkBtn } from "@/shared/components/common/link-button"

import ParticlesAnimation from "./particles-animation"
import { BannerImage } from "@prisma/client"
import { isVideoExtension } from "@/shared/lib/functions"
import { FullSection, SectionList } from "@/entities/section/model/section"
import { useBannerImages } from "@/shared/hooks/useBanner"

export const HomeBanner = ({ section }: { section: FullSection }) => {
  const t = useTranslations()
  const locale = useLocale()
  const settings = useContext(AppSettingsContext)
  const bannerUrl = settings?.defaultBanner

  const { bannerImages } = useBannerImages()

  const usedTranslation = section.translations.find((t) => t.locale === locale)

  const Icon = locale === "ar" ? ArrowLeft : ArrowRight

  const slides = useMemo(() => {
    const s: Array<{ id: string; src: string; isVideo: boolean }> = []
    if (bannerUrl) {
      s.push({ id: "__default_banner__", src: bannerUrl, isVideo: isVideoExtension(settings?.bannerExtension) })
    }
    if (bannerImages && bannerImages.length) {
      bannerImages.forEach((b) => s.push({ id: String(b.id), src: b.image, isVideo: isVideoExtension(b.extension) }))
    }
    return s
  }, [bannerUrl, bannerImages, settings?.bannerExtension])

  const [index, setIndex] = useState(0)
  const intervalRef = useRef<number | null>(null)

  // Auto-advance every 1500ms
  useEffect(() => {
    if (!slides || slides.length <= 1) return
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 4000)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [slides])

  // Reset index if slides change
  useEffect(() => setIndex(0), [slides.length])

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const goNext = () => setIndex((i) => (i + 1) % slides.length)

  if (!usedTranslation) return null

  const list: SectionList = usedTranslation.list as SectionList

  return (
    <div className="relative flex xl:h-[600px] w-full flex-col items-center justify-center overflow-hidden bg-black bg-opacity-85 z-10 py-24">
      {slides && slides.length > 0 ? (
        // Carousel slides positioned absolutely behind content (preserve original layout)
        <div className="absolute inset-0 -z-10">
          {slides.map((s, i) => (
            <div key={s.id} className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              {s.isVideo ? (
                <video src={s.src} autoPlay loop muted playsInline className="w-full h-full object-cover" title={`banner-video-${s.id}`} />
              ) : (
                <img src={s.src} alt={`Home Banner ${i}`} className="w-full h-full object-cover" />
              )}
            </div>
          ))}

          {/* Optional simple controls (kept minimal so style stays same) */}
          {slides.length > 1 && (
            <>
              <button onClick={goPrev} aria-label="previous" className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button onClick={goNext} aria-label="next" className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2">
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      ) : null}

      <div className="container mx-auto flex gap-10 flex-col md:flex-row items-center md:items-start justify-between">
        <DefaultContainer className="text-white mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 mt-10">{usedTranslation.title}</h1>
          <p className="text-xl md:text-2xl mb-6 max-w-xl">{usedTranslation.content}</p>
          <div className="flex space-x-4">
            <LinkBtn href={usedTranslation.actionButtonLink ? usedTranslation.actionButtonLink : userRoutes.shop} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {usedTranslation.actionButtonText ? usedTranslation.actionButtonText : t("shopNow")}
            </LinkBtn>
          </div>
        </DefaultContainer>

        <div className="md:w-1/2 bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{t("whyChooseUs")}</h2>
          <ul className="space-y-3">
            {list &&
              list.length > 0 &&
              list.map((item, index) => (
                <li key={`section-banner-${index}`} className="flex items-start">
                  <Icon className="mx-2 h-5 w-5 text-primary  mt-1" />
                  <span>{item.title}</span>
                </li>
              ))}
          </ul>
          <LinkBtn href={usedTranslation.actionButton2Link ? usedTranslation.actionButton2Link : userRoutes.about} className="mt-6" variant="link">
            {usedTranslation.actionButton2Text ? usedTranslation.actionButton2Text : t("learnMore")} <Icon className="ml-2 h-4 w-4" />
          </LinkBtn>
        </div>
      </div>
      {!bannerUrl && <ParticlesAnimation className="absolute inset-0" quantity={200} ease={80} color="#ffffff" refresh />}
    </div>
  )
}
