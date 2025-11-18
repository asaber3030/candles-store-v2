import Link from "next/link"

import { diffForHumans } from "@/shared/lib/date"
import { adminRoutes } from "@/shared/config/routes"

import { ProductWithCategory } from "@/entities/product/model/product"
import { TooltipButton } from "@/shared/components/common/tooltip-button"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/components/ui/badge"
import { Edit, Eye } from "lucide-react"

export const ProductsColumns: ColumnDef<ProductWithCategory>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "picture",
    header: "Picture",
    cell: ({ row }) => <img src={row.getValue("picture")} alt='Product Picture' className='size-16 object-cover rounded-md' />
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "category.name",
    header: "Category"
  },
  {
    accessorKey: "quantity",
    header: "Quantity"
  },
  {
    accessorKey: "inStock",
    header: "In Stock?",
    cell: ({ row }) => <Badge variant={row.getValue("inStock") ? "success" : "destructive"}>{row.getValue("inStock") ? "Yes" : "No"}</Badge>
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
      const product = row.original
      return (
        <div className='flex gap-2'>
          <Link href={adminRoutes.products.view(product.id)}>
            <TooltipButton tooltip='View Product' variant='info' size='icon' icon={Eye} />
          </Link>
          <Link href={adminRoutes.products.update(product.id)}>
            <TooltipButton tooltip='Edit Product' variant='outline' size='icon' icon={Edit} />
          </Link>
        </div>
      )
    }
  }
]
