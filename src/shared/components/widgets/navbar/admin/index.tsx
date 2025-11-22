import AppLogo from "@/shared/components/common/logo"

import { LanguageSwitcher } from "@/shared/components/common/language-switcher"
import { adminRoutes } from "@/shared/config/routes"
import { AdminNavbarAccountDropdown } from "./account-dropdown"

type Props = {
  logoUrl?: string
}

export const AdminNavbar = ({ logoUrl = adminRoutes.dashboard }: Props) => {
  return (
    <nav className='print:hidden bg-white border-b flex justify-between items-center py-2 gap-4 xl:gap-0 xl:px-10 px-4'>
      <AppLogo href={logoUrl} className='size-14' />
      <ul className='flex gap-2 items-center'>
        <li>
          <LanguageSwitcher />
        </li>
        <li>
          <AdminNavbarAccountDropdown />
        </li>
      </ul>
    </nav>
  )
}
