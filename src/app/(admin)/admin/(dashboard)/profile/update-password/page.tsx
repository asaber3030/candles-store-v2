import { getCurrentUser } from "@/entities/auth/api/auth.api"
import { AdminProfileContainer } from "@/features/admin/profile/container"
import { UpdateUserPasswordForm } from "@/features/auth/ui/update-password-form"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { Metadata } from "next"

import { getTranslations } from "next-intl/server"
import { userRoutes } from "@/shared/config/routes"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Delivery Company | Update Password"
}

export default async function ProfilePage() {
  const t = await getTranslations()
  const user = await getCurrentUser()

  if (!user) redirect(userRoutes.login)

  return (
    <DefaultContainer className='py-8'>
      <AdminProfileContainer>
        <h1 className='text-2xl font-bold mb-4'>{t("Profile")}</h1>
        <UpdateUserPasswordForm />
      </AdminProfileContainer>
    </DefaultContainer>
  )
}
