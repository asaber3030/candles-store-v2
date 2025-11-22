import { UpdateUserInformationForm } from "@/features/auth/ui/update-information-form"
import { AdminProfileContainer } from "@/features/admin/profile/container"
import { DefaultContainer } from "@/shared/components/common/default-container"

import { Metadata } from "next"

import { getCurrentUser } from "@/entities/auth/api/auth.api"
import { getTranslations } from "next-intl/server"
import { userRoutes } from "@/shared/config/routes"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Delivery Company | Profile",
  description: "This is the profile page."
}

export default async function ProfilePage() {
  const t = await getTranslations()
  const user = await getCurrentUser()

  if (!user) redirect(userRoutes.login)

  return (
    <DefaultContainer className='py-8'>
      <AdminProfileContainer>
        <h1 className='text-2xl font-bold mb-4'>{t("Profile")}</h1>
        <UpdateUserInformationForm user={user} />
      </AdminProfileContainer>
    </DefaultContainer>
  )
}
