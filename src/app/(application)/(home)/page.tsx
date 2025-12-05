import { getPageSectionsByName, getPageWithSEO } from "@/entities/page/api/page.api"
import { getFeaturedProducts } from "@/entities/product/api/proudct.api"
import { getBannerImages } from "@/entities/banner/api/banner.api"

import { defaultMetadata, generatePageMetadata } from "@/shared/lib/metadata"
import { filterSections } from "@/shared/lib/functions"
import { getLocale } from "next-intl/server"

import { HomeFeaturedProducts } from "@/shared/components/widgets/home/featured-products"
import { HomeCategories } from "@/shared/components/widgets/home/categories"
import { HomeFAQSection } from "@/shared/components/widgets/home/faq"
import { HomeBanner } from "@/shared/components/widgets/home/banner"
import { HomeCTA } from "@/shared/components/widgets/home/cta"
import { HomeUSP } from "@/shared/components/widgets/home/usp"

export async function generateMetadata() {
  const locale = await getLocale()
  const page = await getPageWithSEO("home")
  const seo = page?.seoList?.find((seo) => seo.locale === locale)
  if (!page || !seo) return defaultMetadata
  return generatePageMetadata(seo, page)
}

export default async function Home() {
  const sections = await getPageSectionsByName("home")

  const hero = filterSections("hero", sections)
  const categoriesList = filterSections("categories-list", sections)
  const featuredProducts = filterSections("featured-products", sections)
  const whyChooseUs = filterSections("why-choose-us", sections)
  const callToAction = filterSections("cta", sections)
  const faq = filterSections("faq", sections)

  return (
    <main>
      {hero && <HomeBanner section={hero} />}
      {categoriesList && <HomeCategories section={categoriesList} />}
      {featuredProducts && <HomeFeaturedProducts section={featuredProducts} />}
      {whyChooseUs && <HomeUSP section={whyChooseUs} />}
      {callToAction && <HomeCTA section={callToAction} />}
      {faq && <HomeFAQSection section={faq} />}
    </main>
  )
}
