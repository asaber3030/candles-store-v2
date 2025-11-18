"use client"

import { useCountries } from "@/entities/country/hooks/useCountries"

import { CountriesColumns } from "./columns"
import { SimplePagination } from "@/shared/components/common/simple-pagination"
import { TableSkeleton } from "@/shared/components/skeletons/table"
import { DataTable } from "@/shared/components/common/data-table"

type Props = {
  searchParams: TObject
}

export const CountriesTable = ({ searchParams }: Props) => {
  const { countries, isCountriesLoading } = useCountries(searchParams)

  if (isCountriesLoading) return <TableSkeleton />

  return (
    <div>
      <DataTable columns={CountriesColumns} data={countries?.data as any} />
      <SimplePagination hasNextPage={countries?.pagination.hasNextPage} hasPrevPage={countries?.pagination.hasPrevPage} />
    </div>
  )
}
