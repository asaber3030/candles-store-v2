"use client"

import AppLogo from "@/shared/components/common/logo"

import { DeliveryNavbarUserDropdown } from "./user-dropdown"
import { LanguageSwitcher } from "@/shared/components/common/language-switcher"
import { adminRoutes } from "@/shared/config/routes"

export const DeliveryNavbar = () => {
  return (
    <nav className='print:hidden bg-white border-b flex justify-between items-center py-2 gap-4 xl:gap-0 xl:px-10 px-4'>
      <AppLogo href={adminRoutes.dashboard} className='size-14' />
      <ul className='flex gap-2 items-center'>
        <li>
          <LanguageSwitcher />
        </li>
        <li>
          <DeliveryNavbarUserDropdown />
        </li>
      </ul>
    </nav>
  )
}
