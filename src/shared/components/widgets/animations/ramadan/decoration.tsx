// components/HangingDecoration.tsx
"use client"
import { motion } from "framer-motion"

interface DecorationProps {
  type: "lantern" | "moon" | "star"
  delay?: number
  stringHeight?: string // Tailwind height classes
  size?: string // Tailwind sizing classes
  className?: string // For positioning (left/right)
}

const HangingDecoration = ({ type, delay = 0, stringHeight = "h-24", size = "w-16 h-16", className = "" }: DecorationProps) => {
  // Physics variants
  const swingVariant = {
    initial: { rotate: 0 },
    animate: { rotate: [2, -2, 2] },
    hover: {
      rotate: [15, -10, 5, -2, 0],
      transition: { duration: 2, ease: "easeInOut" }
    }
  }

  return (
    <motion.div
      // absolute positioning handles placement
      // pointer-events-auto ensures we can hover/click THIS item even if the overlay allows passthrough
      className={`absolute top-0 origin-top flex flex-col items-center z-50 ${className}`}
      initial='initial'
      animate='animate'
      /* whileHover='hover' */
      variants={swingVariant}
      transition={{
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        delay: delay
      }}
    >
      {/* String */}
      <div className={`w-[2px] bg-amber-200/60 ${stringHeight}`} />

      {/* Ornament */}
      <div className={`relative ${size} text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]`}>
        {type === "lantern" && (
          <svg viewBox='0 0 24 24' fill='currentColor' className='w-full h-full'>
            <path d='M12 2L14 4H10L12 2Z' />
            <path d='M7 5L5 10H19L17 5H7Z' />
            <path d='M5 10L7 20H17L19 10H5Z' fillOpacity='0.9' />
            <path d='M9 20L10 22H14L15 20H9Z' />
            <circle cx='12' cy='14' r='3' className='text-yellow-100 animate-pulse' fill='currentColor' />
          </svg>
        )}

        {type === "moon" && (
          <div className='w-full h-full relative'>
            <svg viewBox='0 0 24 24' fill='currentColor' className='w-full h-full -rotate-12'>
              <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
            </svg>
            <motion.div className='absolute top-[35%] right-[20%] w-[30%] h-[30%]' animate={{ rotate: [10, -10, 10] }} transition={{ duration: 3, repeat: Infinity }}>
              <svg viewBox='0 0 24 24' fill='white' className='drop-shadow-md'>
                <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
              </svg>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default HangingDecoration
