"use client"

import AppLogo from "@/shared/components/common/logo"

import { AdminNavbarUserDropdown } from "./user-dropdown"
import { LanguageSwitcher } from "@/shared/components/common/language-switcher"
import { adminRoutes } from "@/shared/config/routes"
import { useLogout } from "@/entities/auth/hooks/useLogout"

export const AdminNavbar = () => {
  const { logout } = useLogout()
  return (
    <nav className='print:hidden bg-white border-b flex justify-between items-center py-2 gap-4 xl:gap-0 xl:px-10 px-4'>
      <AppLogo href={adminRoutes.dashboard} className='size-14' />
      <ul className='flex gap-2 items-center'>
        <li>
          <LanguageSwitcher />
        </li>
        <li>
          <AdminNavbarUserDropdown />
        </li>
        <li></li>
      </ul>
    </nav>
  )
}
