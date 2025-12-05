"use client"
import { motion } from "framer-motion"

type OrnamentType = "classic" | "onion" | "teardrop"
type ColorScheme = "red" | "gold" | "emerald" | "blue"

interface OrnamentProps {
  type?: OrnamentType
  color?: ColorScheme
  size?: number // Pixel size
  className?: string
  delay?: number
}

const ChristmasOrnament = ({ type = "classic", color = "red", size = 80, className = "", delay = 0 }: OrnamentProps) => {
  // 1. Define Color Gradients
  const getGradientColors = (c: ColorScheme) => {
    switch (c) {
      case "red":
        return { main: "#dc2626", dark: "#7f1d1d", light: "#fca5a5" }
      case "gold":
        return { main: "#d97706", dark: "#78350f", light: "#fcd34d" }
      case "emerald":
        return { main: "#059669", dark: "#064e3b", light: "#6ee7b7" }
      case "blue":
        return { main: "#2563eb", dark: "#1e3a8a", light: "#93c5fd" }
    }
  }
  const palette = getGradientColors(color)
  const uniqueId = `grad-${type}-${color}-${Math.random().toString(36).substr(2, 9)}`

  // 2. Define Shapes (SVG Paths)
  const shapes = {
    classic: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
    onion: "M12 2c-4 2-7 5-7 10 0 6 3 10 7 11 4-1 7-5 7-11 0-5-3-8-7-10z",
    teardrop: "M12 1C9 6 5 10 5 15c0 4.5 3 8 7 8s7-3.5 7-8c0-5-4-9-7-14z",
  }

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size + 20 }}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -20, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.8, delay },
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.8, // Start floating after appearance
        },
      }}
    >
      <svg viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
        <defs>
          {/* 3D Radial Gradient for the Body */}
          <radialGradient id={`${uniqueId}-body`} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor={palette.light} />
            <stop offset="40%" stopColor={palette.main} />
            <stop offset="100%" stopColor={palette.dark} />
          </radialGradient>

          {/* Metallic Gradient for the Cap */}
          <linearGradient id={`${uniqueId}-gold`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="50%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
        </defs>

        {/* The Ornament Body */}
        <path d={shapes[type]} fill={`url(#${uniqueId}-body)`} transform="translate(0, 3)" />

        {/* Shiny Reflection (The "Glossy" look) */}
        <ellipse cx="9" cy="10" rx="3" ry="2" fill="white" fillOpacity="0.4" transform={type === "classic" ? "translate(0, 3)" : "translate(0, 5)"} />

        {/* Decorative Pattern (Subtle Gold Lines) */}
        <path d="M5 14c2 2 5 3 7 3s5-1 7-3" stroke="#fbbf24" strokeWidth="0.5" strokeOpacity="0.6" fill="none" transform="translate(0, 3)" />

        {/* The Metal Cap (Top) */}
        <rect x="9.5" y="1" width="5" height="3" rx="0.5" fill={`url(#${uniqueId}-gold)`} stroke="#78350f" strokeWidth="0.2" />
        {/* The Ring loop */}
        <path d="M10.5 1C10.5 0.4 11 0 12 0s1.5 0.4 1.5 1" stroke="#fcd34d" strokeWidth="1" fill="none" />
      </svg>
    </motion.div>
  )
}

export default ChristmasOrnament
