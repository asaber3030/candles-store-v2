"use client"

import { useTranslations } from "next-intl"
import { useCategories } from "@/entities/category/hooks/useCategories"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { CategoryCard } from "../categories/category-card"
import { Skeleton } from "@/shared/components/ui/skeleton"

export const HomeCategories = () => {
  const t = useTranslations()
  const { categories, isCategoriesLoading } = useCategories()

  if (isCategoriesLoading) return <HomeCategoriesLoading />

  return (
    <section className=' from-gray-50 to-white py-20'>
      <DefaultContainer className='px-4'>
        <h2 className='text-4xl font-bold text-center mb-14 bg-clip-text text-gray-900'>{t("Explore Our Store Categories")}</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6'>
          {categories?.data?.map((category) => (
            <CategoryCard key={`home-category-item-${category.id}`} category={category} />
          ))}
        </div>
      </DefaultContainer>
    </section>
  )
}

const HomeCategoriesLoading = () => {
  const t = useTranslations()

  return (
    <section className=' from-gray-50 to-white py-20'>
      <DefaultContainer className='px-4'>
        <h2 className='text-4xl font-bold text-center mb-14 bg-clip-text text-gray-900'>{t("Explore Our Store Categories")}</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6'>
          {[...Array(10)].map((_, index) => (
            <Skeleton key={`home-category-loading-item-${index}`} className='h-20 rounded-2xl bg-gray-200 animate-pulse' />
          ))}
        </div>
      </DefaultContainer>
    </section>
  )
}
