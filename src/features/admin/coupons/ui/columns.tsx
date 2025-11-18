import { diffForHumans } from "@/shared/lib/date"

import { ColumnDef } from "@tanstack/react-table"
import { Coupon } from "@prisma/client"
import { Badge } from "@/shared/components/ui/badge"
import { RestoreModal } from "@/shared/components/common/restore-modal"
import { deleteCouponAction, restoreCouponAction } from "@/entities/coupon/api/coupon.api"
import { DeleteModal } from "@/shared/components/common/delete-modal"
import { UpdateCountryModal } from "../../countries/ui/update-modal"
import { UpdateCouponModal } from "./update-modal"

export const CouponsColumns: ColumnDef<Coupon>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => `${row.getValue("discount")}%`
  },
  {
    accessorKey: "usages",
    header: "Usages"
  },

  {
    accessorKey: "active",
    header: "Is Active?",
    cell: ({ row }) => <Badge variant={row.original.active ? "success" : "destructive"}>{row.original.active ? "Yes" : "No"}</Badge>
  },
  {
    accessorKey: "deletedAt",
    header: "Deleted",
    cell: ({ row }) => <Badge variant={row.original.deletedAt === null ? "success" : "destructive"}>{row.original.deletedAt === null ? "Yes" : "No"}</Badge>
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => diffForHumans(row.getValue("createdAt"))
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const coupon = row.original
      return (
        <div className='flex gap-2'>
          <UpdateCouponModal coupon={coupon} />
          {coupon.deletedAt ? <RestoreModal id={coupon.id} action={restoreCouponAction} /> : <DeleteModal id={coupon.id} action={deleteCouponAction} />}
        </div>
      )
    }
  }
]
