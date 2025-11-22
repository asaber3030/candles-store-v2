"use client"

import AppLogo from "@/shared/components/common/logo"

import { useTranslations } from "next-intl"
import { useCurrentUser } from "@/entities/auth/hooks/useAuth"
import { useState } from "react"

import { userRoutes } from "@/shared/config/routes"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet"
import { NavbarUserDropdown } from "./user-dropdown"
import { MobileNavbarItem } from "./mobile-navbar-item"
import { LanguageSwitcher } from "@/shared/components/common/language-switcher"
import { NavbarGuestLinks } from "./navbar-guest-links"
import { CartDrawer } from "@/features/cart/ui/drawer"
import { Separator } from "@/shared/components/ui/separator"
import { MenuIcon } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Skeleton } from "@/shared/components/ui/skeleton"

export const MobileNavbarContainer = () => {
  const [open, setOpen] = useState(false)

  const t = useTranslations()

  const { user, isUserLoading } = useCurrentUser()

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <nav className='xl:hidden fixed h-[85px] w-full left-0 top-0 z-40 flex items-center justify-between xl:px-20 px-6 py-4 bg-white shadow-md border-b border-b-gray-200'>
      <AppLogo />

      <div className='flex gap-2 items-center'>
        <LanguageSwitcher />
        <CartDrawer />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button icon={MenuIcon} size='icon' variant='outline' className='h-10 w-10' />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className='mx-auto'>
                <AppLogo />
              </SheetTitle>
            </SheetHeader>
            <Separator />

            <ul className='p-4 space-y-2'>
              <li onClick={handleClose}>
                <MobileNavbarItem href={userRoutes.home} label={t("Home")} />
              </li>
              <li onClick={handleClose}>
                <MobileNavbarItem href={userRoutes.about} label={t("About")} />
              </li>
              <li onClick={handleClose}>
                <MobileNavbarItem href={userRoutes.categories.index} label={t("Categories")} />
              </li>
              <li onClick={handleClose}>
                <MobileNavbarItem href={userRoutes.shop} label={t("Shop Now")} />
              </li>
            </ul>

            <Separator />

            <div className='flex gap-2 items-center p-4'>{isUserLoading ? <LoadingButtons /> : !user ? <NavbarGuestLinks /> : <NavbarUserDropdown />}</div>
          </SheetContent>
        </Sheet>
      </div>
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
