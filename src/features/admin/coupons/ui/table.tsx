"use client"

import { SimplePagination } from "@/shared/components/common/simple-pagination"
import { TableSkeleton } from "@/shared/components/skeletons/table"
import { DataTable } from "@/shared/components/common/data-table"
import { CouponsColumns } from "./columns"
import { useCoupons } from "@/entities/coupon/hooks/useCoupons"

type Props = {
  searchParams: TObject
}

export const CouponsTable = ({ searchParams }: Props) => {
  const { coupons, isCouponsLoading } = useCoupons(searchParams)

  if (isCouponsLoading) return <TableSkeleton />

  return (
    <div>
      <DataTable columns={CouponsColumns} data={coupons?.data as any} />
      <SimplePagination hasNextPage={coupons?.pagination.hasNextPage} hasPrevPage={coupons?.pagination.hasPrevPage} />
    </div>
  )
}
