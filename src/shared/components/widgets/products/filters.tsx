"use client"

import { useState, useEffect } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { useAllCategories } from "@/entities/category/hooks/useCategories"
import { useRouter, useSearchParams } from "next/navigation"
import { PriceRangeSlider } from "@/shared/components/common/price-range"
import { Label } from "@/shared/components/ui/label"
import { useTranslations } from "next-intl"

type FilterValues = {
  search: string
  categoryId?: number
  minPrice?: number
  maxPrice?: number
}

type Props = {
  onChange: (filters: FilterValues) => void
}

export const ProductFilters = ({ onChange }: Props) => {
  const router = useRouter()
  const sp = useSearchParams()
  const t = useTranslations()

  const [search, setSearch] = useState(sp.get("search") || "")
  const [categoryId, setCategoryId] = useState<number | undefined>(sp.get("categoryId") ? Number(sp.get("categoryId")) : undefined)
  const [minPrice, setMinPrice] = useState<number | undefined>(sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined)

  const { categories } = useAllCategories()

  const handleApply = () => {
    onChange({
      search,
      categoryId,
      minPrice,
      maxPrice,
    })
  }

  const handleReset = () => {
    router.push(`?`)
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-md space-y-8">
      {/* Search */}
      <div className="space-y-4">
        <Label>{t("Search")}</Label>
        <Input placeholder={t("Search products")} value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Category */}
      <div className="space-y-4">
        <Label>{t("Category")}</Label>
        <Select onValueChange={(val) => setCategoryId(Number(val))} value={categoryId?.toString() || ""}>
          <SelectTrigger>
            <SelectValue placeholder={t("Select category")} />
          </SelectTrigger>
          <SelectContent>
            {categories &&
              categories.length &&
              categories.length > 0 &&
              categories?.map((cat) => (
                <SelectItem key={`category-filter-item-${cat.id}`} value={cat.id.toString()}>
                  {cat.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <Label>{t("Price Range")}</Label>
        <PriceRangeSlider minPrice={minPrice ?? 0} maxPrice={maxPrice ?? 1000} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} min={0} max={5000} />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button onClick={handleApply} className="flex-1">
          {t("Apply")}
        </Button>
        <Button variant="outline" onClick={handleReset} className="flex-1">
          {t("Reset")}
        </Button>
      </div>
    </div>
  )
}
