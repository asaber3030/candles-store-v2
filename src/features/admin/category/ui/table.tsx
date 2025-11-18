"use client"

import { SimplePagination } from "@/shared/components/common/simple-pagination"
import { TableSkeleton } from "@/shared/components/skeletons/table"
import { DataTable } from "@/shared/components/common/data-table"
import { useCategories } from "@/entities/category/hooks/useCategories"
import { CategoriesColumns } from "./columns"

type Props = {
  searchParams: TObject
}

export const CategoriesTable = ({ searchParams }: Props) => {
  const { categories, isCategoriesLoading } = useCategories(searchParams)

  if (isCategoriesLoading) return <TableSkeleton />

  return (
    <div>
      <DataTable columns={CategoriesColumns} data={categories?.data as any} />
      <SimplePagination hasNextPage={categories?.pagination.hasNextPage} hasPrevPage={categories?.pagination.hasPrevPage} />
    </div>
  )
}
