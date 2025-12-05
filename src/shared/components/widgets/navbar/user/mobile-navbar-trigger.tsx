"use client"

import AppLogo from "@/shared/components/common/logo"

import { useTranslations } from "next-intl"
import { useCurrentUser } from "@/entities/auth/hooks/useAuth"
import { useState } from "react"

import { userRoutes } from "@/shared/config/routes"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet"
import { NavbarCategoriesDropdown } from "./categories-dropdown"
import { NavbarUserDropdown } from "./user-dropdown"
import { MobileNavbarItem } from "./mobile-navbar-item"
import { NavbarGuestLinks } from "./navbar-guest-links"
import { NavbarItems } from "@/shared/config/defaults"
import { Separator } from "@/shared/components/ui/separator"
import { MenuIcon } from "lucide-react"
import { Button } from "@/shared/components/ui/button"

import { Skeleton } from "@/shared/components/ui/skeleton"

export const MobileNavbarTrigger = () => {
  const t = useTranslations()

  const [open, setOpen] = useState(false)
  const { user, isUserLoading } = useCurrentUser()

  const handleClose = () => {
    setOpen(false)
  }

  return (
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
