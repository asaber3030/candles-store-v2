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
  deliveryFees: number
  paymentMethod: PaymentMethodTypeEnum
  appliedCoupon: { name: string; discount: number } | null | undefined
}

type Mut = {
  addressId: number
  data: CartItem[]
  couponCode?: string
}

export const CheckoutButton = ({ selectedAddressId, deliveryFees, paymentMethod, appliedCoupon }: Props) => {
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const t = useTranslations()
  const { items, getTotal, clearCart } = useCartStore()

  const couponCode = appliedCoupon?.name || "" // Extract final coupon code

  const subtotal = getTotal()
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0
  const finalTotal = subtotal - discountAmount + deliveryFees

  const createOnlineOrder = useDefaultMutation({
    mutationFn: ({ addressId, data, couponCode }: Mut) => createOnlineOrderAction(addressId, data, couponCode),
    onSuccess: (data: ApiResponse<{ orderId: number; paymentUrl: string }>) => {
      if (data?.data?.orderId && data?.data?.paymentUrl && data.status === 201) {
        setOpen(false)
        clearCart()
        window.location.href = data.data.paymentUrl
      }
    }
  })

  const createCashOrder = useDefaultMutation({
    mutationFn: ({ addressId, data, couponCode }: Mut) => createCashOrderAction(addressId, data, couponCode),
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
      createOnlineOrder.mutate({
        addressId: selectedAddressId,
        data: items,
        couponCode
      })
    } else if (paymentMethod === PaymentMethodTypeEnum.Cash) {
      createCashOrder.mutate({
        addressId: selectedAddressId,
        data: items,
        couponCode
      })
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
              <span>{t("Sub Total")}:</span>
              <span className='text-green-700 font-semibold'>{formatCurrency(subtotal)}</span>
            </li>

            {appliedCoupon && (
              <li className='flex justify-between'>
                <span>
                  {t("Coupon Discount")} ({appliedCoupon.name} - {appliedCoupon.discount}%):
                </span>
                <span className='text-green-700 font-semibold'>- {formatCurrency(discountAmount)}</span>
              </li>
            )}

            <li className='flex justify-between'>
              <span>{t("Delivery Fees")}:</span>
              <span className='text-green-700 font-semibold'>{formatCurrency(deliveryFees)}</span>
            </li>

            <li className='flex justify-between border-t pt-2'>
              <span className='font-semibold'>{t("Total Amount")}:</span>
              <span className='text-green-700 font-bold'>{formatCurrency(finalTotal)}</span>
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
