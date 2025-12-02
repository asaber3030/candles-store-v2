import { AnimationEnum } from "@prisma/client";

import { getAppSettings } from "@/entities/settings/api/settings.api";

import ChristmasOverlay from "@/shared/components/widgets/animations/chrismats/overlay";
import HalloweenOverlay from "@/shared/components/widgets/animations/halloween/overlay";
import RamadanOverlay from "@/shared/components/widgets/animations/ramadan/overlay";
import ValentineOverlay from "@/shared/components/widgets/animations/valentine/overlay";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const settings = await getAppSettings();
  return (
    <>
      {settings?.defaultAnimation == AnimationEnum.Ramadan && <RamadanOverlay />}
      {settings?.defaultAnimation == AnimationEnum.Christmas && <ChristmasOverlay />}
      {settings?.defaultAnimation == AnimationEnum.Halloween && <HalloweenOverlay />}
      {settings?.defaultAnimation == AnimationEnum.Valentine && <ValentineOverlay />}
      {children}
    </>
  );
}
