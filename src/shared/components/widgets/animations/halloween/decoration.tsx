"use client"
import { motion } from "framer-motion"
import React from "react"

// --- Spooky Object SVGs (Inline for simplicity) ---
const JackOLanternSVG = ({ size = 100, uniqueId }: { size?: number; uniqueId: string }) => (
  <svg width={size} height={size} viewBox='0 0 100 100' className='drop-shadow-[0_0_15px_rgba(251,146,60,0.6)]'>
    <defs>
      <radialGradient id={`${uniqueId}-glow`} cx='50%' cy='60%' r='50%'>
        <stop offset='0%' stopColor='#fef08a' />
        <stop offset='70%' stopColor='#f97316' />
        <stop offset='100%' stopColor='#9a3412' />
      </radialGradient>
      <linearGradient id={`${uniqueId}-skin`} x1='0%' y1='0%' x2='0%' y2='100%'>
        <stop offset='0%' stopColor='#ea580c' />
        <stop offset='100%' stopColor='#c2410c' />
      </linearGradient>
    </defs>
    <path d='M45 5 Q 50 0, 55 5 L 52 15 Q 50 18, 48 15 Z' fill='#65a30d' stroke='#365314' strokeWidth='1' />
    <ellipse cx='50' cy='60' rx='48' ry='40' fill={`url(#${uniqueId}-skin)`} stroke='#7c2d12' strokeWidth='2' />
    <path d='M50 20 Q 50 60 50 100' stroke='#9a3412' strokeWidth='1' fill='none' opacity='0.5' />
    <path d='M30 25 Q 35 60 30 95' stroke='#9a3412' strokeWidth='1' fill='none' opacity='0.5' />
    <path d='M70 25 Q 65 60 70 95' stroke='#9a3412' strokeWidth='1' fill='none' opacity='0.5' />
    <g fill={`url(#${uniqueId}-glow)`}>
      <path d='M25 45 L 35 35 L 45 45 Z' />
      <path d='M55 45 L 65 35 L 75 45 Z' />
      <path d='M25 70 Q 50 85, 75 70 L 70 65 L 60 75 L 50 65 L 40 75 L 30 65 Z' />
    </g>
  </svg>
)

const SpiderSVG = ({ size = 60, uniqueId }: { size?: number; uniqueId: string }) => (
  <svg width={size} height={size} viewBox='0 0 100 100' className='drop-shadow-lg'>
    <g stroke='#171717' strokeWidth='3' fill='none' strokeLinecap='round'>
      <path d='M45 50 Q 20 30, 10 50' />
      <path d='M45 55 Q 20 45, 5 65' />
      <path d='M48 60 Q 25 70, 15 85' />
      <path d='M50 65 Q 35 80, 30 95' />
      <path d='M55 50 Q 80 30, 90 50' />
      <path d='M55 55 Q 80 45, 95 65' />
      <path d='M52 60 Q 75 70, 85 85' />
      <path d='M50 65 Q 65 80, 70 95' />
    </g>
    <circle cx='50' cy='60' r='15' fill='#262626' />
    <circle cx='50' cy='45' r='8' fill='#262626' />
    <path d='M46 55 L 54 55 L 50 62 Z M46 68 L 54 68 L 50 62 Z' fill='#dc2626' />
  </svg>
)

const GhostSVG = ({ size = 70, uniqueId }: { size?: number; uniqueId: string }) => (
  <svg width={size} height={size} viewBox='0 0 100 100' className='drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]'>
    <defs>
      <linearGradient id={`${uniqueId}-ghost`} x1='0%' y1='0%' x2='0%' y2='100%'>
        <stop offset='0%' stopColor='#ffffff' stopOpacity='0.9' />
        <stop offset='100%' stopColor='#e2e8f0' stopOpacity='0.4' />
      </linearGradient>
    </defs>
    <path d='M50 5 C 30 5, 15 25, 15 50 C 15 75, 5 95, 20 95 Q 35 85, 50 95 Q 65 85, 80 95 C 95 95, 85 75, 85 50 C 85 25, 70 5, 50 5 Z' fill={`url(#${uniqueId}-ghost)`} />
    <circle cx='40' cy='35' r='5' fill='#1e293b' />
    <circle cx='60' cy='35' r='5' fill='#1e293b' />
    <ellipse cx='50' cy='50' rx='6' ry='8' fill='#1e293b' />
  </svg>
)
// --- Main Hanging Component Logic ---

export type SpookyDecorationType = "pumpkin" | "spider" | "ghost"

interface HangingProps {
  type?: SpookyDecorationType
  delay?: number
  stringHeight?: string // Tailwind height class, e.g., "h-32"
  size?: number // Size in pixels
  className?: string // For positioning
}

const HangingHalloweenDecoration = ({ type = "pumpkin", delay = 0, stringHeight = "h-32", size = 80, className = "" }: HangingProps) => {
  const uniqueId = `deco-${type}-${Math.random().toString(36).substr(2, 9)}`

  const duration = type === "pumpkin" ? 6 : 4 // Pumpkins are heavier, swing slower

  const swingVariant = {
    initial: { rotate: 0 },
    animate: { rotate: [3, -3, 3] }, // Gentle sway
    hover: {
      rotate: [15, -15, 10, -10, 0], // More dramatic swing on hover
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  }

  const renderObject = () => {
    switch (type) {
      case "pumpkin":
        return <JackOLanternSVG size={size} uniqueId={uniqueId} />
      case "spider":
        return <SpiderSVG size={size} uniqueId={uniqueId} />
      case "ghost":
        return <GhostSVG size={size} uniqueId={uniqueId} />
    }
  }

  return (
    <motion.div
      className={`absolute top-0 flex flex-col items-center z-50 origin-top ${className}`}
      initial='initial'
      animate='animate'
      variants={swingVariant}
      transition={{
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay: delay
      }}
    >
      {/* --- 1. The Anchor (Spiderweb cluster) --- */}
      <div className='absolute -top-4 -left-4 z-10 text-slate-300/50'>
        <svg width='40' height='40' viewBox='0 0 40 40' fill='none' stroke='currentColor' strokeWidth='1'>
          <path d='M0 0 L 40 40 M 40 0 L 0 40 M 20 0 L 20 40 M 0 20 L 40 20' />
          <circle cx='20' cy='20' r='5' strokeOpacity='0.5' />
          <circle cx='20' cy='20' r='10' strokeOpacity='0.5' />
          <circle cx='20' cy='20' r='15' strokeOpacity='0.5' />
        </svg>
      </div>

      {/* --- 2. The String (Spider silk) --- */}
      <div className={`relative w-px bg-slate-400/60 ${stringHeight}`}>{/* Optional: A tiny spider crawling down the string on hover could go here */}</div>

      {/* --- 3. The Spooky Object --- */}
      {/* Negative margin to connect to string. Spiders hang lower for visual effect. */}
      <div className={type === "spider" ? "-mt-4" : "-mt-1"}>{renderObject()}</div>
    </motion.div>
  )
}

export default HangingHalloweenDecoration
