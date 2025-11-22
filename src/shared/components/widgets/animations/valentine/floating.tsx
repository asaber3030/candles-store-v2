"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

// --- Custom Romantic SVGs ---

const HeartIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' className={className}>
    <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
  </svg>
)

// Organic Rose Petal Shape
const PetalIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' className={className}>
    <path d='M12 2C12 2 14 5 16 8C19 12.5 19 17 16 20C13 23 8 23 6 20C4 17 5 12 8 8C10 5 12 2 12 2Z' />
  </svg>
)

const LoveLetterIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' className={className}>
    <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
  </svg>
)

// --- Animation Logic ---

type ItemData = {
  id: number
  Icon: any
  color: string
  delay: number
  duration: number
  xStart: string
  swayAmount: number
  size: number
  animationType: "flutter" | "spin" | "float"
}

const FloatingItem = ({ data }: { data: ItemData }) => {
  const { Icon, color, delay, duration, xStart, swayAmount, size, animationType } = data

  // Different animations for petals vs hearts
  const rotateAnimation =
    animationType === "flutter"
      ? [0, 45, 0, -45, 0] // Z-axis rotation
      : [0, 360] // Full spin

  const rotate3D =
    animationType === "flutter"
      ? [0, 180, 360] // Petals flip over like real leaves
      : 0

  return (
    <motion.div
      className={`absolute ${color} drop-shadow-sm`}
      initial={{ y: -100, x: xStart, opacity: 0 }}
      animate={{
        y: "110vh",
        opacity: [0, 0.8, 1, 0],
        rotate: rotateAnimation,
        rotateX: rotate3D, // 3D flip for petals
        rotateY: rotate3D
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
        x: { duration: duration / 2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
      }}
      style={{ left: xStart }}
    >
      <Icon size={size} />
    </motion.div>
  )
}

export default function FloatingValentineItems() {
  const [items, setItems] = useState<ItemData[]>([])

  useEffect(() => {
    const newItems = Array.from({ length: 35 }, (_, i) => {
      const type = Math.random()
      let Icon, color, animationType: "flutter" | "spin" | "float"

      if (type < 0.5) {
        // 50% Rose Petals (Deep Red/Pink)
        Icon = PetalIcon
        color = Math.random() > 0.5 ? "text-rose-600/90" : "text-pink-500/80"
        animationType = "flutter"
      } else if (type < 0.8) {
        // 30% Hearts (Soft Pink/White)
        Icon = HeartIcon
        color = "text-pink-200/60"
        animationType = "spin"
      } else {
        // 20% Love Letters (White/Gold)
        Icon = LoveLetterIcon
        color = "text-rose-100/70"
        animationType = "float"
      }

      return {
        id: i,
        Icon,
        color,
        size: Math.random() * 15 + 15, // 15px to 30px
        delay: Math.random() * 15,
        duration: 12 + Math.random() * 10,
        xStart: `${Math.random() * 100}%`,
        swayAmount: 30 + Math.random() * 50,
        animationType
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
