"use client"

import AppLogo from "@/shared/components/common/logo"

import { useLocale, useTranslations } from "next-intl"
import { useCurrentUser } from "@/entities/auth/hooks/useAuth"
import { useContext } from "react"

import { NavbarUserDropdown } from "./user-dropdown"
import { AppSettingsContext } from "@/shared/providers/settings.provider"
import { NavbarGuestLinks } from "./navbar-guest-links"
import { LanguageSwitcher } from "@/shared/components/common/language-switcher"
import { NavbarItem } from "./navbar-item"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { CartDrawer } from "@/features/cart/ui/drawer"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { userRoutes } from "@/shared/config/routes"
import { cn } from "@/shared/lib/cn"

export const AppNavbar = () => {
  const settings = useContext(AppSettingsContext)
  const t = useTranslations()
  const locale = useLocale()

  const { user, isUserLoading } = useCurrentUser()

  return (
    <nav className='w-full border-b py-2 shadow-md bg-white hidden xl:block'>
      <DefaultContainer className='flex items-center px-4 gap-4 justify-between '>
        <AppLogo logo={settings?.logo} />

        <ul className='flex gap-2 items-center list-none'>
          <NavbarItem url={userRoutes.home} label={t("Home")} />
          <NavbarItem url={userRoutes.about} label={t("About")} />
          <NavbarItem url={userRoutes.categories.index} label={t("Categories")} />
          <NavbarItem url={userRoutes.shop} label={t("Shop Now")} />
        </ul>

        <div className='flex gap-2 items-center'>
          <CartDrawer />
          <LanguageSwitcher />
          {isUserLoading ? (
            <LoadingButtons />
          ) : !user ? (
            <div className={cn("px-2 space-x-2", locale == "ar" ? "border-r" : "border-l")}>
              <NavbarGuestLinks />
            </div>
          ) : (
            <div className={cn("px-2 space-x-2", locale == "ar" ? "border-r" : "border-l")}>
              <NavbarUserDropdown />
            </div>
          )}
        </div>
      </DefaultContainer>
    </nav>
  )
}

const LoadingButtons = () => {
  return (
    <div className='px-2 border-l space-x-2 flex gap-2'>
      <Skeleton className='w-22 h-9' />
      <Skeleton className='w-26 h-9' />
    </div>
  )
}
