import { useLocale, useTranslations } from "next-intl"

import { FullSection } from "@/entities/section/model/section"
import { Sparkles } from "lucide-react"

export const AboutHero = ({ section }: { section: FullSection }) => {
  const locale = useLocale()
  const t = useTranslations()

  const usedTranslation = section.translations.find((translation) => translation.locale === locale)
  if (!usedTranslation) return null

  return (
    <section className="relative bg-gradient-to-r overflow-hidden from-amber-50 via-rose-50 to-stone-50 py-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-rose-300 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium text-stone-700">{t("about.nav.about")}</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-bold text-stone-900 mb-6 tracking-tight">{usedTranslation.title ? usedTranslation.title : t("about.hero.title")}</h1>
        <p className="text-2xl text-stone-600 max-w-3xl mx-auto leading-relaxed">{usedTranslation.content ? usedTranslation.content : t("about.hero.subtitle")}</p>
      </div>
    </section>
  )
}
