"use client"
import { motion } from "framer-motion"
import React from "react"

// --- 1. Cupid's Arrow SVG ---
const CupidArrowSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox='0 0 100 100' className='text-rose-200 drop-shadow-[0_0_10px_rgba(253,164,175,0.8)]' style={{ transform: "rotate(45deg)" }}>
    <line x1='10' y1='50' x2='90' y2='50' stroke='currentColor' strokeWidth='4' strokeLinecap='round' />
    {/* Heart Tip */}
    <path d='M90 50 L 75 40 L 75 60 Z' fill='currentColor' />
    {/* Feathers */}
    <path d='M10 50 L 20 40 M 15 50 L 25 40 M 10 50 L 20 60 M 15 50 L 25 60' stroke='currentColor' strokeWidth='3' />
  </svg>
)

// --- 2. Neon Glowing Heart SVG ---
const NeonHeartSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox='0 0 100 100' className='drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]'>
    {/* The tube background (darker) */}
    <path d='M50 85 L 15 50 Q 0 35, 15 20 Q 25 10, 50 30 Q 75 10, 85 20 Q 100 35, 85 50 Z' fill='none' stroke='#be123c' strokeWidth='8' strokeLinecap='round' opacity='0.5' />
    {/* The light center (bright) */}
    <path d='M50 85 L 15 50 Q 0 35, 15 20 Q 25 10, 50 30 Q 75 10, 85 20 Q 100 35, 85 50 Z' fill='none' stroke='#fda4af' strokeWidth='3' strokeLinecap='round' className='animate-pulse' />
  </svg>
)

// --- 3. Hanging Envelope ---
const EnvelopeSVG = ({ size }: { size: number }) => (
  <svg width={size} height={size * 0.8} viewBox='0 0 100 80' className='text-pink-50 drop-shadow-md'>
    <rect x='5' y='10' width='90' height='60' rx='5' fill='#fff1f2' />
    <path d='M5 10 L 50 45 L 95 10' stroke='#e11d48' strokeWidth='2' fill='none' />
    {/* Wax Seal */}
    <circle cx='50' cy='45' r='8' fill='#be123c' />
  </svg>
)

interface HangingProps {
  type?: "heart" | "arrow" | "letter"
  delay?: number
  stringHeight?: string
  size?: number
  className?: string
}

const HangingLoveDeco = ({ type = "heart", delay = 0, stringHeight = "h-32", size = 80, className = "" }: HangingProps) => {
  const renderObject = () => {
    switch (type) {
      case "heart":
        return <NeonHeartSVG size={size} />
      case "arrow":
        return <CupidArrowSVG size={size} />
      case "letter":
        return <EnvelopeSVG size={size} />
    }
  }

  // Physics: Gentle, floaty swing
  const swingVariant = {
    initial: { rotate: 0 },
    animate: { rotate: [2, -2, 2] },
    hover: {
      rotate: [10, -10, 5, -2, 0],
      scale: 1.1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  }

  return (
    <motion.div
      className={`absolute top-0 flex flex-col items-center z-50 origin-top ${className}`}
      initial='initial'
      animate='animate'
      variants={swingVariant}
      transition={{
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        delay: delay
      }}
    >
      {/* --- The String (Silk Ribbon) --- */}
      <div className={`w-[2px] bg-pink-300/50 ${stringHeight}`}></div>

      {/* --- The Ribbon Bow at Connector --- */}
      <div className='-mt-2 mb-[-5px] text-pink-400 relative z-10'>
        <svg width='20' height='14' viewBox='0 0 20 14' fill='currentColor'>
          <path d='M10 7 C5 0 0 5 0 7 C0 9 5 14 10 7 C15 14 20 9 20 7 C20 5 15 0 10 7' />
        </svg>
      </div>

      {/* --- The Object --- */}
      {renderObject()}
    </motion.div>
  )
}

export default HangingLoveDeco
