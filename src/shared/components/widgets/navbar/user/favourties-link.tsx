"use client"

import { useFavouritesStore } from "@/features/favourites/model/favourite.store"

import { userRoutes } from "@/shared/config/routes"
import { cn } from "@/shared/lib/cn"

import { HeartIcon } from "lucide-react"
import { LinkBtn } from "@/shared/components/common/link-button"

export const NavbarFavouritesLink = () => {
  const { favourites } = useFavouritesStore()
  return (
    <div className={cn("relative")}>
      <LinkBtn href={userRoutes.favourites} size="icon" icon={HeartIcon} variant="destructive" className="size-10 rounded-full text-white" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{favourites.length}</span>
    </div>
  )
}
