"use client"

import { ProductWithCategory } from "@/entities/product/model/product"
import { ProductCard } from "../products/product-card"
import { useTranslations } from "next-intl"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { useCartStore } from "@/features/cart/model/cart.store"

type Props = {
  products: ProductWithCategory[]
}

export const HomeFeaturedProducts = ({ products }: Props) => {
  const t = useTranslations()

  return (
    <section className=' bg-white'>
      <DefaultContainer className='py-8'>
        <h1 className={"text-3xl font-bold mb-8"}>{t("Featured Products")}</h1>
        <div className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
          {products.map((product) => (
            <ProductCard key={`featured-product-home-${product.id}`} product={product} />
          ))}
        </div>
      </DefaultContainer>
    </section>
  )
}
