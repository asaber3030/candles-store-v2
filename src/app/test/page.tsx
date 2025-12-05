import { getOrder } from "@/entities/order/api/order.api"
import { OrderDeliveredStatus } from "@/features/deliveryCompany/orders/ui/view/delivered-card"
import { CompanyOrderTemplate } from "@/shared/email-templates/company-order-template"

export default async function Page() {
  const order = await getOrder(37)
  console.log("order", order)
  if (!order) return null
  return <div dangerouslySetInnerHTML={{ __html: CompanyOrderTemplate({ order }) }} />
}
