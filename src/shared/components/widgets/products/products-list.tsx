"use client"

import { useTranslations } from "next-intl"
import { useProducts } from "@/entities/product/hooks/useProducts"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { build } from "search-params"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { ProductCardSkeleton } from "./product-skeleton"
import { AdvancedPagination } from "@/shared/components/common/pagination"
import { ProductFilters } from "./filters"
import { ProductCard } from "./product-card"
import { ErrorAlert } from "@/shared/components/common/error-alert"

export const ViewAllProductsList = ({ searchParams }: { searchParams: TObject }) => {
  const router = useRouter()
  const t = useTranslations()

  const [show, setShow] = useState(isNaN(Number(searchParams.show)) ? 25 : Number(searchParams.show) < 10 ? 25 : Number(searchParams.show))

  const { products, isProductsLoading, isProductsRefetching, refetchProducts, isProductsError, productsError } = useProducts(searchParams)

  const handleShowChange = (value: number) => {
    setShow(value)
    const newSp = { ...searchParams, page: 1, pageSize: value }
    const query = build(newSp)
    router.push(`?${query}`)
  }

  if (isProductsError) {
    return <ErrorAlert title={"Error while fetching products"} description={productsError?.message || "Unknown Error happened"} />
  }

  return (
    <div className="grid xl:grid-cols-7 gap-4 grid-cols-2">
      <section className="xl:col-span-2 col-span-2">
        <ProductFilters
          onChange={(filters) => {
            const newSp = { ...searchParams, ...filters, page: 1 }
            const query = build(newSp)
            router.push(`?${query}`)
          }}
        />
      </section>

      <section className="xl:col-span-5 col-span-2 space-y-4">
        <section className="flex flex-wrap items-center gap-4 justify-between">
          <h1 className="text-2xl font-semibold">{t("All Products")}</h1>

          <section>
            <Select defaultValue={show.toString()} onValueChange={(value) => handleShowChange(Number(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("Show")} />
              </SelectTrigger>
              <SelectContent>
                {[10, 25, 50].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {t("Show")} {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>
        </section>

        {isProductsLoading || isProductsRefetching ? (
          <section className="grid xl:grid-cols-3 grid-cols-2 gap-2">
            {Array.from({ length: show }).map((_, index) => (
              <ProductCardSkeleton key={`sk1-product-item-${index}`} />
            ))}
          </section>
        ) : (
          <section>
            {products?.data && products.data.length == 0 ? (
              <p className="text-center py-8">{t("No products found")}</p>
            ) : (
              <>
                <section className="grid xl:grid-cols-3 grid-cols-2 gap-2">
                  {products?.data?.map((product) => (
                    <ProductCard key={`product-item-${product.id}`} product={product} />
                  ))}
                </section>
                {products?.pagination && <AdvancedPagination {...products.pagination} />}
              </>
            )}
          </section>
        )}
      </section>
    </div>
  )
}
