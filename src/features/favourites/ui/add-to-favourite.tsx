"use client"

import { Product } from "@prisma/client"
import { useFavouritesStore } from "../model/favourite.store"
import { Button } from "@/shared/components/ui/button"
import { useTranslations } from "next-intl"
import { Heart, HeartCrack, ShoppingCart, X } from "lucide-react"
import { FavouriteItem } from "../model/favourite"
import { ClassValue } from "class-variance-authority/types"
import { cn } from "@/shared/lib/cn"

type Props = {
  product: Product
  className?: ClassValue
}

export const AddToFavouriteButton = ({ product, className }: Props) => {
  const t = useTranslations()

  const { isFavourite, addFavourite, removeFavourite } = useFavouritesStore()

  const isAdded = isFavourite(product.id)
  const newItem: FavouriteItem = {
    id: product.id,
    slug: product.slug,
    price: product.price,
    name: product.name,
    image: product.picture
  }

  if (isAdded) return <Button size='icon' className={cn(className)} icon={HeartCrack} variant='outlineDestructive' onClick={() => removeFavourite(product.id)} />

  return <Button size='icon' icon={Heart} className={cn(className)} variant='destructive' onClick={() => addFavourite(newItem)} />
}
