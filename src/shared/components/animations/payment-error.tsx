"use client"

import { useEffect, useRef } from "react"

export function FailedAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add("animate-shshake")
      setTimeout(() => {
        containerRef.current?.classList.remove("animate-shake")
      }, 500)
    }
  }, [])

  return (
    <div ref={containerRef} className='flex justify-center'>
      <div className='relative w-32 h-32 bg-[#fff] rounded-full p-3'>
        <svg className='w-full h-full' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
          {/* Outer circle */}
          <circle
            cx='50'
            cy='50'
            r='45'
            stroke='#ef444433' // red with opacity
            strokeWidth='2'
          />

          {/* Background circle */}
          <circle cx='50' cy='50' r='40' fill='#ef444422' />

          {/* Main circle border */}
          <circle cx='50' cy='50' r='40' stroke='#ef4444' strokeWidth='3' fill='none' />

          {/* X mark - first line */}
          <line
            x1='32'
            y1='32'
            x2='68'
            y2='68'
            stroke='#7f1d1d' // dark red
            strokeWidth='4'
            strokeLinecap='round'
          />

          {/* X mark - second line */}
          <line x1='68' y1='32' x2='32' y2='68' stroke='#7f1d1d' strokeWidth='4' strokeLinecap='round' />
        </svg>
      </div>
    </div>
  )
}
