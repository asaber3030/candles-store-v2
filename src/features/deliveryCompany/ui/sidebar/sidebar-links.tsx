"use client"

import { DollarSign, Home, LogOut, User } from "lucide-react"
import { DeliverySidebarItem } from "./sidebar-item"
import { Separator } from "@/shared/components/ui/separator"

import { adminRoutes } from "@/shared/config/routes"

import { useTranslations } from "next-intl"
import { useLogout } from "@/entities/auth/hooks/useLogout"
import { deliveryRoutes } from "@/shared/config/routes/delivery.routes"

export const DeliverySidebarLinks = () => {
  const t = useTranslations()
  const { logout } = useLogout()

  return (
    <ul className='mt-4'>
      <div>
        <DeliverySidebarItem icon={Home} url={deliveryRoutes.dashboard} label={t("Dashboard")} />
        <DeliverySidebarItem icon={DollarSign} url={deliveryRoutes.orders.index} label={t("Orders")} />
      </div>

      <Separator className='my-4 bg-[#222]' />

      <div>
        <DeliverySidebarItem icon={User} url={deliveryRoutes.profile} label={t("MyAccount")} />
        <li onClick={() => logout()} className='px-4 py-2 rounded-md mb-1 cursor-pointer flex gap-4 items-center transition-all hover:bg-[#222] text-red-600 font-medium'>
          <LogOut className='size-4 text-red-700' /> {t("Logout")}
        </li>
      </div>
    </ul>
  )
}
