import AppLogo from "@/shared/components/common/logo"

import { getTranslations } from "next-intl/server"

import { DefaultContainer } from "@/shared/components/common/default-container"
import { LoginForm } from "@/features/auth/ui/login-form"
import { Metadata } from "next"
import Link from "next/link"
import { userRoutes } from "@/shared/config/routes"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to Sharkia Candles shop."
}

export default async function LoginPage() {
  const t = await getTranslations()

  return (
    <DefaultContainer className='py-10'>
      <div className='max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md border border-gray-200'>
        <AppLogo className='mx-auto mb-4 w-32 h-32' />
        <h1 className='text-2xl font-semibold text-center mb-6'>{t("Welcome Back")}</h1>
        <LoginForm type='user' redirectUrl='/' />
        <Link href={userRoutes.register} className='block text-center mt-4 text-primary hover:underline'>
          {t("Don't have an account? Register")}
        </Link>
      </div>
    </DefaultContainer>
  )
}
