"use client"

import { useCartTotalByServer } from "@/features/cart/hooks/useCartTotal"
import { useTranslations } from "next-intl"
import { useCartStore } from "@/features/cart/model/cart.store"
import { useState } from "react"

import { formatCurrency } from "@/shared/lib/numbers"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { FullAddress } from "@/entities/user/model/user"
import { Label } from "@/shared/components/ui/label"
import { CreateUserAddressModal } from "@/features/address/ui/create-modal"
import { PaymentMethodTypeEnum } from "@prisma/client"
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group"
import { Button } from "@/shared/components/ui/button"
import { Separator } from "@/shared/components/ui/separator"
import { CheckoutButton } from "./checkout-button"

type Props = {
  addresses: FullAddress[]
  defaultAddress: FullAddress | null
}

export const CheckoutHandler = ({ addresses, defaultAddress }: Props) => {
  const t = useTranslations()

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(defaultAddress ? defaultAddress.id : null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodTypeEnum>("Cash")

  const { items, getTotal } = useCartStore()

  return (
    <div className='space-y-4'>
      <div className='bg-white p-4 rounded-md shadow-md'>
        <p className='border-b text-xl font-semibold mb-4'>{t("Order Summary")}</p>
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
      </div>

      {addresses.length === 0 ? (
        <div className='space-y-2 bg-white p-4 rounded-md shadow-md'>
          <p>{t("No shipping addresses found. Please add an address to proceed with checkout.")}</p>
          <CreateUserAddressModal />
        </div>
      ) : (
        <div className='space-y-2 bg-white p-4 rounded-md shadow-md'>
          <p className='border-b text-xl font-semibold mb-4'>{t("Shipping Address")}</p>
          <div className='space-y-2'>
            <Label>{t("Shipping Address")}</Label>
            <Select onValueChange={(value) => setSelectedAddressId(Number(value))} defaultValue={selectedAddressId ? String(selectedAddressId) : undefined}>
              <SelectTrigger>
                <SelectValue placeholder={t("Address")} />
              </SelectTrigger>
              <SelectContent>
                {addresses.map((address) => (
                  <SelectItem key={address.id} value={String(address.id)}>
                    {address.streetName}, {address.city.name}, {address.country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className='space-y-2 bg-white p-4 rounded-md shadow-md'>
        <p className='border-b text-xl font-semibold mb-4'>{t("Payment Method")}</p>
        <RadioGroup defaultValue={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethodTypeEnum)} className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='Card' id='Card' />
            <Label htmlFor='Card'>{t("Card")}</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='Cash' id='Cash' />
            <Label htmlFor='Cash'>{t("Cash on Delivery")}</Label>
          </div>
        </RadioGroup>

        <Separator className='my-4' />

        <CheckoutButton selectedAddressId={selectedAddressId} paymentMethod={paymentMethod} />
      </div>
    </div>
  )
}
