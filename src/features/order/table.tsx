"use client"

import { SimplePagination } from "@/shared/components/common/simple-pagination"
import { OrdersColumns } from "./columns"
import { DataTable } from "@/shared/components/common/data-table"
import { FullOrder } from "../admin/orders/model/orders"

type Props = {
  orders: FullOrder[]
  pagination: PaginationMeta
}

export const UserOrdersTable = ({ orders, pagination }: Props) => {
  return (
    <div>
      <DataTable columns={OrdersColumns} data={orders as any} />
      <SimplePagination hasNextPage={pagination.hasNextPage} hasPrevPage={pagination.hasPrevPage} />
    </div>
  )
}
