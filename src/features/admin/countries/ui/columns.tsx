import { diffForHumans } from "@/shared/lib/date"

import { UpdateCountryModal } from "./update-modal"
import { ColumnDef } from "@tanstack/react-table"
import { Country } from "@prisma/client"
import { Badge } from "@/shared/components/ui/badge"
import { CountryCitiesModal } from "./country-cities-modal"

export const CountriesColumns: ColumnDef<Country>[] = [
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
    accessorKey: "isActive",
    header: "Is Active?",
    cell: ({ row }) => <Badge variant={row.original.isActive ? "success" : "destructive"}>{row.original.isActive ? "Yes" : "No"}</Badge>
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const country = row.original
      return (
        <div className='flex gap-2'>
          <UpdateCountryModal country={country} />
          <CountryCitiesModal country={country} />
        </div>
      )
    }
  }
]
