"use client"

import { useLogout } from "@/entities/auth/hooks/useLogout"
import { useTranslations } from "next-intl"

type Props = {
  children?: React.ReactNode
}

export const LogoutButton = ({ children }: Props) => {
  const t = useTranslations()
  const { logout, isLoggingOut } = useLogout()

  const trigger = children ? children : t("Logout")

  return (
    <button onClick={() => logout()} disabled={isLoggingOut}>
      {trigger}
    </button>
  )
}
