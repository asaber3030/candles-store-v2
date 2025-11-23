import { ProductColor, ProductSize } from "@prisma/client"

export type FavouriteItem = {
  id: number | string
  slug: string
  price: number
  name?: string
  image?: string
}

export type FavouritesState = {
  favourites: FavouriteItem[]
  addFavourite: (item: FavouriteItem) => void
  removeFavourite: (id: number | string) => void
  toggleFavourite: (item: FavouriteItem) => void
  isFavourite: (id: number | string) => boolean
  clearFavourites: () => void
}
