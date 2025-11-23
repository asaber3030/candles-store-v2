import AppLogo from "@/shared/components/common/logo"

import { getTranslations } from "next-intl/server"

import { ForgetPasswordForm } from "@/features/auth/ui/forget-password-form"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forget Password",
  description: "Forget Password to Sharkia Candles shop."
}

export default async function ForgetPasswordPage() {
  const t = await getTranslations()

  return (
    <DefaultContainer className='py-10'>
      <div className='max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md border border-gray-200'>
        <AppLogo className='mx-auto mb-4 w-32 h-32' />
        <h1 className='text-2xl font-semibold text-center mb-6'>{t("Forget Password")}</h1>
        <ForgetPasswordForm />
      </div>
    </DefaultContainer>
  )
}
