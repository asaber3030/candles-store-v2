import Link from "next/link"

import { diffForHumans } from "@/shared/lib/date"

import { TooltipButton } from "@/shared/components/common/tooltip-button"
import { ColumnDef } from "@tanstack/react-table"
import { Category } from "@prisma/client"
import { Badge } from "@/shared/components/ui/badge"
import { Eye } from "lucide-react"

import { adminRoutes } from "@/shared/config/routes"
import { RestoreModal } from "@/shared/components/common/restore-modal"
import { deleteCategoryAction, restoreCategoryAction } from "@/entities/category/api/category.api"
import { queryKeys } from "@/shared/config/query-keys"
import { DeleteModal } from "@/shared/components/common/delete-modal"
import { UpdateCategoryModal } from "./update-modal"

export const CategoriesColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      const iconUrl = row.getValue("icon") as string
      return iconUrl ? <img src={iconUrl} alt='Category Icon' className='w-10 h-10 object-cover rounded-md' /> : null
    }
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "nameAr",
    header: "Arabic Name"
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
      const category = row.original
      return (
        <div className='flex gap-2'>
          <Link href={adminRoutes.categories.products(category.id)}>
            <TooltipButton tooltip={"Category Products"} icon={Eye} size='icon' />
          </Link>
          <UpdateCategoryModal category={category} />
          {category.deletedAt ? <RestoreModal id={category.id} action={restoreCategoryAction} queryKey={queryKeys.categories.index()} /> : <DeleteModal id={category.id} action={deleteCategoryAction} queryKey={queryKeys.categories.index()} />}
        </div>
      )
    }
  }
]
