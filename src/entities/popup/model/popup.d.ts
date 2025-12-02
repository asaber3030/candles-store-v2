import { Popup, PopupImage } from "@prisma/client";

export type FullPopup = Popup & {
  images: PopupImage[];
};
