import { getUser } from "@/entities/user/api/user.api"
import { AdminUsersFilers } from "@/features/admin/users/ui/filters"
import { UsersTable } from "@/features/admin/users/ui/table"
import { AdminViewUser } from "@/features/admin/users/ui/view-user"
import { PageTitle } from "@/shared/components/common/page-title"

import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

type Props = {
  searchParams: TSearchParams
  params: Promise<{ userId: string }>
}

export default async function UsersPage({ searchParams, params }: Props) {
  const { userId } = await params

  const sp = await searchParams
  const t = await getTranslations()

  const user = await getUser(+userId)
  if (!user) notFound()

  return (
    <div>
      <PageTitle title={`${t("User")} - ${user.name} # ${user.email}`} />
      <AdminViewUser searchParams={sp} user={user} />
    </div>
  )
}
