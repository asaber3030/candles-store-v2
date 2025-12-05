import { getPopupData } from "@/entities/popup/api/popup.api"

import { AppNavbar } from "@/shared/components/widgets/navbar/user/navbar"
import { SocialNavbar } from "@/shared/components/widgets/navbar/user/social-navbar"
import { AppFooter } from "@/shared/components/widgets/footer/footer"
import { MobileNavbarContainer } from "@/shared/components/widgets/navbar/user/mobile-navbar"
import { Metadata } from "next"
import { PopupViewer } from "@/features/popup/ui/viewer"
import { PopupTrigger } from "@/features/popup/ui/trigger"

export const metadata: Metadata = {
  title: "Sharkia Candles",
  description: "Welcome to Sharkia Candles - Illuminate Your World with Handcrafted Elegance",
}

export default async function ApplicationLayout({ children }: { children: React.ReactNode }) {
  const popup = await getPopupData()

  return (
    <div className="flex flex-col min-h-screen">
      {popup && popup.isActive && <PopupViewer popup={popup} />}

      <SocialNavbar />
      <MobileNavbarContainer />
      <AppNavbar />
      <PopupTrigger />

      {/* Main content grows to fill available space */}
      <main className="flex-1 xl:pt-0">{children}</main>

      {/* Footer sticks to bottom */}
      <AppFooter />
    </div>
  )
}
