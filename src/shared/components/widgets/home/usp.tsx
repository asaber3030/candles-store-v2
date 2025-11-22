"use client"

import { DefaultContainer } from "@/shared/components/common/default-container"
import { Heart, Leaf } from "lucide-react"
import { useTranslations } from "next-intl"

export const HomeUSP = () => {
  const t = useTranslations()
  return (
    <section className='py-16 bg-secondaryLight'>
      <DefaultContainer className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className={"text-3xl font-bold mb-8 text-center"}>{t("Why Choose Us")}</h1>

        <div className='grid md:grid-cols-3 gap-12'>
          <div className='text-center'>
            <div className='w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Leaf className='w-8 h-8 text-amber-600' />
            </div>
            <h3 className='text-xl font-semibold text-stone-800 mb-2'>{t("usp.natural")}</h3>
            <p className='text-stone-600'>{t("usp.naturalDesc")}</p>
          </div>
          <div className='text-center'>
            <div className='w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Heart className='w-8 h-8 text-amber-600' />
            </div>
            <h3 className='text-xl font-semibold text-stone-800 mb-2'>{t("usp.handmade")}</h3>
            <p className='text-stone-600'>{t("usp.handmadeDesc")}</p>
          </div>
          <div className='text-center'>
            <div className='w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Leaf className='w-8 h-8 text-amber-600' />
            </div>
            <h3 className='text-xl font-semibold text-stone-800 mb-2'>{t("usp.eco")}</h3>
            <p className='text-stone-600'>{t("usp.ecoDesc")}</p>
          </div>
        </div>
      </DefaultContainer>
    </section>
  )
}
