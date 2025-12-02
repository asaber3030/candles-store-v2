"use client";
import { motion } from "framer-motion";
import ChristmasOrnament from "./ornament";

interface HangingProps {
  type?: "classic" | "onion" | "teardrop";
  color?: "red" | "gold" | "emerald" | "blue";
  delay?: number;
  stringHeight?: string; // Tailwind height class
  size?: number; // Size in px
  className?: string;
}

const HangingDecoration = ({ type = "classic", color = "red", delay = 0, stringHeight = "h-32", size = 80, className = "" }: HangingProps) => {
  // Physics: Heavier objects swing slower
  const swingVariant = {
    initial: { rotate: 0 },
    animate: { rotate: [2, -2, 2] },
    hover: {
      rotate: [10, -10, 5, -2, 0],
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className={`absolute top-0 flex flex-col items-center z-[-50] origin-top ${className}`}
      initial="initial"
      animate="animate"
      variants={swingVariant}
      transition={{
        duration: 6, // Heavy feel
        ease: "easeInOut",
        repeat: Infinity,
        delay: delay,
      }}
    >
      {/* --- 1. The Bow (Top anchor) --- */}
      <div className="absolute -top-2 z-[-50] drop-shadow-md text-red-600">
        <svg width="40" height="30" viewBox="0 0 40 30" fill="currentColor">
          <path d="M20 15C15 10 10 20 5 15C0 10 5 0 15 5L20 10L25 5C35 0 40 10 35 15C30 20 25 10 20 15Z" />
          <path d="M15 15L10 28L18 20" stroke="currentColor" strokeWidth="4" fill="none" /> {/* Left Ribbon Tail */}
          <path d="M25 15L30 28L22 20" stroke="currentColor" strokeWidth="4" fill="none" /> {/* Right Ribbon Tail */}
          <circle cx="20" cy="12" r="3" fill="#b91c1c" /> {/* Knot */}
        </svg>
      </div>

      {/* --- 2. The String (Ribbon) --- */}
      {/* We use a 1px gold line inside a 3px red line for detail */}
      <div className={`relative w-[3px] bg-red-700 ${stringHeight}`}>
        <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-yellow-500/50" />
      </div>

      {/* --- 3. The 3D Ornament --- */}
      {/* Negative margin pulls it up to connect to string perfectly */}
      <div className="-mt-1">
        <ChristmasOrnament type={type} color={color} size={size} />
      </div>
    </motion.div>
  );
};

export default HangingDecoration;
