import { UpdateOrderButton } from "@/features/deliveryCompany/orders/ui/view/update-order-button"
import { ViewOrderDetails } from "@/features/deliveryCompany/orders/ui/view/view-order"
import { PageTitle } from "@/shared/components/common/page-title"

import { getTranslations } from "next-intl/server"
import { getOrder } from "@/entities/order/api/order.api"
import { notFound } from "next/navigation"
import { getCurrentUser } from "@/entities/auth/api/auth.api"

type Props = {
  params: Promise<{ orderId: string }>
}

export default async function ViewOrderDetailsPage({ params }: Props) {
  const t = await getTranslations()
  const currentUser = await getCurrentUser()
  const { orderId } = await params

  const order = await getOrder(Number(orderId))
  if (!order) notFound()

  if (order.companyId != currentUser?.id) notFound()

  return (
    <div>
      <PageTitle title={t("Order # Details", { orderNumber: orderId })}>
        <UpdateOrderButton orderId={order.id} status={order.status} statusNumber={order.statusNumber} />
      </PageTitle>
      <ViewOrderDetails order={order} />
    </div>
  )
}
