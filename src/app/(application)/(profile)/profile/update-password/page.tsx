import { getCurrentUser } from "@/entities/auth/api/auth.api"
import { UpdateUserInformationForm } from "@/features/auth/ui/update-information-form"
import { UpdateUserPasswordForm } from "@/features/auth/ui/update-password-form"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { ProfileContainer } from "@/shared/components/widgets/profile/container"
import { userRoutes } from "@/shared/config/routes"
import { Metadata } from "next"

import { getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Profile Page",
  description: "This is the profile page."
}

export default async function ProfilePage() {
  const t = await getTranslations()
  const user = await getCurrentUser()

  if (!user) redirect(userRoutes.login)

  return (
    <DefaultContainer className='py-8'>
      <ProfileContainer>
        <h1 className='text-2xl font-bold mb-4'>{t("Profile")}</h1>
        <UpdateUserPasswordForm />
      </ProfileContainer>
    </DefaultContainer>
  )
}
