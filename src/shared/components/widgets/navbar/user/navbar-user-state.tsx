"use client"

import { useCurrentUser } from "@/entities/auth/hooks/useAuth"
import { useLocale } from "next-intl"

import { cn } from "@/shared/lib/cn"

import { NavbarUserDropdown } from "./user-dropdown"
import { NavbarGuestLinks } from "./navbar-guest-links"
import { Skeleton } from "@/shared/components/ui/skeleton"

export const NavbarUserState = () => {
  const locale = useLocale()
  const { user, isUserLoading } = useCurrentUser()

  return (
    <>
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
    </>
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
