"use client"

import { useFavouritesStore } from "../model/favourite.store"
import { cn } from "@/shared/lib/cn"

import { HeartCrack } from "lucide-react"
import { ClassValue } from "class-variance-authority/types"
import { Button } from "@/shared/components/ui/button"

type Props = {
  itemId: number
  className?: ClassValue
}

export const RemoveFromFavouriteButton = ({ itemId, className }: Props) => {
  const { isFavourite, removeFavourite } = useFavouritesStore()

  const isAdded = isFavourite(itemId)

  if (!isAdded) return null

  return <Button size='icon' className={cn(className)} icon={HeartCrack} variant='outlineDestructive' onClick={() => removeFavourite(itemId)} />
}
