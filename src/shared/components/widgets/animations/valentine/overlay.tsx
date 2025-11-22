import React from "react"
import HangingLoveDeco from "./decoration"
import FloatingValentineItems from "./floating"

const ValentineOverlay = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-0 z-50 pointer-events-none'>
      <FloatingValentineItems />
      {/* Left: Big Neon Heart */}
      <HangingLoveDeco type='heart' className='left-[10%]' size={90} stringHeight='h-48' delay={0} />

      {/* Left Center: Love Letter */}
      <HangingLoveDeco type='letter' className='left-[25%] hidden md:flex' size={60} stringHeight='h-24' delay={1.2} />

      {/* Right Center: Cupid Arrow */}
      <HangingLoveDeco type='arrow' className='right-[20%] hidden lg:flex' size={70} stringHeight='h-36' delay={0.5} />

      {/* Right: Small Heart */}
      <HangingLoveDeco type='heart' className='right-[5%]' size={60} stringHeight='h-20' delay={2} />
    </div>
  )
}

export default ValentineOverlay
