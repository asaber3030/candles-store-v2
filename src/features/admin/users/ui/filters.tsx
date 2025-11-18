"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useState } from "react"

import { adminRoutes } from "@/shared/config/routes"
import { build } from "search-params"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { AdvancedSearchBar } from "@/shared/components/common/advanced-search"
import { OrderDirection } from "@/shared/components/common/order-direction"
import { Button } from "@/shared/components/ui/button"

export const AdminUsersFilers = () => {
  const router = useRouter()
  const sp = useSearchParams()
  const t = useTranslations()

  const [search, setSearch] = useState(sp.get("search") || "")
  const [role, setRole] = useState(sp.get("role") || "-")
  const [orderDirection, setOrderDirection] = useState<TOrderDirection>(sp.get("orderDirection") === "asc" ? "asc" : "desc")

  const handleFilter = () => {
    const query = build({ search, role, orderDirection })
    router.push(`?${query}`)
  }

  const handleClear = () => {
    setSearch("")
    setRole("")
    router.push(adminRoutes.users.index)
  }

  return (
    <div className='flex gap-2'>
      <AdvancedSearchBar search={search} setSearch={setSearch} />
      <Select onValueChange={setRole} value={role}>
        <SelectTrigger>
          <SelectValue placeholder={t("Role")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='-'>{t("All")}</SelectItem>
          <SelectItem value='user'>{t("User")}</SelectItem>
          <SelectItem value='admin'>{t("Admins")}</SelectItem>
          <SelectItem value='deliveryCompany'>{t("Delivery Companies")}</SelectItem>
        </SelectContent>
      </Select>

      <OrderDirection direction={orderDirection} onDirectionChange={setOrderDirection} />

      <Button onClick={handleFilter}>{t("Filter")}</Button>
      <Button onClick={handleClear} variant='outline'>
        {t("Clear")}
      </Button>
    </div>
  )
}
