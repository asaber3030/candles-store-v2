"use client"

import { useEffect, useRef } from "react"

export function SuccessAnimation() {
  const circleRef = useRef<SVGCircleElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (pathRef.current) {
      pathRef.current.classList.add("animate-checkmark")
    }
    if (circleRef.current) {
      circleRef.current.classList.add("animate-pulse-ring")
    }
  }, [])

  return (
    <div className='flex justify-center'>
      <div className='relative w-32 h-32 bg-[#fff] rounded-full p-3'>
        <svg className='w-full h-full' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
          {/* Outer pulse ring */}
          <circle
            ref={circleRef}
            cx='50'
            cy='50'
            r='45'
            stroke='#22c55e33' // green with opacity
            strokeWidth='2'
          />

          {/* Background circle */}
          <circle cx='50' cy='50' r='40' fill='#22c55e22' />

          {/* Main circle border */}
          <circle cx='50' cy='50' r='40' stroke='#22c55e' strokeWidth='3' fill='none' />

          {/* Checkmark */}
          <path
            ref={pathRef}
            d='M 30 50 L 42 62 L 70 35'
            stroke='#14532d' // dark green
            strokeWidth='4'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
            strokeDasharray='66'
            strokeDashoffset='66'
          />
        </svg>
      </div>
    </div>
  )
}
