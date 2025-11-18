"use client"

import { SimplePagination } from "@/shared/components/common/simple-pagination"
import { TableSkeleton } from "@/shared/components/skeletons/table"
import { UsersColumns } from "./columns"
import { DataTable } from "@/shared/components/common/data-table"
import { useUsers } from "@/entities/user/hooks/useUsers"

type Props = {
  searchParams: TObject
}

export const UsersTable = ({ searchParams }: Props) => {
  const { users, isUsersLoading } = useUsers(searchParams)

  if (isUsersLoading) return <TableSkeleton />

  return (
    <div>
      <DataTable columns={UsersColumns} data={users?.data as any} />
      <SimplePagination hasNextPage={users?.pagination.hasNextPage} hasPrevPage={users?.pagination.hasPrevPage} />
    </div>
  )
}
