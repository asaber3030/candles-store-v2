"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { useLogout } from "@/entities/auth/hooks/useLogout"

import { adminRoutes, userRoutes } from "@/shared/config/routes"
import { cn } from "@/shared/lib/cn"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"
import { Heart, LockIcon, LogOutIcon, Navigation, ShoppingCart, TruckIcon, User } from "lucide-react"
import { ClassValue } from "class-variance-authority/types"
import { Button } from "@/shared/components/ui/button"
import { useCurrentUser } from "@/entities/auth/hooks/useAuth"
import { UserRoleEnum } from "@prisma/client"
import { deliveryRoutes } from "@/shared/config/routes/delivery.routes"

type Props = { className?: ClassValue }

export const NavbarUserDropdown = ({ className }: Props) => {
  const t = useTranslations()
  const logout = useLogout()
  const { user } = useCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={cn(className, "h-10")} variant='outline'>
          <User className='size-4' />
          {t("My Account")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[250px]'>
        <DropdownMenuLabel>{t("My Account")}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link className={cn("flex gap-2 h-full w-full")} href={userRoutes.profile.index}>
            <User className='size-4 text-gray-500' /> {t("profile")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className={cn("flex gap-2 h-full w-full")} href={userRoutes.profile.single("orders")}>
            <ShoppingCart className='size-4 text-gray-500' /> {t("orders")}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link className={cn("flex gap-2 h-full w-full")} href={userRoutes.profile.single("addresses")}>
            <Navigation className='size-4 text-gray-500' /> {t("addresses")}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link className={cn("flex gap-2 h-full w-full")} href={userRoutes.favourites}>
            <Heart className='size-4 text-gray-500' /> {t("favourites")}
          </Link>
        </DropdownMenuItem>

        {user && user.role == UserRoleEnum.admin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className={cn("flex gap-2 h-full w-full")} href={adminRoutes.dashboard}>
                <LockIcon className='size-4 text-gray-500' /> {t("Admin Dashboard")}
              </Link>
            </DropdownMenuItem>
          </>
        )}

        {user && user.role == UserRoleEnum.deliveryCompany && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className={cn("flex gap-2 h-full w-full")} href={deliveryRoutes.dashboard}>
                <TruckIcon className='size-4 text-gray-500' /> {t("Delivery Company Dashboard")}
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem className={cn("flex gap-2 h-full w-full text-red-600 hover:text-red-600")} onClick={() => logout.logout()}>
          <LogOutIcon className='size-4 text-red-600' /> {t("Logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
