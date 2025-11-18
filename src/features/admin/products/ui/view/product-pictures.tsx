"use client"

import { useTranslations } from "next-intl"

import { deleteProductPictureAction } from "@/entities/product/api/proudct.api"

import { CreatePictureModal } from "../modals/create-picture"
import { ProductPicture } from "@prisma/client"
import { DeleteModal } from "@/shared/components/common/delete-modal"
import { NoDataLabel } from "@/shared/components/common/no-data-label"
import { Card } from "@/shared/components/ui/card"

interface PicturesSectionProps {
  pictures: ProductPicture[]
  productId: number
}

export default function PicturesSection({ pictures, productId }: PicturesSectionProps) {
  const t = useTranslations()

  return (
    <Card className='p-6'>
      <div className='flex justify-between items-center'>
        <h3 className='text-xl font-bold'>{t("product.sections.pictures")}</h3>
        <CreatePictureModal productId={productId} />
      </div>

      {pictures.length == 0 && <NoDataLabel label={t("No Data Found")} />}

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {pictures.map((pic) => (
          <div key={pic.id} className='relative group'>
            <img src={pic.picture || "/placeholder.svg"} alt={`Picture ${pic.id}`} width={200} height={200} className='w-full h-48 object-cover rounded-lg' />
            <div className='absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2'>
              <DeleteModal id={pic.id} action={deleteProductPictureAction} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
