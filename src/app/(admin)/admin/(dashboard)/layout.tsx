import { getCurrentUser } from "@/entities/auth/api/auth.api"
import { AdminSidebar } from "@/features/admin/ui/sidebar/sidebar"
import { AdminNavbar } from "@/shared/components/widgets/navbar/admin"
import { adminRoutes, userRoutes } from "@/shared/config/routes"
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
    <div className={cn("flex min-h-screen overflow-hidden bg-gray-50 dark:bg-neutral-900")}>
      {/* Sidebar */}
      <aside className={cn("w-[250px] relative bg-white dark:bg-neutral-950", isArabic ? "border-l border-gray-200 dark:border-neutral-800" : "border-r border-gray-200 dark:border-neutral-800")}>
        <AdminSidebar />
      </aside>

      {/* Main Content */}
      <div className='flex flex-1 flex-col'>
        <AdminNavbar logoUrl={adminRoutes.dashboard} />
        <main className={cn("flex-1 py-5 overflow-y-auto xl:px-10 px-4")}>{children}</main>
      </div>
    </div>
  )
}
