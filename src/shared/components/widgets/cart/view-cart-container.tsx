"use client"

import { ViewCartRightSide } from "./view-right-side"
import { CartItemsTable } from "./cart-items-table"

export const ViewCartContainer = () => {
  return (
    <div className='flex flex-col lg:flex-row gap-6 p-4'>
      {/* Left: Cart Table */}
      <CartItemsTable />

      {/* Right: Order Summary */}
      <ViewCartRightSide />
    </div>
  )
}
