import { getCurrentUser } from "@/entities/auth/api/auth.api"
import { userRoutes } from "@/shared/config/routes"
import { getLocale } from "next-intl/server"
import { redirect } from "next/navigation"
import { cn } from "@/shared/lib/cn"

import { DeliveryNavbar } from "@/features/deliveryCompany/ui/navbar/navbar"
import { DeliverySidebar } from "@/features/deliveryCompany/ui/sidebar/sidebar"
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
    <div className={cn("flex min-h-screen overflow-hidden bg-gray-50 dark:bg-neutral-900", isArabic ? "flex-row-reverse" : "flex-row")}>
      {/* Sidebar */}
      <aside className='w-[250px] relative border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950'>
        <DeliverySidebar />
      </aside>

      {/* Main Content */}
      <div className='flex flex-1 flex-col'>
        <DeliveryNavbar />
        <main className='flex-1 py-5 xl:px-10 px-4 overflow-y-auto'>{children}</main>
      </div>
    </div>
  )
}
