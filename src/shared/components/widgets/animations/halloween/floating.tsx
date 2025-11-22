"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const GhostIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' className={className}>
    <path d='M12 2C8.13 2 5 5.13 5 9v3H3v2h2v2c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-2h2v-2h-2V9c0-3.87-3.13-7-7-7zm-4 9H6V9c0-2.21 1.79-4 4-4h4c2.21 0 4 1.79 4 4v2h-2v-2c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2zm4 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-4 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z' />
  </svg>
)

const BatIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' className={className}>
    <path d='M12 1.5l-2.5 5.5H5.5L8 12l-2.5 5.5h4.5L12 22l2.5-5.5h4.5L16 12l2.5-5.5h-4L12 1.5z' />
  </svg>
)

const CandyCornIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' className={className}>
    <path d='M12 2L4 22h16L12 2z' fill='#FFF' />
    <path d='M12 2L4 22h16L12 2z' fill='url(#candyCornGradient)' />
    <defs>
      <linearGradient id='candyCornGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
        <stop offset='0%' stopColor='#fef08a' /> {/* Yellow top */}
        <stop offset='50%' stopColor='#fb923c' /> {/* Orange middle */}
        <stop offset='100%' stopColor='#ef4444' /> {/* Red bottom */}
      </linearGradient>
    </defs>
  </svg>
)

type ItemData = {
  id: number
  Icon: any
  color: string
  delay: number
  duration: number
  xStart: string
  swayAmount: number
  size: number
  rotationSpeed: number
}

const FloatingItem = ({ data }: { data: ItemData }) => {
  const { Icon, color, delay, duration, xStart, swayAmount, size, rotationSpeed } = data

  return (
    <motion.div
      className={`absolute ${color} drop-shadow-sm`}
      initial={{ y: -100, x: xStart, opacity: 0, rotate: 0 }}
      animate={{
        y: "110vh",
        opacity: [0, 0.8, 0.8, 0],
        rotate: [0, rotationSpeed, -rotationSpeed, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
        x: {
          duration: duration / 2,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror"
        },
        rotate: {
          duration: duration / 3,
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

export default function FloatingHalloweenItems() {
  const [items, setItems] = useState<ItemData[]>([])

  useEffect(() => {
    const newItems = Array.from({ length: 30 }, (_, i) => {
      const type = Math.random()
      let IconComponent, color, rotationSpeed

      if (type < 0.4) {
        IconComponent = GhostIcon
        color = "text-slate-300/60"
        rotationSpeed = 360 // Ghost spin
      } else if (type < 0.7) {
        IconComponent = BatIcon
        color = "text-purple-950/80"
        rotationSpeed = 20 // Bat flutter
      } else {
        IconComponent = CandyCornIcon
        color = "fill-transparent" // Handled by SVG gradient for candy corn
        rotationSpeed = 360 // Candy corn tumbles
      }

      return {
        id: i,
        Icon: IconComponent,
        color,
        size: Math.random() * 20 + 20, // 20px to 40px
        delay: Math.random() * 15,
        duration: 15 + Math.random() * 10, // Fall over 15-25 seconds
        xStart: `${Math.random() * 100}%`,
        swayAmount: 20 + Math.random() * 40,
        rotationSpeed: rotationSpeed
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
