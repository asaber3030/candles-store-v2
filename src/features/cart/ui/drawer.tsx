"use client"

import { useCartStore } from "../model/cart.store"
import { useMemo } from "react"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet"
import { ShoppingCart } from "lucide-react"
import { LinkBtn } from "@/shared/components/common/link-button"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { ProductQuantityHandler } from "./quantity-handler"
import { formatCurrency } from "@/shared/lib/numbers"
import { useTranslations } from "next-intl"
import { userRoutes } from "@/shared/config/routes"

export const CartDrawer = () => {
  const t = useTranslations()

  const { items, clearCart } = useCartStore()

  const totalQuantity = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items])
  const totalPrice = useMemo(() => items.reduce((acc, item) => acc + item.totalPrice, 0), [items])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='relative h-10 w-10' icon={ShoppingCart} size='icon'>
          {totalQuantity > 0 && (
            <Badge variant='info' className='absolute -top-2 -right-1 rounded-full p-0 w-5 h-5 text-xs flex items-center justify-center'>
              {totalQuantity}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side='right' className='w-[400px] p-4'>
        <SheetHeader>
          <SheetTitle className='text-xl font-bold'>{t("Your Cart")}</SheetTitle>
          {items.length === 0 ? <SheetDescription>{t("Your cart is empty")}</SheetDescription> : <SheetDescription>Review your selected products.</SheetDescription>}
        </SheetHeader>

        <div className='flex flex-col gap-4 mt-4'>
          {items.length > 0 &&
            items.map((item) => (
              <div key={item.id} className='flex gap-6 items-center pb-2'>
                <div>
                  <img src={item.image} alt={item.name} className='size-20 object-cover rounded' />
                </div>
                <div>
                  <p className='font-medium'>{item.name}</p>
                  {item.size && <p className='text-sm text-gray-500'>Size: {item.size.label}</p>}
                  {item.color && <p className='text-sm text-gray-500'>Color: {item.color.color}</p>}
                  <p className='text-sm text-gray-700 mb-4'>
                    {item.quantity} × {item.unitPrice} = <span className='text-green-700'>{formatCurrency(item.totalPrice)}</span>
                  </p>
                  <ProductQuantityHandler itemId={item.id} className='justify-start' />
                </div>
              </div>
            ))}

          {items.length > 0 && (
            <div className='mt-4 border-t pt-4 flex flex-col gap-2'>
              <p className='font-semibold text-lg'>
                Total: <span className='text-green-700 font-bold'>{formatCurrency(totalPrice)}</span>
              </p>
              <div className='grid grid-cols-2 gap-2'>
                <LinkBtn href={userRoutes.cart} variant='success' className='w-full'>
                  {t("Checkout")}
                </LinkBtn>

                <Button variant='destructive' onClick={clearCart} className='w-full'>
                  {t("Clear Cart")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
