"use client"

import { useFavouritesStore } from "@/features/favourites/model/favourite.store"
import { FavouriteCardItem } from "@/features/favourites/ui/favourite-item-card"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { NoDataLabel } from "@/shared/components/common/no-data-label"
import { useTranslations } from "next-intl"

export default function FavouritesProducts() {
  const { favourites } = useFavouritesStore()
  const t = useTranslations()

  return (
    <DefaultContainer className='py-10'>
      <h1 className='text-2xl font-bold mb-6' data-testid='favourites-page-title'>
        {t("Favourites Title")} ({favourites.length})
      </h1>

      <section className='space-y-4'>
        {favourites.length === 0 && <NoDataLabel label={t("Favourites No Data Title")} />}

        {favourites.map((item) => (
          <FavouriteCardItem key={`fav-item-${item.id}`} item={item} />
        ))}
      </section>
    </DefaultContainer>
  )
}
