// components/RamadanOverlay.tsx
import React from "react"
import HangingDecoration from "./decoration"
import FloatingRamadanItems from "./floating-items"

const RamadanOverlay = () => {
  return (
    // fixed: Stays in place when scrolling
    // pointer-events-none: Lets you click links/buttons BEHIND the empty spaces
    <div className='fixed top-0 left-0 w-full h-0 z-50 pointer-events-none'>
      {/* --- LEFT SIDE --- */}

      <FloatingRamadanItems />

      {/* 1. Large Moon (Left) */}
      <HangingDecoration type='moon' className='left-[5%] md:left-[10%]' size='w-20 h-20 md:w-28 md:h-28' stringHeight='h-32 md:h-48' delay={0} />

      {/* 2. Small Lantern (Left) */}
      <HangingDecoration type='lantern' className='left-[20%] hidden md:flex' size='w-12 h-16' stringHeight='h-20' delay={1.5} />

      {/* --- CENTER AREA (Usually kept clear for Logo, but added high up) --- */}

      {/* 3. Tiny Star Lantern (Center-ish) */}
      <HangingDecoration type='lantern' className='left-[35%] hidden lg:flex' size='w-10 h-14' stringHeight='h-14' delay={0.5} />

      {/* --- RIGHT SIDE --- */}

      {/* 4. Medium Lantern (Right) */}
      <HangingDecoration type='lantern' className='right-[25%] hidden md:flex' size='w-16 h-20' stringHeight='h-28' delay={2} />

      {/* 5. Big Lantern (Right) */}
      <HangingDecoration
        type='lantern'
        className='right-[5%] md:right-[10%]'
        size='w-24 h-32'
        stringHeight='h-40 md:h-64' // Very long string
        delay={1}
      />
    </div>
  )
}

export default RamadanOverlay
