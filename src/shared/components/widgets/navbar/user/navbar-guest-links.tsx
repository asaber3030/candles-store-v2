"use client"

import { useTranslations } from "next-intl"
import { userRoutes } from "@/shared/config/routes"

import { LogIn, UserPlus } from "lucide-react"
import { Fragment } from "react"
import { LinkBtn } from "@/shared/components/common/link-button"

export const NavbarGuestLinks = () => {
  const t = useTranslations()

  return (
    <Fragment>
      <LinkBtn className='px-6 py-2 h-10 rounded-md text-sm' href={userRoutes.login} icon={LogIn}>
        {t("Login")}
      </LinkBtn>
      <LinkBtn className='px-6 py-2 h-10 rounded-md text-sm' variant='outline' href={userRoutes.register} icon={UserPlus}>
        {t("Register")}
      </LinkBtn>
    </Fragment>
  )
}
