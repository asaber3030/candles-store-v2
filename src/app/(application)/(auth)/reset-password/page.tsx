import AppLogo from "@/shared/components/common/logo"

import { getTranslations } from "next-intl/server"

import { DefaultContainer } from "@/shared/components/common/default-container"
import { Metadata } from "next"
import { ResetPasswordForm } from "@/features/auth/ui/reset-password-form"
import { checkPasswordResetToken } from "@/entities/auth/api/auth.api"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset Password to Sharkia Candles shop."
}

type Props = {
  searchParams: TSearchParams
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const sp = await searchParams
  const t = await getTranslations()

  if (!sp.token || !sp.email) {
    return (
      <DefaultContainer className='py-10'>
        <div className='max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md border border-gray-200'>
          <AppLogo className='mx-auto mb-4 w-32 h-32' />
          <h1 className='text-2xl font-semibold text-center mb-6'>{t("Reset Password")}</h1>
          <p className='text-center text-red-500'>{t("Invalid password reset link.")}</p>
        </div>
      </DefaultContainer>
    )
  }

  const isTokenValid = await checkPasswordResetToken(sp.email!, sp.token!)

  if (!isTokenValid) {
    return (
      <DefaultContainer className='py-10'>
        <div className='max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md border border-gray-200'>
          <AppLogo className='mx-auto mb-4 w-32 h-32' />
          <h1 className='text-2xl font-semibold text-center mb-6'>{t("Reset Password")}</h1>
          <p className='text-center text-red-500'>{t("Invalid or expired password reset link.")}</p>
        </div>
      </DefaultContainer>
    )
  }
  return (
    <DefaultContainer className='py-10'>
      <div className='max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md border border-gray-200'>
        <AppLogo className='mx-auto mb-4 w-32 h-32' />
        <h1 className='text-2xl font-semibold text-center mb-6'>{t("Forget Password")}</h1>
        <ResetPasswordForm />
      </div>
    </DefaultContainer>
  )
}
