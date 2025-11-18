import { AppNavbar } from "@/shared/components/widgets/user/navbar/navbar"
import { SocialNavbar } from "@/shared/components/widgets/user/navbar/social-navbar"
import { AppFooter } from "@/shared/components/widgets/user/footer/footer"
import { MobileNavbarContainer } from "@/shared/components/widgets/user/navbar/mobile-navbar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sharkia Candles",
  description: "Welcome to Sharkia Candles - Illuminate Your World with Handcrafted Elegance"
}

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Top navbars */}
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
