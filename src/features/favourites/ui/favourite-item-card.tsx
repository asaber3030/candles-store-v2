import Link from "next/link"

import { FavouriteItem } from "../model/favourite"
import { userRoutes } from "@/shared/config/routes"
import { formatCurrency } from "@/shared/lib/numbers"
import { RemoveFromFavouriteButton } from "./remove-from-favourites"

type Props = {
  item: FavouriteItem
}

export const FavouriteCardItem = ({ item }: Props) => (
  <div className='border p-2 rounded-md bg-white shadow-sm block hover:bg-gray-100 transition-all'>
    <div className='flex items-center space-x-4'>
      <Link href={userRoutes.products.viewBySlug(item.slug)}>
        <img src={item.image} alt={item.name} className='w-32 h-32 object-cover rounded-md' />
      </Link>
      <div>
        <Link href={userRoutes.products.viewBySlug(item.slug)} className='text-lg font-semibold hover:underline hover:text-blue-600'>
          {item.name}
        </Link>
        <p className='text-green-700 font-semibold'>{formatCurrency(item.price)}</p>
        <RemoveFromFavouriteButton itemId={+item.id} />
      </div>
    </div>
  </div>
)
