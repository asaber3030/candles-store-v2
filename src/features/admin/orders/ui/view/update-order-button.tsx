"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useState } from "react"

import { orderStatusEnumIconObject } from "@/shared/components/common/icons"
import { getOrderStatusLabel } from "@/shared/lib/functions"
import { changeOrderStatus } from "@/entities/order/api/order.api"
import { cn } from "@/shared/lib/cn"

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { OrderStatusList } from "@/shared/config/defaults"
import { OrderStatusEnum } from "@prisma/client"
import { ClassValue } from "class-variance-authority/types"
import { Button } from "@/shared/components/ui/button"

type Props = {
  className?: ClassValue
  status: OrderStatusEnum
  statusNumber: number
  orderId: number
  variant?: string
}

export const UpdateOrderButton = ({ variant = "default", className, status, statusNumber, orderId }: Props) => {
  const t = useTranslations()

  const [open, setOpen] = useState(false)

  const [currentStatus, setStatus] = useState(status)
  const [currentStatusNumber, setStatusNumber] = useState(statusNumber)

  const mutation = useDefaultMutation({
    mutationFn: () => changeOrderStatus(orderId, currentStatus, currentStatusNumber),
    onSuccess: (data) => {
      if (data.status === 200) {
        setOpen(false)
      }
    }
  })

  const handleOrderStatus = (status: OrderStatusEnum, idx: number) => {
    setStatus(status)
    setStatusNumber(idx + 1)
  }

  const handleUpdate = () => {
    mutation.mutate()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className={cn(className)}>
          {t("Change Status")}
        </Button>
      </DialogTrigger>

      <DialogContent className='xl:min-w-[700px] w-[600px]'>
        <DialogHeader>
          <DialogTitle>{t("Change Order Status #", { orderNumber: orderId })}</DialogTitle>
        </DialogHeader>
        <div className='grid grid-cols-2 gap-1 items-center'>
          {OrderStatusList.map((item, idx) => {
            const Icon = orderStatusEnumIconObject[item]
            return (
              <div
                className={cn("cursor-pointer w-full flex flex-col justify-center gap-2 items-center hover:bg-gray-200 p-4 text-sm rounded-md transition-all border", currentStatus === item && "select-none cursor-not-allowed opacity-55 bg-gray-200")}
                key={item}
                onClick={() => handleOrderStatus(item, idx)}
              >
                <Icon className='size-6' />
                {getOrderStatusLabel(item)}
              </div>
            )
          })}
        </div>
        <DialogFooter className='flex gap-1'>
          <Button disabled={status === OrderStatusEnum.Delivered} onClick={handleUpdate}>
            {t("Save")}
          </Button>
          <DialogClose asChild>
            <Button variant='outline'>{t("Cancel")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
