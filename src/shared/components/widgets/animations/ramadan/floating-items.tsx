"use client"

import { motion } from "framer-motion"
import { Moon, Star } from "lucide-react"
import { useEffect, useState } from "react"

// --- 1. Custom Ramadan Icons (SVGs) ---

// A traditional Ramadan Lantern (Fanous)
const FanousIcon = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' className={className} xmlns='http://www.w3.org/2000/svg'>
    <path d='M12 2C12.55 2 13 2.45 13 3V4H11V3C11 2.45 11.45 2 12 2Z' /> {/* Handle */}
    <path d='M8 5L6 9H18L16 5H8Z' /> {/* Top Lid */}
    <path d='M6 9L7 18H17L18 9H6Z' fillOpacity='0.7' /> {/* Glass Body */}
    <path d='M8 18L9 21H15L16 18H8Z' /> {/* Base */}
    <circle cx='12' cy='13.5' r='2' fill='#FFF' fillOpacity='0.8' className='animate-pulse' /> {/* Flame */}
  </svg>
)

// The Islamic Eight-Pointed Star (Rub el Hizb)
const IslamicStarIcon = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' className={className}>
    {/* Two overlapping squares */}
    <path d='M12 2L14.5 4.5L19.5 4.5L19.5 9.5L22 12L19.5 14.5L19.5 19.5L14.5 19.5L12 22L9.5 19.5L4.5 19.5L4.5 14.5L2 12L4.5 9.5L4.5 4.5L9.5 4.5L12 2Z' />
    <circle cx='12' cy='12' r='3' fill='#FFF' fillOpacity='0.3' />
  </svg>
)

// --- 2. Animation Logic ---

type ItemData = {
  id: number
  Icon: any
  color: string
  delay: number
  duration: number
  xStart: string
  swayAmount: number
  size: number
}

const FloatingItem = ({ data }: { data: ItemData }) => {
  const { Icon, color, delay, duration, xStart, swayAmount, size } = data

  return (
    <motion.div
      className={`absolute ${color} drop-shadow-[0_0_8px_rgba(253,224,71,0.5)]`} // Add Glow
      initial={{ y: -100, x: xStart, opacity: 0, rotate: 0 }}
      animate={{
        y: "110vh",
        opacity: [0, 1, 1, 0],
        rotate: [0, 15, -15, 0] // Gentle rocking
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",

        rotate: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror"
        }
      }}
      style={{ left: xStart }}
    >
      <Icon size={size} />
    </motion.div>
  )
}

// --- 3. Main Component ---

export default function FloatingRamadanItems() {
  const [items, setItems] = useState<ItemData[]>([])

  useEffect(() => {
    const newItems = Array.from({ length: 25 }, (_, i) => {
      // Pick a random shape
      const shapes = [Moon, Star, FanousIcon, IslamicStarIcon, FanousIcon]
      const ShapeIcon = shapes[Math.floor(Math.random() * shapes.length)]

      // Pick a random size (some small distant ones, some larger closer ones)
      const size = Math.floor(Math.random() * 20) + 15 // 15px to 35px

      // Pick a Ramadan Color Palette
      const colors = [
        "text-amber-400", // Gold
        "text-amber-200", // Pale Gold
        "text-yellow-500", // Deep Gold
        "text-slate-300/80" // Silver/White
      ]
      const color = colors[Math.floor(Math.random() * colors.length)]

      return {
        id: i,
        Icon: ShapeIcon,
        color,
        size,
        delay: Math.random() * 20, // Random start times
        duration: 15 + Math.random() * 15, // Slow fall (15-30 seconds)
        xStart: `${Math.random() * 100}%`,
        swayAmount: 30 + Math.random() * 50 // 30px to 80px sway
      }
    })
    setItems(newItems)
  }, [])

  return (
    <div className='fixed inset-0 pointer-events-none overflow-hidden z-0'>
      {items.map((item) => (
        <FloatingItem key={item.id} data={item} />
      ))}
    </div>
  )
}
