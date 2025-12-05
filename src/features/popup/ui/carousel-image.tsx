"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

type CarouselImageProps = {
  images: Array<{
    id: number
    image: string
    extension: string
  }>
  isVideo: (ext: string) => boolean
}

export const CarouselImage = ({ images, isVideo }: CarouselImageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) return null

  const currentMedia = images[currentIndex]
  const isCurrentVideo = isVideo(currentMedia.extension)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="w-full space-y-3">
      {/* Main Carousel Display */}
      <div className="relative group overflow-hidden rounded-xl bg-black/50">
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          {isCurrentVideo ? (
            <video src={currentMedia.image} className="w-full h-full object-cover" controls />
          ) : (
            <img
              src={currentMedia.image || "/placeholder.svg"}
              alt={`Gallery item ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}

          {/* Play Icon Overlay for Images */}
          {!isCurrentVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 p-3 rounded-full">
                <Play className="w-6 h-6 text-black fill-black" />
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm border border-white/10">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scroll-smooth">
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 relative rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                index === currentIndex ? "border-white scale-105 shadow-lg" : "border-white/20 opacity-60 hover:opacity-90"
              }`}
              aria-label={`Go to image ${index + 1}`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 relative bg-black">
                {isVideo(img.extension) ? (
                  <>
                    <video src={img.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </>
                ) : (
                  <img src={img.image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
