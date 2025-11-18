"use client"

import { SimplePagination } from "@/shared/components/common/simple-pagination"
import { TableSkeleton } from "@/shared/components/skeletons/table"
import { DataTable } from "@/shared/components/common/data-table"
import { useCities } from "@/entities/city/hooks/useCities"
import { CitiesColumns } from "./columns"

type Props = {
  searchParams: TObject
}

export const CitiesTable = ({ searchParams }: Props) => {
  const { cities, isCitiesLoading } = useCities(searchParams)

  if (isCitiesLoading) return <TableSkeleton />

  return (
    <div>
      <DataTable columns={CitiesColumns} data={cities?.data as any} />
      <SimplePagination hasNextPage={cities?.pagination.hasNextPage} hasPrevPage={cities?.pagination.hasPrevPage} />
    </div>
  )
}
