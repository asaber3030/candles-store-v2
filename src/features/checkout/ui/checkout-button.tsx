"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useCartStore } from "@/features/cart/model/cart.store"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { createCashOrderAction, createOnlineOrderAction } from "@/entities/order/api/order.api"
import { formatCurrency } from "@/shared/lib/numbers"
import { userRoutes } from "@/shared/config/routes"
import { toast } from "react-toastify"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { PaymentMethodTypeEnum } from "@prisma/client"
import { CartItem } from "@/features/cart/model/cart"
import { Button } from "@/shared/components/ui/button"

type Props = {
  selectedAddressId: number | null
  paymentMethod: PaymentMethodTypeEnum
}

type Mut = {
  addressId: number
  data: CartItem[]
}

export const CheckoutButton = ({ selectedAddressId, paymentMethod }: Props) => {
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const t = useTranslations()

  const { items, getTotal, clearCart } = useCartStore()

  const createOnlineOrder = useDefaultMutation({
    mutationFn: ({ addressId, data }: Mut) => createOnlineOrderAction(addressId, data),
    onSuccess: (data: ApiResponse<{ orderId: number; paymentUrl: string }>) => {
      if (data?.data?.orderId && data?.data?.paymentUrl && data.status === 201) {
        setOpen(false)
        clearCart()
        window.location.href = data.data.paymentUrl
      }
    }
  })

  const createCashOrder = useDefaultMutation({
    mutationFn: ({ addressId, data }: Mut) => createCashOrderAction(addressId, data),
    onSuccess: (data: ApiResponse<{ orderId: number }>) => {
      if (data?.data?.orderId && data.status == 201) {
        setOpen(false)
        clearCart()
        router.push(userRoutes.profile.viewOrder(data.data.orderId))
      }
    }
  })

  const checkout = () => {
    if (!selectedAddressId) {
      toast.error(t("Please select a delivery address"))
      return
    }

    if (paymentMethod === PaymentMethodTypeEnum.Card) {
      createOnlineOrder.mutate({ addressId: selectedAddressId, data: items })
    } else if (paymentMethod === PaymentMethodTypeEnum.Cash) {
      createCashOrder.mutate({ addressId: selectedAddressId, data: items })
    } else {
      toast.error(t("Please select a valid payment method"))
    }
  }

  if (items.length === 0) {
    return (
      <Button className='w-full' disabled>
        {t("Checkout")}
      </Button>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='w-full'>{t("Checkout")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Complete your Order")}</DialogTitle>
        </DialogHeader>

        <section>
          <ul className='space-y-2'>
            <li className='flex justify-between'>
              <span>{t("Items")}:</span>
              <span>{items.length}</span>
            </li>
            <li className='flex justify-between'>
              <span>{t("Total Amount")}:</span>
              <span className='text-green-700 font-semibold'>{formatCurrency(getTotal())}</span>
            </li>
          </ul>
        </section>

        <DialogFooter>
          <Button disabled={createOnlineOrder.isPending || createCashOrder.isPending || !selectedAddressId} onClick={checkout} className='w-full'>
            {t("Confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
