"use client"

import { ProductWithCategory } from "@/entities/product/model/product"
import { useLocale, useTranslations } from "next-intl"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { ProductCard } from "../products/product-card"
import { FullSection } from "@/entities/section/model/section"
import { useFeaturedProducts } from "@/shared/hooks/useFeaturedProducts"
import { ProductCardSkeleton } from "../products/product-skeleton"

type Props = {
  section: FullSection
}

export const HomeFeaturedProducts = ({ section }: Props) => {
  const t = useTranslations()
  const locale = useLocale()
  const usedTranslation = section.translations.find((t) => t.locale === locale)
  const { featuredProducts, isFeaturedProductsLoading } = useFeaturedProducts(8)

  if (!usedTranslation) return null

  return (
    <section className=" bg-white">
      <DefaultContainer className="py-8">
        <h1 className={"text-3xl font-bold mb-8"}>{usedTranslation.title ? usedTranslation.title : t("Featured Products")}</h1>

        {isFeaturedProductsLoading ? (
          <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
            {featuredProducts?.map((product) => (
              <ProductCard key={`featured-product-home-${product.id}`} product={product} />
            ))}
          </div>
        )}

        {featuredProducts?.length == 0 && <p className="text-center py-8">{t("No products found")}</p>}
      </DefaultContainer>
    </section>
  )
}
