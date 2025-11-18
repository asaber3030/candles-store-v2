"use client"

import { cn } from "@/shared/lib/cn"
import { DeliverySidebarHeader } from "./sidebar-header"
import { DeliverySidebarLinks } from "./sidebar-links"
import { useLocale } from "next-intl"

export const DeliverySidebar = () => {
  const locale = useLocale()
  const isArabic = locale === "ar"

  return (
    <aside className={cn("hidden xl:flex flex-col py-6 px-4 fixed top-0 h-screen w-[250px] z-30 bg-neutral-900 text-white transition-all", isArabic ? "right-0 border-l border-neutral-800" : "left-0 border-r border-neutral-800")}>
      <DeliverySidebarHeader />
      <div className='flex-1 overflow-y-auto'>
        <DeliverySidebarLinks />
      </div>
    </aside>
  )
}
