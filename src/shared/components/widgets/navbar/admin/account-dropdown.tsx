"use client"

import { useCurrentUser } from "@/entities/auth/hooks/useAuth"
import { useLogout } from "@/entities/auth/hooks/useLogout"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"
import { DropdownSkeleton } from "@/shared/components/skeletons/dropdown"
import { UserIcon } from "lucide-react"
import { Button } from "@/shared/components/ui/button"

export const AdminNavbarAccountDropdown = ({ label = "(Admin)", path = "/admin" }: { path?: string; label?: string }) => {
  const { user, isUserLoading } = useCurrentUser()
  const { logout } = useLogout()

  const router = useRouter()
  const t = useTranslations()

  if (isUserLoading) return <DropdownSkeleton />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='cursor-pointer flex items-center gap-2'>
          <UserIcon size={16} /> {user?.name} {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("My Account")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`${path}/profile`)}>{t("Profile")}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`${path}/profile/update-password`)}>{t("Change Password")}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>{t("Logout")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
