"use client"

import { Separator } from "@/shared/components/ui/separator"
import { Building2, Cog, DollarSign, Flag, Gift, Home, List, Lock, LogOut, Percent, ShoppingBag, User, Users } from "lucide-react"
import { SidebarItem } from "./sidebar-item"

import { adminRoutes } from "@/shared/config/routes"

import { useTranslations } from "next-intl"
import { useLogout } from "@/entities/auth/hooks/useLogout"

export const SidebarLinks = () => {
  const t = useTranslations()
  const { logout } = useLogout()

  return (
    <ul className='mt-4'>
      <div>
        <SidebarItem icon={Home} url={adminRoutes.dashboard} label={t("Dashboard")} />
        <SidebarItem icon={ShoppingBag} url={adminRoutes.products.index} label={t("Products")} />
        <SidebarItem icon={List} url={adminRoutes.categories.index} label={t("Categories")} />
        <SidebarItem icon={Users} url={adminRoutes.users.index} label={t("Users")} />
        <SidebarItem icon={DollarSign} url={adminRoutes.orders.index} label={t("Orders")} />
        <SidebarItem icon={Percent} url={adminRoutes.coupons.index} label={t("Coupons")} />
      </div>

      <Separator className='my-4 bg-[#222]' />

      <div>
        <SidebarItem icon={Flag} url={adminRoutes.countries.index} label={t("Countries")} />
        <SidebarItem icon={Building2} url={adminRoutes.cities.index} label={t("Cities")} />
      </div>

      <Separator className='my-4 bg-[#222]' />

      <div>
        <SidebarItem icon={User} url={adminRoutes.profile} label={t("MyAccount")} />
        <SidebarItem icon={Cog} url={adminRoutes.settings} label={t("Settings")} />
        <li onClick={() => logout()} className='px-4 py-2 rounded-md mb-1 cursor-pointer flex gap-4 items-center transition-all hover:bg-[#222] text-red-600 font-medium'>
          <LogOut className='size-4 text-red-700' /> {t("Logout")}
        </li>
      </div>
    </ul>
  )
}
