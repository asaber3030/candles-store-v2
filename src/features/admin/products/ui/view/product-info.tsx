"use client"

import Image from "next/image"

import { useTranslations } from "next-intl"

import { deleteProductAction, restoreProductAction } from "@/entities/product/api/proudct.api"
import { adminRoutes } from "@/shared/config/routes"

import { ProductWithCategory } from "@/entities/product/model/product"
import { RestoreModal } from "@/shared/components/common/restore-modal"
import { DeleteModal } from "@/shared/components/common/delete-modal"
import { LinkBtn } from "@/shared/components/common/link-button"
import { Edit2 } from "lucide-react"
import { Card } from "@/shared/components/ui/card"

interface ProductInfoProps {
  product: ProductWithCategory
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const t = useTranslations()

  return (
    <Card className='p-6'>
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='md:w-1/3'>
          <img src={product.picture || "/placeholder.svg"} alt={product.name || "Name"} width={300} height={300} className='w-full h-auto rounded-lg object-cover' />
        </div>

        <div className='md:w-2/3'>
          <div className='space-y-4'>
            <div>
              <h2 className='text-2xl font-bold'>{product.name}</h2>
              <p className='text-sm text-muted-foreground'>
                {t("product.info.arabic_name")}: {product.description}
              </p>
            </div>

            <div>
              <p className='text-sm font-semibold text-muted-foreground'>{t("product.info.category")}</p>
              <p className='text-lg'>{product.category.name}</p>
            </div>

            <div>
              <p className='text-sm font-semibold text-muted-foreground'>{t("product.info.description")}</p>
              <p>{product.description}</p>
            </div>

            <div>
              <p className='text-sm font-semibold text-muted-foreground'>{t("product.info.long_description")}</p>
              <p className='text-sm'>{product.longDescription}</p>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-sm font-semibold text-muted-foreground'>{t("product.info.price")}</p>
                <p className='text-xl font-bold'>${product.price}</p>
              </div>
              <div>
                <p className='text-sm font-semibold text-muted-foreground'>{t("product.info.offer_price")}</p>
                <p className='text-xl font-bold text-red-500'>${product.offerPrice}</p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-sm font-semibold text-muted-foreground'>{t("product.info.quantity")}</p>
                <p className='text-lg'>{product.quantity}</p>
              </div>
              <div>
                <p className='text-sm font-semibold text-muted-foreground'>{t("product.info.stock_status")}</p>
                <p className={`text-lg font-semibold ${product.quantity > 0 ? "text-green-600" : "text-red-600"}`}>{product.quantity > 0 ? t("product.info.in_stock") : t("product.info.out_of_stock")}</p>
              </div>
            </div>

            <div className='flex gap-2 pt-4'>
              <LinkBtn icon={Edit2} href={adminRoutes.products.update(product.id)} variant='default'>
                {t("product.buttons.edit")}
              </LinkBtn>
              {product.deletedAt ? <RestoreModal id={product.id} action={restoreProductAction} /> : <DeleteModal id={product.id} action={deleteProductAction} />}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
