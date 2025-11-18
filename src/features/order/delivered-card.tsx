import { formatDate } from "@/shared/lib/date"
import { getOrderStatusLabel } from "@/shared/lib/functions"
import { Order } from "@prisma/client"
import { Check } from "lucide-react"

type Props = {
  order: Order
}
export const OrderDeliveredStatus = ({ order }: Props) => {
  return (
    <div className='bg-white border shadow-sm rounded-md p-4 flex gap-2 items-center justify-between print:hidden'>
      <div className='flex gap-2 items-center font-medium'>
        <div className='p-2 rounded-md bg-gray-200'>
          <Check className='size-4' />
        </div>
        {getOrderStatusLabel(order.status)}
      </div>
      {order.deliveredAt && (
        <p>
          Delivered at: <b>{formatDate(order.deliveredAt)}</b>
        </p>
      )}
    </div>
  )
}
