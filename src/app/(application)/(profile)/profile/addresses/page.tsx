import { getCurrentUser } from "@/entities/auth/api/auth.api"
import { countCurrentUserAddresses } from "@/entities/user/api/user.api"
import { CreateUserAddressModal } from "@/features/address/ui/create-modal"
import { ListUserAddresses } from "@/features/address/ui/list-address"
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
  const addressesLength = await countCurrentUserAddresses()

  if (!user) redirect(userRoutes.login)

  return (
    <DefaultContainer className='py-8'>
      <ProfileContainer>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold mb-4'>{t("User Addresses")}</h1>
          {addressesLength < 5 && <CreateUserAddressModal />}
        </div>
        <ListUserAddresses />
      </ProfileContainer>
    </DefaultContainer>
  )
}
