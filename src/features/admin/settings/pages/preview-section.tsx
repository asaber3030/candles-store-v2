import { FullSection } from "@/entities/section/model/section"
import { ContactCTA } from "@/features/contact/ui/contact-cta"
import { ContactHero } from "@/features/contact/ui/contact-hero"
import { ContactForm } from "@/features/contact/ui/form"
import { ContactGetInTouch } from "@/features/contact/ui/get-in-touch"
import { ContactSocialLinks } from "@/features/contact/ui/social-items"
import { AboutCTA } from "@/shared/components/widgets/about/cta"
import { AboutHero } from "@/shared/components/widgets/about/hero"
import { AboutHow } from "@/shared/components/widgets/about/how"
import { AboutJourney } from "@/shared/components/widgets/about/journey"
import { AboutTry } from "@/shared/components/widgets/about/try"
import { AboutValues } from "@/shared/components/widgets/about/values"
import { CategoriesHero } from "@/shared/components/widgets/categories/hero"
import { HomeBanner } from "@/shared/components/widgets/home/banner"
import { HomeCategories } from "@/shared/components/widgets/home/categories"
import { HomeCTA } from "@/shared/components/widgets/home/cta"
import { HomeFAQSection } from "@/shared/components/widgets/home/faq"
import { HomeFeaturedProducts } from "@/shared/components/widgets/home/featured-products"
import { HomeUSP } from "@/shared/components/widgets/home/usp"
import { ProductsHero } from "@/shared/components/widgets/products/hero"
import { FC } from "react"

const componentMap: Record<string, FC<{ section: FullSection }>> = {
  "home-hero": HomeBanner,
  "home-categories-list": HomeCategories,
  "home-featured-products": HomeFeaturedProducts,
  "home-why-choose-us": HomeUSP,
  "home-cta": HomeCTA,
  "home-faq": HomeFAQSection,

  "about-hero": AboutHero,
  "about-journey": AboutJourney,
  "about-values": AboutValues,
  "about-how": AboutHow,
  "about-try": AboutTry,
  "about-cta": AboutCTA,

  "contact-hero": ContactHero,
  "contact-cta": ContactCTA,
  "contact-form": ContactForm,
  "contact-get-in-touch": ContactGetInTouch,
  "contact-social": ContactSocialLinks,

  "categories-hero": CategoriesHero,

  "products-hero": ProductsHero,
}

export function SectionRenderer({ section }: { section: FullSection }) {
  const Component = componentMap[section.page.name + "-" + section.name]

  if (!Component) {
    return (
      <div className="p-4 bg-red-100 text-red-700">
        Unknown section component: <strong>{section.name}</strong>
      </div>
    )
  }

  return <Component section={section} />
}
