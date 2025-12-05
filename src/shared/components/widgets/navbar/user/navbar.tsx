"use client"

import AppLogo from "@/shared/components/common/logo"

import { useTranslations } from "next-intl"
import { useContext } from "react"

import { userRoutes } from "@/shared/config/routes"

import { NavbarCategoriesDropdown } from "./categories-dropdown"
import { NavbarFavouritesLink } from "./favourties-link"
import { AppSettingsContext } from "@/shared/providers/settings.provider"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { LanguageSwitcher } from "@/shared/components/common/language-switcher"
import { NavbarUserState } from "./navbar-user-state"
import { NavbarSearch } from "./search-bar"
import { NavbarItems } from "@/shared/config/defaults"
import { NavbarItem } from "./navbar-item"
import { CartDrawer } from "@/features/cart/ui/drawer"

export const AppNavbar = () => {
  const settings = useContext(AppSettingsContext)
  const t = useTranslations()

  return (
    <nav className="w-full border-b py-2 shadow-md bg-white hidden xl:block">
      <DefaultContainer className="flex items-center px-4 gap-4 justify-between ">
        <AppLogo logo={settings?.logo} />

        <ul className="flex gap-2 items-center list-none">
          {NavbarItems.map((item) => (
            <NavbarItem key={item.href} url={item.href} label={t(item.name)} />
          ))}
          <NavbarCategoriesDropdown />
          <NavbarItem key={userRoutes.contact} url={userRoutes.contact} label={t("Contact")} />
          <NavbarSearch />
        </ul>

        <div className="flex gap-2 items-center">
          <LanguageSwitcher />
          <NavbarFavouritesLink />
          <CartDrawer />
          <NavbarUserState />
        </div>
      </DefaultContainer>
    </nav>
  )
}
