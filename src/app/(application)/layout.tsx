import { AppNavbar } from "@/shared/components/widgets/navbar/user/navbar"
import { SocialNavbar } from "@/shared/components/widgets/navbar/user/social-navbar"
import { AppFooter } from "@/shared/components/widgets/footer/footer"
import { MobileNavbarContainer } from "@/shared/components/widgets/navbar/user/mobile-navbar"
import { Metadata } from "next"
import { getAppSettings } from "@/entities/settings/api/settings.api"
import { AnimationEnum } from "@prisma/client"

import ChristmasOverlay from "@/shared/components/widgets/animations/chrismats/overlay"
import RamadanOverlay from "@/shared/components/widgets/animations/ramadan/overlay"
import HalloweenOverlay from "@/shared/components/widgets/animations/halloween/overlay"
import ValentineOverlay from "@/shared/components/widgets/animations/valentine/overlay"

export const metadata: Metadata = {
  title: "Sharkia Candles",
  description: "Welcome to Sharkia Candles - Illuminate Your World with Handcrafted Elegance"
}

export default async function ApplicationLayout({ children }: { children: React.ReactNode }) {
  const settings = await getAppSettings()

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Top navbars */}
      {settings?.defaultAnimation == AnimationEnum.Ramadan && <RamadanOverlay />}
      {settings?.defaultAnimation == AnimationEnum.Christmas && <ChristmasOverlay />}
      {settings?.defaultAnimation == AnimationEnum.Halloween && <HalloweenOverlay />}
      {settings?.defaultAnimation == AnimationEnum.Valentine && <ValentineOverlay />}

      <SocialNavbar />
      <MobileNavbarContainer />
      <AppNavbar />

      {/* Main content grows to fill available space */}
      <main className='flex-1 xl:pt-0 pt-[85px]'>{children}</main>

      {/* Footer sticks to bottom */}
      <AppFooter />
    </div>
  )
}
