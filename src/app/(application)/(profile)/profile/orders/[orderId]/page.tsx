import { getCurrentUser } from "@/entities/auth/api/auth.api"
import { getUserOrder } from "@/entities/order/api/order.api"
import { CancelOrderButton } from "@/features/order/cancel-order-button"
import { ViewUserOrderDetails } from "@/features/order/view-order"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { ErrorAlert } from "@/shared/components/common/error-alert"
import { PageTitle } from "@/shared/components/common/page-title"
import { userRoutes } from "@/shared/config/routes"
import { OrderStatusEnum } from "@prisma/client"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{ orderId: string }>
}

export const metadata: Metadata = {
  title: "Orders - Profile",
  description: "User profile orders page"
}

export default async function ViewOrderPage({ params }: Props) {
  const t = await getTranslations()

  const { orderId } = await params

  const user = await getCurrentUser()
  if (!user) redirect(userRoutes.login)

  const order = await getUserOrder(Number(orderId))
  if (!order)
    return (
      <DefaultContainer className='py-10'>
        <ErrorAlert title={t("Order not found")} />
      </DefaultContainer>
    )

  return (
    <DefaultContainer className='py-10'>
      <PageTitle className='border-b mb-4 pb-1' title={t("Order Details") + ` #${order.id}`}>
        {order.status === OrderStatusEnum.JustOrdered && <CancelOrderButton orderId={order.id} />}
      </PageTitle>

      <ViewUserOrderDetails order={order} />
    </DefaultContainer>
  )
}
