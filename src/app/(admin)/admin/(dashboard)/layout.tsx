import { getCurrentUser } from "@/entities/auth/api/auth.api"
import { AdminNavbar } from "@/features/admin/ui/navbar/navbar"
import { AdminSidebar } from "@/features/admin/ui/sidebar/sidebar"
import { userRoutes } from "@/shared/config/routes"
import { cn } from "@/shared/lib/cn"
import { Metadata } from "next"
import { getLocale } from "next-intl/server"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Admin Dashboard"
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  const locale = await getLocale()

  if (!user || user.role !== "admin") {
    redirect(userRoutes.home)
  }

  const isArabic = locale === "ar"

  return (
    <div className={cn("xl:flex min-h-screen overflow-hidden bg-gray-50 dark:bg-neutral-900", isArabic ? "flex-row-reverse" : "flex-row")}>
      {/* Sidebar */}
      <aside className='xl:w-[250px] relative border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950'>
        <AdminSidebar />
      </aside>

      {/* Main Content */}
      <div className='flex flex-1 flex-col'>
        <AdminNavbar />
        <main className='flex-1 py-5 xl:px-10 px-4 overflow-y-auto'>{children}</main>
      </div>
    </div>
  )
}
