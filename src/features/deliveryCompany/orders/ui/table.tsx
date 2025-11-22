"use client"

import { useCurrentCompanyOrders } from "@/entities/order/hooks/useOrders"

import { DeliveryOrdersColumns } from "./columns"
import { SimplePagination } from "@/shared/components/common/simple-pagination"
import { TableSkeleton } from "@/shared/components/skeletons/table"
import { DataTable } from "@/shared/components/common/data-table"

type Props = {
  searchParams: TObject
}

export const DeliveryOrdersTable = ({ searchParams }: Props) => {
  const { orders, isOrdersLoading } = useCurrentCompanyOrders(searchParams)
  if (isOrdersLoading) return <TableSkeleton />

  return (
    <div>
      <DataTable columns={DeliveryOrdersColumns} data={orders?.data as any} />
      <SimplePagination hasNextPage={orders?.pagination.hasNextPage} hasPrevPage={orders?.pagination.hasPrevPage} />
    </div>
  )
}
