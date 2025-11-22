import React from "react"
import FloatingChristmasItems from "./floating"
import HangingDecoration from "./decoration"

const ChristmasOverlay = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-0 z-50 pointer-events-none'>
      <FloatingChristmasItems />

      {/* Left: Big Red Teardrop */}
      <HangingDecoration type='teardrop' color='red' className='left-[5%] md:left-[8%]' size={100} stringHeight='h-48' delay={0} />

      {/* Left-Center: Small Gold Onion */}
      <HangingDecoration type='onion' color='gold' className='left-[20%] hidden md:flex' size={70} stringHeight='h-24' delay={1.2} />

      {/* Right-Center: Classic Blue Ball */}
      <HangingDecoration type='classic' color='blue' className='right-[25%] hidden lg:flex' size={80} stringHeight='h-32' delay={0.5} />

      {/* Right: Giant Emerald Classic */}
      <HangingDecoration type='classic' color='emerald' className='right-[5%]' size={110} stringHeight='h-56' delay={2} />
    </div>
  )
}

export default ChristmasOverlay
