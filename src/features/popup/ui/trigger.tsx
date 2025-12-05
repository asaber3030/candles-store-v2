"use client"

import { Button } from "@/shared/components/ui/button"
import { usePopupStore } from "@/shared/store/popup.store"
import { GiftIcon } from "lucide-react"

export const PopupTrigger = () => {
  const { isOpen, resetState, showPopup } = usePopupStore()

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.5); }
        }
        @keyframes shine {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .glow-button {
          animation: glow-pulse 2s ease-in-out infinite, float 3s ease-in-out infinite;
        }
        .shine-effect {
          animation: shine 3s linear infinite;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          background-size: 1000px 100%;
        }
      `}</style>

      <Button
        icon={GiftIcon}
        className="glow-button size-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden font-bold text-lg border-2 border-blue-400/50"
        onClick={showPopup}
      >
        <span className="shine-effect absolute inset-0" />
        <GiftIcon className="relative z-10 size-6" />
      </Button>

      <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" />
    </div>
  )
}
