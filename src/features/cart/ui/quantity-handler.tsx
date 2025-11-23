"use client"

import { Button } from "@/shared/components/ui/button"
import { useCartStore } from "../model/cart.store"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/shared/lib/cn"
import { ClassValue } from "class-variance-authority/types"
import { useLocale } from "next-intl"

type Props = {
  itemId: number
  className?: ClassValue
  executeFunction?: () => void
}

export const ProductQuantityHandler = ({ itemId, className, executeFunction }: Props) => {
  const { decreaseQuantity, increaseQuantity, getItem } = useCartStore()
  const item = getItem(itemId)
  const locale = useLocale()

  if (!item) return null

  const handleRemove = () => {
    decreaseQuantity(itemId)
    if (executeFunction) {
      executeFunction()
    }
  }
  return (
    <div className={cn("flex items-center justify-end", className)}>
      <Button size='icon' variant='outline' className={cn(locale == "ar" ? "rounded-l-none border-l-0" : "rounded-r-none border-r-0")} onClick={handleRemove}>
        <Minus className='w-4 h-4' />
      </Button>

      <p className='h-8 flex items-center justify-center px-2 border-y border border-border bg-background font-bold text-xs'>x{item.quantity}</p>

      <Button size='icon' variant='outline' className={cn(locale == "ar" ? "rounded-r-none border-r-0" : "rounded-l-none border-l-0")} onClick={() => increaseQuantity(itemId)}>
        <Plus className='w-4 h-4' />
      </Button>
    </div>
  )
}
