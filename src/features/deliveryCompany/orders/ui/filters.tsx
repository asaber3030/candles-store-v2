"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useState } from "react"

import { getOrderStatusLabel } from "@/shared/lib/functions"
import { adminRoutes } from "@/shared/config/routes"
import { build } from "search-params"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { OrderStatusList } from "@/shared/config/defaults"
import { OrderDirection } from "@/shared/components/common/order-direction"
import { Button } from "@/shared/components/ui/button"

export const DeliveryOrdersFilters = () => {
  const router = useRouter()
  const sp = useSearchParams()
  const t = useTranslations()

  const [status, setStatus] = useState(sp.get("status") || "-")
  const [orderDirection, setOrderDirection] = useState<TOrderDirection>(sp.get("orderDirection") === "asc" ? "asc" : "desc")

  const handleFilter = () => {
    const query = build({ status, orderDirection })
    router.push(`?${query}`)
  }

  const handleClear = () => {
    setStatus("")
    router.push(adminRoutes.orders.index)
  }

  return (
    <div className='flex gap-2'>
      <Select onValueChange={setStatus} value={status}>
        <SelectTrigger>
          <SelectValue placeholder={t("Status")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='-'>{t("All")}</SelectItem>
          {OrderStatusList.map((status) => (
            <SelectItem key={status} value={status}>
              {getOrderStatusLabel(status)}
            </SelectItem>
          ))}
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
