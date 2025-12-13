"use client"

import { useLocale, useTranslations } from "next-intl"
import { useCategories } from "@/entities/category/hooks/useCategories"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { CategoryCard } from "../categories/category-card"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { FullSection, SectionList } from "@/entities/section/model/section"
import { LinkBtn } from "../../common/link-button"
import { userRoutes } from "@/shared/config/routes"

export const HomeCategories = ({ section }: { section: FullSection }) => {
  const t = useTranslations()
  const locale = useLocale()

  const usedTranslation = section.translations.find((t) => t.locale === locale)
  const list: SectionList = usedTranslation?.list as SectionList

  const { categories, isCategoriesLoading } = useCategories()

  if (isCategoriesLoading) return <HomeCategoriesLoading />
  if (!usedTranslation) return null

  return (
    <section className=" from-gray-50 to-white py-20">
      <DefaultContainer className="px-4">
        <section className="flex xl:items-center items-start justify-between xl:flex-row flex-col gap-4 mb-14">
          <div>
            <h2 className="text-4xl font-bold mb-2 bg-clip-text text-gray-900">{usedTranslation.title ? usedTranslation.title : t("Explore Our Store Categories")}</h2>
            <p className="text-xl">{usedTranslation.content ? usedTranslation.content : t("Explore Our Store Categories")}</p>
          </div>
          <LinkBtn href={usedTranslation.actionButtonLink ? usedTranslation.actionButtonLink : userRoutes.categories.index} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {usedTranslation.actionButtonText ? usedTranslation.actionButtonText : t("shopNow")}
          </LinkBtn>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
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
    <section className=" from-gray-50 to-white py-20">
      <DefaultContainer className="px-4">
        <h2 className="text-4xl font-bold text-center mb-14 bg-clip-text text-gray-900">{t("Explore Our Store Categories")}</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {[...Array(10)].map((_, index) => (
            <Skeleton key={`home-category-loading-item-${index}`} className="h-20 rounded-2xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      </DefaultContainer>
    </section>
  )
}
