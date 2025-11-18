"use client"

import { useTranslations } from "next-intl"
import { useCartStore } from "../model/cart.store"

import { Product, ProductColor, ProductSize } from "@prisma/client"
import { ProductQuantityHandler } from "./quantity-handler"
import { ShoppingCart, X } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { CartItem } from "../model/cart"

type Props = {
  product: Product
  size?: ProductSize
  color?: ProductColor
  defaultMode?: boolean
  executeFunction?: () => void
}

export const AddToCartButton = ({ defaultMode = true, product, size, color, executeFunction }: Props) => {
  const t = useTranslations()

  const { isItemAdded, addItem, removeItem } = useCartStore()

  const isAdded = isItemAdded(product.id)
  const newItem: CartItem = {
    id: product.id,
    image: product.picture,
    name: product.name,
    quantity: 1,
    size,
    color,
    unitPrice: product.price ? product.price : 0,
    totalPrice: product.price ? product.price : 0
  }

  const handleRemove = () => {
    removeItem(product.id)
    if (executeFunction) {
      executeFunction()
    }
  }

  if (isAdded) {
    if (defaultMode) return <ProductQuantityHandler itemId={product.id} executeFunction={executeFunction} />
    return (
      <Button className='w-full' variant='destructive' icon={X} onClick={handleRemove}>
        {t("Remove from Cart")}
      </Button>
    )
  }

  return (
    <Button className='w-full' icon={ShoppingCart} onClick={() => addItem(newItem)}>
      {t("Add To Cart")}
    </Button>
  )
}
