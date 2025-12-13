"use client"

import AppLogo from "@/shared/components/common/logo"

import { NavbarFavouritesLink } from "./favourties-link"
import { MobileNavbarTrigger } from "./mobile-navbar-trigger"
import { LanguageSwitcher } from "@/shared/components/common/language-switcher"
import { NavbarSearch } from "./search-bar"
import { CartDrawer } from "@/features/cart/ui/drawer"

export const MobileNavbarContainer = () => {
  return (
    <nav className="xl:hidden h-[160px] w-full left-0 top-0 z-40 flex items-center justify-between xl:px-20 px-6 py-4 bg-white shadow-md border-b border-b-gray-200">
      <div className="flex gap-2 items-center">
        <NavbarSearch />
        <NavbarFavouritesLink />
        <CartDrawer />
      </div>
      <AppLogo />
      <div className="flex gap-2 items-center">
        <LanguageSwitcher />
        <MobileNavbarTrigger />
      </div>
    </nav>
  )
}
