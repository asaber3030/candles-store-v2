import { useEffect, useMemo, useRef, useState } from "react";
import { ProductPicture } from "@prisma/client";

type Props = {
  pictures: ProductPicture[];
  mainPicture: string;
};

export const ViewProductLeftSide = ({ mainPicture, pictures }: Props) => {
  const [selectedImage, setSelectedImage] = useState(mainPicture);
  const [showZoom, setShowZoom] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const lensSize = 140;
  const zoomScale = 2.7;

  // FOLLOWING POPUP SIZE
  const popupWidth = 350;
  const popupHeight = 350;
  const popupOffset = 25; // distance away from cursor

  useEffect(() => {
    setSelectedImage(mainPicture);
  }, [mainPicture]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // inside image
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
    setContainerSize({ w: rect.width, h: rect.height });
  };

  // Lens constraints
  const lensPos = useMemo(() => {
    const half = lensSize / 2;
    return {
      x: Math.max(half, Math.min(mousePos.x, containerSize.w - half)),
      y: Math.max(half, Math.min(mousePos.y, containerSize.h - half)),
    };
  }, [mousePos, containerSize]);

  // Zoom background position
  const bgPosition = useMemo(() => {
    if (!containerSize.w || !containerSize.h) return "50% 50%";
    return `${(lensPos.x / containerSize.w) * 100}% ${(lensPos.y / containerSize.h) * 100}%`;
  }, [lensPos, containerSize]);

  // Popup floating position
  const popupPos = useMemo(() => {
    if (!containerRef.current) return { left: 0, top: 0 };

    const rect = containerRef.current.getBoundingClientRect();

    // popup should follow cursor OUTSIDE the image
    const left = rect.left + lensPos.x + popupOffset;
    const top = rect.top + lensPos.y - popupHeight / 2;

    return { left, top };
  }, [lensPos]);

  return (
    <div className="flex flex-col gap-4">
      {/* MAIN IMAGE */}
      <section className="relative w-full">
        <div ref={containerRef} className="relative w-full bg-gray-100 rounded-xl overflow-hidden cursor-crosshair" onMouseEnter={() => setShowZoom(true)} onMouseLeave={() => setShowZoom(false)} onMouseMove={handleMouseMove}>
          <img src={selectedImage} className="w-full h-full object-cover select-none" draggable={false} />

          {/* LENS */}
          {showZoom && (
            <div
              className="hidden lg:block absolute pointer-events-none border border-white/80 bg-white/20 backdrop-blur-sm rounded-md"
              style={{
                width: lensSize,
                height: lensSize,
                left: lensPos.x - lensSize / 2,
                top: lensPos.y - lensSize / 2,
              }}
            />
          )}
        </div>

        {/* FLOATING POPUP */}
        {showZoom && (
          <div
            className="
              hidden lg:block fixed z-50 
              border border-gray-300 shadow-xl rounded-xl bg-white
              overflow-hidden
            "
            style={{
              width: popupWidth,
              height: popupHeight,
              left: popupPos.left,
              top: popupPos.top,
              backgroundImage: `url(${selectedImage})`,
              backgroundSize: `${zoomScale * 100}%`,
              backgroundPosition: bgPosition,
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </section>

      {/* THUMBNAILS */}
      <div className="flex gap-3 overflow-x-auto justify-center py-2">
        {pictures.map((pic) => {
          const active = selectedImage === pic.picture;
          return (
            <button
              key={pic.id}
              onClick={() => setSelectedImage(pic.picture)}
              className={`w-20 h-20 rounded-lg overflow-hidden border transition 
                ${active ? "border-black shadow-md" : "border-gray-300"}
              `}
            >
              <img src={pic.picture} className="w-full h-full object-cover" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
