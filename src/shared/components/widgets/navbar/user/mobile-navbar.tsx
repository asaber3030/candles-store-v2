"use client"

import AppLogo from "@/shared/components/common/logo"

import { useFavouritesStore } from "@/features/favourites/model/favourite.store"
import { useTranslations } from "next-intl"
import { useCurrentUser } from "@/entities/auth/hooks/useAuth"
import { useState } from "react"

import { userRoutes } from "@/shared/config/routes"
import { cn } from "@/shared/lib/cn"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet"
import { NavbarUserDropdown } from "./user-dropdown"
import { MobileNavbarItem } from "./mobile-navbar-item"
import { LanguageSwitcher } from "@/shared/components/common/language-switcher"
import { NavbarGuestLinks } from "./navbar-guest-links"
import { CartDrawer } from "@/features/cart/ui/drawer"
import { Separator } from "@/shared/components/ui/separator"
import { HeartIcon, MenuIcon, PhoneIcon } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { LinkBtn } from "@/shared/components/common/link-button"
import { NavbarSearch } from "./search-bar"
import { NavbarItems } from "@/shared/config/defaults"
import { NavbarCategoriesDropdown } from "./categories-dropdown"

export const MobileNavbarContainer = () => {
  const [open, setOpen] = useState(false)

  const t = useTranslations()

  const { user, isUserLoading } = useCurrentUser()
  const { favourites } = useFavouritesStore()

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <nav className="xl:hidden h-[130px] w-full left-0 top-0 z-40 flex items-center justify-between xl:px-20 px-6 py-4 bg-white shadow-md border-b border-b-gray-200">
      <AppLogo />

      <div className="flex gap-2 items-center">
        <LanguageSwitcher />
        <NavbarSearch />
        <div className={cn("relative")}>
          <LinkBtn href={userRoutes.favourites} size="icon" icon={HeartIcon} variant="destructive" className="size-10 rounded-full text-white" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{favourites.length}</span>
        </div>
        <CartDrawer />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button icon={MenuIcon} size="icon" variant="outline" className="size-10 rounded-full" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="mx-auto">
                <AppLogo />
              </SheetTitle>
            </SheetHeader>
            <Separator />

            <ul className="p-4 space-y-2">
              {NavbarItems.map((item) => (
                <li onClick={handleClose} key={item.href}>
                  <MobileNavbarItem href={item.href} label={t(item.name)} />
                </li>
              ))}
              <NavbarCategoriesDropdown>
                <li className="flex gap-2 w-full py-2 px-4 rounded-full text-nowrap items-center transition-all border bg-white line-clamp-1 hover:bg-gray-100 text-sm">{t("Categories")}</li>
              </NavbarCategoriesDropdown>
              <MobileNavbarItem href={userRoutes.contact} label={t("Contact")} />
            </ul>

            <Separator />

            <div className="flex gap-2 items-center p-4">{isUserLoading ? <LoadingButtons /> : !user ? <NavbarGuestLinks /> : <NavbarUserDropdown />}</div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

const LoadingButtons = () => {
  return (
    <div className="px-2 border-l space-x-2 flex gap-2">
      <Skeleton className="w-22 h-9" />
      <Skeleton className="w-26 h-9" />
    </div>
  )
}
