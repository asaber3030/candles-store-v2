import { OrderStatusCountCard } from "@/features/admin/dashboard/ui/order-status-count-card"

import { getAppCounts, getOrdersStatsCount, getOrdersStatusCount } from "@/features/admin/dashboard/api/dashboard.api"
import { QuickLink } from "@/features/admin/dashboard/ui/quick-link"
import { StatsItem } from "@/features/admin/dashboard/ui/stats-item"
import { PageTitle } from "@/shared/components/common/page-title"
import { adminRoutes } from "@/shared/config/routes"
import { Building, FlagIcon, ListIcon, LockIcon, PercentCircle, Plus, ShoppingBag, ShoppingCart, TruckIcon, User, UsersIcon, XIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { OrderStatsItem } from "@/features/admin/dashboard/ui/orders-stats-item"

export default async function AdminDashboard() {
  const t = await getTranslations()
  const appCounts = await getAppCounts()
  const ordersCounts = await getOrdersStatusCount()
  const ordersStats = await getOrdersStatsCount()

  return (
    <div className='space-y-6'>
      <PageTitle className='border-b' title={t("Dashboard")} />

      <section>
        <p className='text-lg font-medium mb-1'>{t("Statistics")}</p>
        <section className='grid xl:grid-cols-5 grid-cols-1 gap-4'>
          <StatsItem href={adminRoutes.users.index} icon={User} label={t("Users")} num={appCounts.users} bgColor='bg-green-100' textColor='text-green-800' />
          <StatsItem href={adminRoutes.users.index} icon={TruckIcon} label={t("Delivery Companies")} num={appCounts.deliveryCompanies} bgColor='bg-purple-100' textColor='text-purple-800' />
          <StatsItem href={adminRoutes.users.index} icon={LockIcon} label={t("Admins")} num={appCounts.admins} bgColor='bg-red-100' textColor='text-red-800' />
          <StatsItem href={adminRoutes.categories.index} icon={ListIcon} label={t("Categories")} num={appCounts.categories} bgColor='bg-yellow-100' textColor='text-yellow-800' />
          <StatsItem href={adminRoutes.products.index} icon={ShoppingBag} label={t("Products")} num={appCounts.products} bgColor='bg-blue-100' textColor='text-blue-800' />
          <StatsItem href={adminRoutes.coupons.index} icon={PercentCircle} label={t("Coupons")} num={appCounts.coupons} bgColor='bg-pink-100' textColor='text-pink-800' />
          <StatsItem href={adminRoutes.orders.index} icon={ShoppingCart} label={t("Orders")} num={appCounts.orders} bgColor='bg-teal-100' textColor='text-teal-800' />
          <StatsItem href={""} icon={UsersIcon} label={t("Reviews")} num={appCounts.reviews} bgColor='bg-indigo-100' textColor='text-indigo-800' />
          <StatsItem href={adminRoutes.countries.index} icon={FlagIcon} label={t("Countries")} num={appCounts.countries} bgColor='bg-cyan-100' textColor='text-cyan-800' />
          <StatsItem href={adminRoutes.cities.index} icon={Building} label={t("Cities")} num={appCounts.cities} bgColor='bg-amber-100' textColor='text-amber-800' />
        </section>
      </section>

      <section>
        <p className='text-lg font-medium mb-1'>{t("Quick Links")}</p>
        <section className='grid xl:grid-cols-5 grid-cols-1 gap-4'>
          <QuickLink url={adminRoutes.users.index} label={t("Manage Users")} />
          <QuickLink url={adminRoutes.categories.index} label={t("Manage Categories")} />
          <QuickLink url={adminRoutes.products.index} label={t("Manage Products")} />
          <QuickLink url={adminRoutes.products.create} label={t("Create Product")} icon={Plus} />
          <QuickLink url={adminRoutes.coupons.index} label={t("Manage Coupons")} />
          <QuickLink url={adminRoutes.orders.index} label={t("Manage Orders")} />
          <QuickLink url={adminRoutes.countries.index} label={t("Manage Countries")} />
          <QuickLink url={adminRoutes.cities.index} label={t("Manage Cities")} />
        </section>
      </section>

      <section>
        <p className='text-lg font-medium mb-1'>{t("Current Orders")}</p>
        <OrderStatusCountCard items={ordersCounts} />
      </section>

      <section>
        <p className='text-lg font-medium mb-1'>{t("Orders Statistics")}</p>
        <section className='grid xl:grid-cols-5 grid-cols-1 gap-4'>
          <OrderStatsItem href={adminRoutes.orders.unassigned} icon={XIcon} label={t("Unassigned Orders")} num={ordersStats.unassinged} bgColor='bg-purple-100' textColor='text-purple-800' />
          <OrderStatsItem href={adminRoutes.orders.undelivered} icon={TruckIcon} label={t("Undelivered Orders")} num={ordersStats.undelivered} bgColor='bg-orange-100' textColor='text-orange-800' />
        </section>
      </section>
    </div>
  )
}
