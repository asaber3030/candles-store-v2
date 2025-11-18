"use client"

import { Product } from "@prisma/client"
import { useFavouritesStore } from "../model/favourite.store"
import { Button } from "@/shared/components/ui/button"
import { useTranslations } from "next-intl"
import { Heart, HeartCrack, ShoppingCart, X } from "lucide-react"
import { FavouriteItem } from "../model/favourite"

type Props = {
  product: Product
}

export const AddToFavouriteButton = ({ product }: Props) => {
  const t = useTranslations()

  const { isFavourite, addFavourite, removeFavourite } = useFavouritesStore()

  const isAdded = isFavourite(product.id)
  const newItem: FavouriteItem = {
    id: product.id,
    name: product.name,
    image: product.picture
  }

  if (isAdded) return <Button size='icon' icon={HeartCrack} variant='outlineDestructive' onClick={() => removeFavourite(product.id)} />

  return <Button size='icon' icon={Heart} variant='destructive' onClick={() => addFavourite(newItem)} />
}
