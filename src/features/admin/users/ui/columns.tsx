import Link from "next/link"

import { diffForHumans } from "@/shared/lib/date"
import { adminRoutes } from "@/shared/config/routes"

import { UpdateUserModal } from "./update-modal"
import { TooltipButton } from "@/shared/components/common/tooltip-button"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/components/ui/badge"
import { User } from "@prisma/client"
import { Eye } from "lucide-react"

export const UsersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number"
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role")
      return <p className='capitalize'>{String(role)}</p>
    }
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "deletedAt",
    header: "Is Active?",
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
      const user = row.original
      return (
        <div className='flex gap-2'>
          <UpdateUserModal user={user} />
          <Link href={adminRoutes.users.details(user.id)}>
            <TooltipButton tooltip={"View User"} icon={Eye} size='icon' />
          </Link>
        </div>
      )
    }
  }
]
