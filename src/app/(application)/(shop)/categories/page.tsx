import { CategoriesListingMain } from "@/shared/components/widgets/categories/listing-main"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { CategoriesHero } from "@/shared/components/widgets/categories/hero"

import { filterSections } from "@/shared/lib/functions"
import { getUserCounts } from "@/entities/settings/api/settings.api"

import { getPageSectionsByName, getPageWithSEO } from "@/entities/page/api/page.api"
import { defaultMetadata, generatePageMetadata } from "@/shared/lib/metadata"
import { getLocale } from "next-intl/server"

export async function generateMetadata() {
  const locale = await getLocale()
  const page = await getPageWithSEO("categories")
  const seo = page?.seoList?.find((seo) => seo.locale === locale)
  if (!page || !seo) return defaultMetadata
  return generatePageMetadata(seo, page)
}

export default async function CategoriesPage() {
  const sections = await getPageSectionsByName("categories")
  const hero = filterSections("hero", sections)
  const counts = await getUserCounts()

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <DefaultContainer className="p-6">
        {hero && <CategoriesHero section={hero} />}
        <CategoriesListingMain />
      </DefaultContainer>
    </div>
  )
}
