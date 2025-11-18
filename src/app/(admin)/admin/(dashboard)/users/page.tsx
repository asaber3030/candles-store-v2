import { CreateUserModal } from "@/features/admin/users/ui/create-modal"
import { AdminUsersFilers } from "@/features/admin/users/ui/filters"
import { UsersTable } from "@/features/admin/users/ui/table"
import { PageTitle } from "@/shared/components/common/page-title"

import { getTranslations } from "next-intl/server"

type Props = {
  searchParams: TSearchParams
}

export default async function UsersPage({ searchParams }: Props) {
  const sp = await searchParams
  const t = await getTranslations()

  return (
    <div className='space-y-4'>
      <PageTitle title={t("Users")}>
        <CreateUserModal />
      </PageTitle>
      <AdminUsersFilers />
      <UsersTable searchParams={sp} />
    </div>
  )
}
