import { diffForHumans } from "@/shared/lib/date"

import { UpdateCityModal } from "./update-modal"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/components/ui/badge"
import { City } from "@prisma/client"

export const CitiesColumns: ColumnDef<City>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "code",
    header: "Code"
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "price",
    header: "Price"
  },
  {
    accessorKey: "isActive",
    header: "Is Active?",
    cell: ({ row }) => <Badge variant={row.original.isActive ? "success" : "destructive"}>{row.original.isActive ? "Yes" : "No"}</Badge>
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const city = row.original
      return (
        <div className='flex gap-2'>
          <UpdateCityModal city={city} />
        </div>
      )
    }
  }
]
