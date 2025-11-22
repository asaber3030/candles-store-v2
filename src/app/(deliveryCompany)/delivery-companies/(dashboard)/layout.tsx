import { getCurrentUser } from "@/entities/auth/api/auth.api"
import { deliveryRoutes } from "@/shared/config/routes/delivery.routes"
import { userRoutes } from "@/shared/config/routes"
import { getLocale } from "next-intl/server"
import { redirect } from "next/navigation"
import { cn } from "@/shared/lib/cn"

import { DeliverySidebar } from "@/features/deliveryCompany/ui/sidebar/sidebar"
import { AdminNavbar } from "@/shared/components/widgets/navbar/admin"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Delivery Company Dashboard"
}

export default async function DeliveryCompanyLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  const locale = await getLocale()

  if (!user || user.role !== "deliveryCompany") {
    redirect(userRoutes.home)
  }

  const isArabic = locale === "ar"

  return (
    <div className={cn("flex min-h-screen overflow-hidden bg-gray-50 dark:bg-neutral-900")}>
      {/* Sidebar */}
      <aside className={cn("w-[250px] relative bg-white dark:bg-neutral-950", isArabic ? "border-l border-gray-200 dark:border-neutral-800" : "border-r border-gray-200 dark:border-neutral-800")}>
        <DeliverySidebar />
      </aside>

      {/* Main Content */}
      <div className='flex flex-1 flex-col'>
        <AdminNavbar logoUrl={deliveryRoutes.dashboard} />
        <main className={cn("flex-1 py-5 overflow-y-auto xl:px-10 px-4")}>{children}</main>
      </div>
    </div>
  )
}
