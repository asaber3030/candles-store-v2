import { AppNavbar } from "@/shared/components/widgets/navbar/user/navbar";
import { SocialNavbar } from "@/shared/components/widgets/navbar/user/social-navbar";
import { AppFooter } from "@/shared/components/widgets/footer/footer";
import { MobileNavbarContainer } from "@/shared/components/widgets/navbar/user/mobile-navbar";
import { Metadata } from "next";
import { getAppSettings } from "@/entities/settings/api/settings.api";
import { AnimationEnum } from "@prisma/client";

import { getPopupData } from "@/entities/popup/api/popup.api";

import ChristmasOverlay from "@/shared/components/widgets/animations/chrismats/overlay";
import RamadanOverlay from "@/shared/components/widgets/animations/ramadan/overlay";
import HalloweenOverlay from "@/shared/components/widgets/animations/halloween/overlay";
import ValentineOverlay from "@/shared/components/widgets/animations/valentine/overlay";
import { PopupViewer } from "@/features/popup/ui/viewer";

export const metadata: Metadata = {
  title: "Sharkia Candles",
  description: "Welcome to Sharkia Candles - Illuminate Your World with Handcrafted Elegance",
};

export default async function ApplicationLayout({ children }: { children: React.ReactNode }) {
  const popup = await getPopupData();

  return (
    <div className="flex flex-col min-h-screen">
      {popup && popup.isActive && <PopupViewer popup={popup} />}

      <SocialNavbar />
      <MobileNavbarContainer />
      <AppNavbar />

      {/* Main content grows to fill available space */}
      <main className="flex-1 xl:pt-0">{children}</main>

      {/* Footer sticks to bottom */}
      <AppFooter />
    </div>
  );
}
