"use client"

import { useOrders, useUserOrders } from "@/entities/order/hooks/useOrders"

import { SimplePagination } from "@/shared/components/common/simple-pagination"
import { TableSkeleton } from "@/shared/components/skeletons/table"
import { DataTable } from "@/shared/components/common/data-table"
import { OrdersColumns } from "../../orders/ui/columns"
import { useSearchParams } from "next/navigation"

type Props = {
  searchParams: TObject
}

export const UserOrdersTable = ({ searchParams }: Props) => {
  const sp = useSearchParams()
  const userId = Number(sp.get("userId"))

  const { orders, isOrdersLoading } = useUserOrders(userId, searchParams)

  if (isOrdersLoading) return <TableSkeleton />

  return (
    <div>
      <DataTable columns={OrdersColumns} data={orders?.data as any} />
      <SimplePagination hasNextPage={orders?.pagination.hasNextPage} hasPrevPage={orders?.pagination.hasPrevPage} />
    </div>
  )
}
