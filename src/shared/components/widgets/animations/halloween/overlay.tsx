import React from "react"
import HangingSpookyDeco from "./decoration"
import FloatingHalloweenItems from "./floating"

const HalloweenOverlay = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-0 z-50 pointer-events-none'>
      <FloatingHalloweenItems />

      {/* Left: Big glowing Pumpkin */}
      <HangingSpookyDeco type='pumpkin' className='left-[5%] md:left-[10%]' size={100} stringHeight='h-40' delay={0} />

      {/* Left-Center: Dangling Spider */}
      <HangingSpookyDeco type='spider' className='left-[25%] hidden md:flex' size={60} stringHeight='h-24' delay={1.5} />

      {/* Right-Center: Floating Ghost */}
      <HangingSpookyDeco type='ghost' className='right-[30%] hidden lg:flex' size={70} stringHeight='h-32' delay={0.8} />

      {/* Right: Another Pumpkin */}
      <HangingSpookyDeco type='pumpkin' className='right-[5%]' size={90} stringHeight='h-56' delay={2.2} />
    </div>
  )
}

export default HalloweenOverlay
