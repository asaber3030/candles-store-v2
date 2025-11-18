import { getCurrentUser } from "@/entities/auth/api/auth.api"
import { getCurrentUserOrders } from "@/entities/order/api/order.api"
import { UserOrdersTable } from "@/features/order/table"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { PageTitle } from "@/shared/components/common/page-title"
import { userRoutes } from "@/shared/config/routes"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"

type Props = {
  searchParams: TSearchParams
}

export const metadata: Metadata = {
  title: "Orders - Profile",
  description: "User profile orders page"
}

export default async function UserOrdersPage({ searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams

  const orders = await getCurrentUserOrders(sp)

  const user = await getCurrentUser()
  if (!user) redirect(userRoutes.login)

  return (
    <DefaultContainer className='py-10'>
      <PageTitle className='border-b mb-4 pb-1' title={t("My Orders")} />
      <UserOrdersTable orders={orders.data as any} pagination={orders.pagination} />
    </DefaultContainer>
  )
}
