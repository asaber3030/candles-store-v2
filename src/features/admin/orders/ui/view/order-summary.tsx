"use client"

import { useTranslations } from "next-intl"

import { formatCurrency } from "@/shared/lib/numbers"
import { formatDate } from "@/shared/lib/date"

import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import { FullOrder } from "../../model/orders"

type Props = {
  order: FullOrder
}

export const PartOrderSummary = ({ order }: Props) => {
  const t = useTranslations()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Order Summary")}</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='flex items-center justify-between'>
          <div>{t("Delivery")}</div>
          <div className='text-green-700'>{formatCurrency(order.deliveryValue)}</div>
        </div>

        <div className='flex items-center justify-between'>
          <div>{t("Discount")}</div>
          <div className='text-green-700'>{formatCurrency(order.discountValue)}</div>
        </div>

        <div className='flex items-center justify-between'>
          <div>{t("Payment Method")}</div>
          <div>{order.paymentMethod}</div>
        </div>

        <div className='flex items-center justify-between'>
          <div>{t("Ordered At")}</div>
          <div>{formatDate(order.orderedAt)}</div>
        </div>

        <Separator className='print:hidden' />

        {order.coupon && (
          <>
            <div className='flex items-center font-medium justify-between'>
              <div>{t("Coupon")}</div>
              <div className='text-green-700'>
                {order.coupon.name} / {order.coupon.discount}%
              </div>
            </div>
            <Separator className='print:hidden' />
          </>
        )}

        <div className='flex items-center font-medium justify-between'>
          <div>{t("Sub Total")}</div>
          <div className='text-green-700'>{formatCurrency(order.subTotal)}</div>
        </div>

        <div className='flex items-center font-medium justify-between'>
          <div>{t("Total")}</div>
          <div className='text-green-700'>{formatCurrency(order.total)}</div>
        </div>
      </CardContent>
    </Card>
  )
}
