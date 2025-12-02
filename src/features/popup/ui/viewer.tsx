"use client";

import { FullPopup } from "@/entities/popup/model/popup";
import { usePopupStore } from "@/shared/store/popup.store";
import { Dialog, DialogContent, DialogHeader } from "@/shared/components/ui/dialog";
import { isVideoExtension } from "@/shared/lib/functions";
import { useLocale } from "next-intl";
import { LinkBtn } from "@/shared/components/common/link-button";
import Link from "next/link";

type Props = {
  popup: FullPopup;
};

export const PopupViewer = ({ popup }: Props) => {
  const { isOpen, trigger, closePopup } = usePopupStore();
  const isVideo = isVideoExtension(popup.extension);
  const locale = useLocale();

  return (
    <Dialog open={isOpen} onOpenChange={trigger}>
      <DialogContent className="p-0 overflow-hidden border-0 bg-transparent max-w-5xl w-full">
        <DialogHeader className="sr-only" />

        {/* Wrapper with scrolling enabled */}
        <div className="relative max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          {/* Media Section */}
          <div className="relative w-full">
            {isVideo ? <video src={popup.image ?? ""} controls className="w-full max-h-[50vh] object-cover" /> : <img src={popup.image ?? ""} alt={popup.title ?? "popup-image"} className="w-full max-h-[50vh] object-cover" />}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Content Section */}
          <div className="relative text-center text-white p-8 bg-gradient-to-b from-gray-900 to-black">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{locale === "ar" ? popup.titleAr : popup.title}</h2>

            <div className="prose prose-invert max-w-none mb-6 text-gray-300">
              <div
                dangerouslySetInnerHTML={{
                  __html: locale === "ar" ? popup.contentAr : popup.content,
                }}
              />
            </div>

            <LinkBtn href={popup.link ?? "#"} rel="noreferrer" className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" onClick={() => closePopup()}>
              {locale === "ar" ? "اذهب إلى الرابط" : "Go to Link"}
            </LinkBtn>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
