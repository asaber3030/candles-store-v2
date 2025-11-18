"use client"

import { useOrders } from "@/entities/order/hooks/useOrders"

import { SimplePagination } from "@/shared/components/common/simple-pagination"
import { TableSkeleton } from "@/shared/components/skeletons/table"
import { OrdersColumns } from "./columns"
import { DataTable } from "@/shared/components/common/data-table"

type Props = {
  searchParams: TObject
}

export const OrdersTable = ({ searchParams }: Props) => {
  const { orders, isOrdersLoading } = useOrders(searchParams)
  if (isOrdersLoading) return <TableSkeleton />

  return (
    <div>
      <DataTable columns={OrdersColumns} data={orders?.data as any} />
      <SimplePagination hasNextPage={orders?.pagination.hasNextPage} hasPrevPage={orders?.pagination.hasPrevPage} />
    </div>
  )
}
