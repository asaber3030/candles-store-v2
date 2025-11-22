import { useTranslations } from "next-intl"
import { useCartStore } from "@/features/cart/model/cart.store"
import { useState } from "react"

import { formatCurrency } from "@/shared/lib/numbers"
import { cn } from "@/shared/lib/cn"

import { ProductColor, ProductSize } from "@prisma/client"
import { AddToFavouriteButton } from "@/features/favourites/ui/add-to-favourite"
import { ProductWithCategory } from "@/entities/product/model/product"
import { AddToCartButton } from "@/features/cart/ui/add-to-cart"
import { Badge } from "@/shared/components/ui/badge"

type Props = {
  sizes: ProductSize[]
  colors: ProductColor[]
  details: ProductWithCategory
}

export const ViewProductRightSide = ({ details, colors, sizes }: Props) => {
  const t = useTranslations()

  const { getItem } = useCartStore()

  const addedItem = getItem(details.id)

  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(addedItem?.size)
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(addedItem?.color)

  const unit = (selectedSize ? selectedSize.price : details.price) || 0
  const quantity = addedItem ? addedItem.quantity : 1
  const finalPrice = unit * quantity

  const afterCleanup = () => {
    setSelectedSize(undefined)
    setSelectedColor(undefined)
  }

  return (
    <div className='flex flex-col gap-4 p-4'>
      {/* Product Name */}
      <h1 className='text-2xl font-bold'>{details.name}</h1>
      <Badge>{details.category.name}</Badge>

      {/* Product Description */}
      {details.description && <p className='text-gray-600'>{details.description}</p>}

      {/* Price */}
      <div className='text-xl font-semibold mt-2'>
        <span className='text-green-700'>{formatCurrency(finalPrice)}</span>
      </div>

      {/* Colors */}
      {colors.length > 0 && (
        <div>
          <h3 className='font-medium mb-1'>{t("Colors")}:</h3>
          <div className='flex gap-2'>
            {colors.map((color) => (
              <div
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={cn("w-6 h-6 rounded-full border border-gray-300", selectedColor?.id === color.id ? "ring-2 ring-blue-500" : "cursor-pointer hover:ring-2 hover:ring-gray-400")}
                style={{ backgroundColor: color.color }}
                title={color.color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {sizes.length > 0 && (
        <div>
          <h3 className='font-medium mb-1'>{t("Colors")}:</h3>
          <div className='flex gap-2 flex-wrap'>
            {sizes.map((size) => (
              <span key={size.id} onClick={() => setSelectedSize(size)} className={cn("px-3 py-1 border border-gray-300 rounded cursor-pointer", selectedSize?.id === size.id ? "bg-blue-500 text-white" : "hover:bg-gray-200")} title={`Size: ${size.label}`}>
                {size.label} <b>({formatCurrency(size.price || 0)})</b>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className='flex flex-wrap gap-2 mt-4'>
        <AddToCartButton executeFunction={afterCleanup} product={details} color={selectedColor} size={selectedSize} />
        <AddToFavouriteButton product={details} />
      </div>
    </div>
  )
}
