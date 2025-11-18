"use client"

import { PartOrderItems } from "./view-order-items"
import { PartOrderUser } from "./order-user"
import { PartOrderAddress } from "./order-address"
import { PartOrderSummary } from "./order-summary"
import { FullOrder, FullOrderItem } from "../../model/orders"
import { OrderDeliveredStatus } from "./delivered-card"
import { AdminOrderTracker } from "./order-tracker"

type Props = {
  order: FullOrder
}

export const ViewOrderDetails = ({ order }: Props) => {
  return (
    <div className='w-full mt-4'>
      <div className='flex flex-col'>
        <main className='flex flex-1 flex-col gap-4'>
          <div className='flex flex-col md:grid md:grid-cols-6 gap-2'>
            <div className='md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-2'>
              <PartOrderItems items={order.items} />
              <div className='print:hidden mt-10'>
                <AdminOrderTracker currentStatus={order.status} />
              </div>
            </div>

            <div className='md:col-span-2 lg:col-span-3 xl:col-span-2 flex flex-col gap-2'>
              {/* User */}
              <PartOrderUser user={order.user} />

              {/* Shipping Address */}
              <PartOrderAddress address={order.address as any} />

              {/* Order Summary */}
              <PartOrderSummary order={order} />

              {order.status === "Delivered" && <OrderDeliveredStatus order={order} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
