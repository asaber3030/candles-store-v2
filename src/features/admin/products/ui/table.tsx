"use client"

import { SimplePagination } from "@/shared/components/common/simple-pagination"
import { TableSkeleton } from "@/shared/components/skeletons/table"
import { DataTable } from "@/shared/components/common/data-table"
import { useCategories } from "@/entities/category/hooks/useCategories"
import { ProductsColumns } from "./columns"
import { useProducts } from "@/entities/product/hooks/useProducts"

type Props = {
  searchParams: TObject
}

export const ProductsTable = ({ searchParams }: Props) => {
  const { products, isProductsLoading } = useProducts(searchParams)

  if (isProductsLoading) return <TableSkeleton />

  return (
    <div>
      <DataTable columns={ProductsColumns} data={products?.data as any} />
      <SimplePagination hasNextPage={products?.pagination.hasNextPage} hasPrevPage={products?.pagination.hasPrevPage} />
    </div>
  )
}
