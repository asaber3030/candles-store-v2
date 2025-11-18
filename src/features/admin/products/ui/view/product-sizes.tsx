"use client"

import { useTranslations } from "next-intl"

import { deleteProductSizeAction, restoreProductSizeAction } from "@/entities/product/api/proudct.api"
import { formatCurrency } from "@/shared/lib/numbers"

import { CreateSizeModal } from "../modals/create-size"
import { UpdateSizeModal } from "../modals/update-size"
import { RestoreModal } from "@/shared/components/common/restore-modal"
import { NoDataLabel } from "@/shared/components/common/no-data-label"
import { ProductSize } from "@prisma/client"
import { DeleteModal } from "@/shared/components/common/delete-modal"
import { Badge } from "@/shared/components/ui/badge"
import { Card } from "@/shared/components/ui/card"

interface SizesSectionProps {
  sizes: ProductSize[]
  productId: number
}

export default function SizesSection({ sizes, productId }: SizesSectionProps) {
  const t = useTranslations()

  return (
    <Card className='p-6'>
      <div className='flex justify-between items-center'>
        <h3 className='text-xl font-bold'>{t("product.sections.sizes")}</h3>
        <CreateSizeModal productId={productId} />
      </div>

      {sizes.length == 0 && <NoDataLabel label={t("No Data Found")} />}

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead className='border-b'>
            <tr>
              <th className='text-left py-3 px-4 font-semibold'>{t("product.sizes.label")}</th>
              <th className='text-left py-3 px-4 font-semibold'>{t("product.sizes.type")}</th>
              <th className='text-left py-3 px-4 font-semibold'>{t("product.sizes.radius")}</th>
              <th className='text-left py-3 px-4 font-semibold'>{t("product.sizes.width")}</th>
              <th className='text-left py-3 px-4 font-semibold'>{t("product.sizes.height")}</th>
              <th className='text-left py-3 px-4 font-semibold'>{t("product.sizes.length")}</th>
              <th className='text-left py-3 px-4 font-semibold'>{t("product.sizes.price")}</th>
              <th className='text-center py-3 px-4 font-semibold'>{t("product.columns.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size) => (
              <tr key={size.id} className='border-b hover:bg-muted/50'>
                <td className='py-3 px-4'>{size.label}</td>
                <td className='py-3 px-4'>{size.isCircle ? t("product.sizes.circle") : t("product.sizes.rectangle")}</td>
                <td className='py-3 px-4'>{size.radius}</td>
                <td className='py-3 px-4'>{size.width}</td>
                <td className='py-3 px-4'>{size.height}</td>
                <td className='py-3 px-4'>{size.length}</td>
                <td className='py-3 px-4 font-semibold text-green-500'>{formatCurrency(size.price || 0)}</td>
                <td className='py-3 px-4 font-semibold'>
                  <Badge variant={size.deletedAt ? "destructive" : "success"}>{size.deletedAt ? t("Yes") : t("No")}</Badge>
                </td>
                <td className='py-3 px-4 flex justify-center gap-2'>
                  <UpdateSizeModal size={size} />
                  {size.deletedAt ? <RestoreModal id={size.id} action={restoreProductSizeAction} /> : <DeleteModal id={size.id} action={deleteProductSizeAction} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
