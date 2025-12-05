"use client"

import Link from "next/link"

import { formatCurrency } from "@/shared/lib/numbers"
import { userRoutes } from "@/shared/config/routes"

import { ProductWithCategory } from "@/entities/product/model/product"
import { AddToFavouriteButton } from "@/features/favourites/ui/add-to-favourite"
import { AddToCartButton } from "@/features/cart/ui/add-to-cart"
import { Fullscreen } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"

type Props = {
  product: ProductWithCategory
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="xl:bg-white xl:rounded-md xl:overflow-hidden xl:shadow-md xl:hover:shadow-lg xl:transition-shadow xl:duration-300">
      <div className="h-90 relative group overflow-hidden block">
        <Link href={userRoutes.products.viewBySlug(product.slug)}>
          <img className="object-cover rounded-md xl:rounded-none w-full h-full transition-transform duration-300 group-hover:scale-105" src={product.picture} />
        </Link>

        <div className="absolute flex gap-2 top-2 right-2 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <AddToFavouriteButton product={product} />
        </div>
      </div>

      <section className="py-2 xl:p-4 xl:rounded-md xl:space-y-2">
        <div>
          <Link href={userRoutes.products.viewBySlug(product.slug)} className="max-w-full truncate text-ellipsis hover:underline hover:text-blue-600">
            {product.name}
          </Link>
          <p className="text-green-700 font-semibold">{formatCurrency(product.price || 0)}</p>
        </div>
        <Badge variant="outline" className='my-2'>{product.category.name}</Badge>
        <AddToCartButton product={product} />
      </section>
    </div>
  )
}
