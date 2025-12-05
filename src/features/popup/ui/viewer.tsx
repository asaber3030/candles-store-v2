"use client"

import type { FullPopup } from "@/entities/popup/model/popup"
import { usePopupStore } from "@/shared/store/popup.store"
import { Dialog, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
import { isVideoExtension } from "@/shared/lib/functions"
import { useLocale } from "next-intl"
import { LinkBtn } from "@/shared/components/common/link-button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

type Props = {
  popup: FullPopup
}

export const PopupViewer = ({ popup }: Props) => {
  const { isOpen, trigger, closePopup } = usePopupStore()
  const locale = useLocale()

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // All media items: main image/video first, then gallery images
  const allMedia = [
    {
      id: 0,
      image: popup.image,
      extension: popup.extension,
      isMain: true,
    },
    ...(popup.images || []),
  ]

  const currentMedia = allMedia[currentImageIndex]
  const isVideo = isVideoExtension(currentMedia.extension)

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={trigger}>
      <DialogHeader className="sr-only" />

      <DialogContent className="p-0 overflow-hidden border-0 bg-transparent max-w-4xl md:max-w-6xl lg:max-w-7xl w-full max-h-[95vh] md:max-h-screen">
        <div className="relative w-full h-screen md:h-[90vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-black group">
          {/* Media Container - Full Width & Height */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {isVideo ? (
              <video src={currentMedia.image ?? ""} className="w-full h-full object-cover" autoPlay loop muted />
            ) : (
              <img src={currentMedia.image ?? ""} alt={popup.title ?? "popup"} className="w-full h-full object-cover" />
            )}

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
          </div>

          {/* Close Button */}
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label="Close popup"
          >
            <X className="w-5 h-5 hover:scale-110 transition-transform" />
          </button>

          <div className="absolute xl:bottom-16 bottom-36 left-0 right-0 z-40 pt-8 md:pt-12 px-6 md:px-8">
            <div className="max-w-3xl">
              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 text-balance leading-tight drop-shadow-lg">{locale === "ar" ? popup.titleAr : popup.title}</h2>

              {/* Content Preview */}
              <p className="text-gray-100 text-base md:text-lg leading-relaxed mb-6 drop-shadow-md line-clamp-3 max-w-2xl">
                <div
                  dangerouslySetInnerHTML={{
                    __html: locale === "ar" ? popup.contentAr : popup.content,
                  }}
                />
              </p>

              {/* CTA Button */}
              <LinkBtn
                href={popup.link ?? "#"}
                rel="noreferrer"
                className="inline-flex px-6 py-3 bg-white hover:bg-gray-100 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-base md:text-lg"
                onClick={() => closePopup()}
              >
                {locale === "ar" ? "اكتشف المزيد" : "Explore More"}
              </LinkBtn>
            </div>
          </div>

          {allMedia.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                aria-label="Previous media"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                aria-label="Next media"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {allMedia.length > 1 && (
            <div className="absolute xl:bottom-2 bottom-24 right-6 z-30 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
              {currentImageIndex + 1} / {allMedia.length}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
