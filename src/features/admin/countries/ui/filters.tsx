"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useState } from "react"

import { adminRoutes } from "@/shared/config/routes"
import { build } from "search-params"

import { AdvancedSearchBar } from "@/shared/components/common/advanced-search"
import { OrderDirection } from "@/shared/components/common/order-direction"
import { Button } from "@/shared/components/ui/button"

export const AdminCountriesFilters = () => {
  const router = useRouter()
  const sp = useSearchParams()
  const t = useTranslations()

  const [search, setSearch] = useState(sp.get("search") || "")
  const [orderDirection, setOrderDirection] = useState<TOrderDirection>(sp.get("orderDirection") === "asc" ? "asc" : "desc")

  const handleFilter = () => {
    const query = build({ search, orderDirection })
    router.push(`?${query}`)
  }

  const handleClear = () => {
    setSearch("")
    router.push(adminRoutes.countries.index)
  }

  return (
    <div className='flex gap-2'>
      <AdvancedSearchBar search={search} setSearch={setSearch} />
      <OrderDirection direction={orderDirection} onDirectionChange={setOrderDirection} />

      <Button onClick={handleFilter}>{t("Filter")}</Button>
      <Button onClick={handleClear} variant='outline'>
        {t("Clear")}
      </Button>
    </div>
  )
}
