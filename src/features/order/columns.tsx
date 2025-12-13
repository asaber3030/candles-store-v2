import Link from "next/link"

import { getOrderStatusLabel, getOrderStatusVariant } from "@/shared/lib/functions"
import { formatCurrency } from "@/shared/lib/numbers"
import { diffForHumans } from "@/shared/lib/date"
import { adminRoutes, userRoutes } from "@/shared/config/routes"

import { TooltipButton } from "@/shared/components/common/tooltip-button"
import { ColumnDef } from "@tanstack/react-table"
import { LinkBtn } from "@/shared/components/common/link-button"
import { Badge } from "@/shared/components/ui/badge"
import { Eye } from "lucide-react"
import { FullOrder } from "../admin/orders/model/orders"

export const OrdersColumns: ColumnDef<FullOrder>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user.name",
    header: "User",
    cell: ({ row }) => {
      const user = row.original.user
      return (
        <LinkBtn variant="ghost" href={adminRoutes.users.details(user.id)}>
          {user.name} - {user.phoneNumber}
        </LinkBtn>
      )
    },
  },

  {
    accessorKey: "company.name",
    header: "Delivery Company",
    cell: ({ row }) => {
      const user = row.original.user
      return (
        <LinkBtn variant="ghost" href={adminRoutes.users.details(user.id)}>
          {user.name} - {user.phoneNumber}
        </LinkBtn>
      )
    },
  },
  {
    accessorKey: "total",
    header: "Total Amount",
    cell: ({ row }) => {
      const total = row.getValue("total") as number
      return <p className="text-green-600 font-bold">{formatCurrency(total)}</p>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant={getOrderStatusVariant(row.original.status) as any}>{getOrderStatusLabel(row.getValue("status"))}</Badge>,
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => (
      <Badge variant={row.original.paymentStatus == "paid" ? "success" : "warning"} className="capitalize">
        {row.original.paymentStatus}
      </Badge>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "orderedAt",
    header: "Ordered At",
    cell: ({ row }) => diffForHumans(row.getValue("orderedAt")),
  },
  {
    accessorKey: "deliveredAt",
    header: "Delivered At",
    cell: ({ row }) => (row.getValue("deliveredAt") ? diffForHumans(row.getValue("deliveredAt")) : "N/A"),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className="flex gap-2">
          <Link href={userRoutes.profile.viewOrder(order.id)}>
            <TooltipButton tooltip="View Order Details" variant="outline" size="icon" icon={Eye} />
          </Link>
        </div>
      )
    },
  },
]
