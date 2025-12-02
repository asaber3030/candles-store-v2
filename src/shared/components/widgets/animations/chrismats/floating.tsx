// components/FloatingChristmasItems.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// --- Custom Christmas SVGs ---

const SnowflakeIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12h20M12 2v20M20 20l-8-8 8-8M4 4l8 8-8 8" />
  </svg>
);

const CandyCaneIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14.5 2C11 2 9 4.5 9 7V22H5V7C5 2.5 8.5 -1.5 14.5 0.5C17.5 1.5 18.5 4.5 18 7H14C14 5.5 14.5 2 14.5 2Z" />
    <path d="M6 10H10" stroke="white" strokeWidth="2" />
    <path d="M6 14H10" stroke="white" strokeWidth="2" />
    <path d="M6 18H10" stroke="white" strokeWidth="2" />
  </svg>
);

const TreeIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L4 12h5l-4 8h14l-4-8h5L12 2z" />
  </svg>
);

// --- Animation Logic ---

type ItemData = {
  id: number;
  Icon: any;
  color: string;
  delay: number;
  duration: number;
  xStart: string;
  swayAmount: number;
  size: number;
  rotationType: "spin" | "sway";
};

const FloatingItem = ({ data }: { data: ItemData }) => {
  const { Icon, color, delay, duration, xStart, swayAmount, size, rotationType } = data;

  return (
    <motion.div
      className={`absolute ${color} drop-shadow-sm`}
      initial={{ y: -100, x: xStart, opacity: 0 }}
      animate={{
        y: "110vh",
        opacity: [0, 1, 1, 0],
        rotate: rotationType === "spin" ? [0, 360] : [0, 45, -45, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
        x: { duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
      }}
      style={{ left: xStart }}
    >
      <Icon size={size} />
    </motion.div>
  );
};

export default function FloatingChristmasItems() {
  const [items, setItems] = useState<ItemData[]>([]);

  useEffect(() => {
    const newItems = Array.from({ length: 40 }, (_, i) => {
      const type = Math.random();
      let Icon, color, rotationType: "spin" | "sway";

      if (type < 0.6) {
        // 60% Snowflakes (White/Blue)
        Icon = SnowflakeIcon;
        color = Math.random() > 0.5 ? "text-white/60" : "text-blue-200/50";
        rotationType = "spin";
      } else if (type < 0.8) {
        // 20% Candy Canes (Red/White)
        Icon = CandyCaneIcon;
        color = "text-red-500";
        rotationType = "sway";
      } else {
        // 20% Trees (Green)
        Icon = TreeIcon;
        color = "text-emerald-500";
        rotationType = "sway";
      }

      return {
        id: i,
        Icon,
        color,
        size: Math.random() * 20 + 10, // 10px to 30px
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 15, // Snow falls slower
        xStart: `${Math.random() * 100}%`,
        swayAmount: 20 + Math.random() * 30,
        rotationType,
      };
    });
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-50]">
      {items.map((item) => (
        <FloatingItem key={item.id} data={item} />
      ))}
    </div>
  );
}
