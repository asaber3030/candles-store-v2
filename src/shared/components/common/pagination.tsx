"use client"

import { FC } from "react"
import { Button } from "@/shared/components/ui/button"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

export const AdvancedPagination: FC<PaginationMeta> = ({ page, pages, hasNextPage, hasPrevPage }) => {
  if (pages <= 1) return null

  const t = useTranslations()
  const router = useRouter()
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1)

  const nextPage = () => {
    if (!hasNextPage) return
    const query = new URLSearchParams(window.location.search)
    query.set("page", (page + 1).toString())
    router.push(`${window.location.pathname}?${query.toString()}`)
  }

  const prevPage = () => {
    if (!hasPrevPage) return
    const query = new URLSearchParams(window.location.search)
    query.set("page", (page - 1).toString())
    router.push(`${window.location.pathname}?${query.toString()}`)
  }

  const goToPage = (pageNum: number) => {
    const query = new URLSearchParams(window.location.search)
    query.set("page", pageNum.toString())
    router.push(`${window.location.pathname}?${query.toString()}`)
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      {/* Previous Button */}
      <Button onClick={prevPage} variant="outline" size="sm" disabled={page === 1}>
        {t("Prev")}
      </Button>

      {/* Page Numbers */}
      {pageNumbers.map((num) => (
        <Button onClick={() => goToPage(num)} key={num} size="sm" variant={num === page ? "default" : "outline"}>
          {num}
        </Button>
      ))}

      {/* Next Button */}
      <Button onClick={nextPage} variant="outline" size="sm" disabled={page === pages}>
        {t("Next")}
      </Button>
    </div>
  )
}
