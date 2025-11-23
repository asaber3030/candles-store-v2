import { getDeliveryCompanyOrdersStatsCount, getDeliveryOrdersStatusCount, getDeliveryTotalIncome } from "@/features/deliveryCompany/dashboard/api/dashboard.api"
import { getTranslations } from "next-intl/server"

import { DeliveryEarningCards } from "@/features/deliveryCompany/dashboard/ui/earnings-cards"
import { PageTitle } from "@/shared/components/common/page-title"
import { DeliveryOrderStatsItem } from "@/features/deliveryCompany/dashboard/ui/orders-stats-item"
import { Check } from "lucide-react"
import { deliveryRoutes } from "@/shared/config/routes/delivery.routes"
import { DeliveryOrderStatusCountCard } from "@/features/deliveryCompany/dashboard/ui/order-status-count-card"

export default async function DeliveryDashboard() {
  const t = await getTranslations()

  const orderStats = await getDeliveryCompanyOrdersStatsCount()
  const earningStats = await getDeliveryTotalIncome()
  const itemsStatus = await getDeliveryOrdersStatusCount()

  return (
    <div className='space-y-6'>
      <PageTitle className='border-b' title={t("Dashboard")} />
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <DeliveryOrderStatsItem bgColor='bg-blue-100' textColor='text-blue-800' href={deliveryRoutes.orders.delivered} icon={Check} num={orderStats.delivered} label={t("Delivered Orders")} />
        <DeliveryOrderStatsItem bgColor='bg-blue-100' textColor='text-blue-800' href={deliveryRoutes.orders.undelivered} icon={Check} num={orderStats.undelivered} label={t("Undelivered Orders")} />
      </section>
      <section>
        <DeliveryOrderStatusCountCard items={itemsStatus} />
      </section>
      <DeliveryEarningCards totalEarned={earningStats.completed} totalIncoming={earningStats.pending} />
    </div>
  )
}
