"use client"

import { useTranslations } from "next-intl"

import { deleteProductColorAction, restoreProductColorAction } from "@/entities/product/api/proudct.api"
import { cn } from "@/shared/lib/cn"

import { CreateColorModal } from "../modals/create-color"
import { ProductColor } from "@prisma/client"
import { RestoreModal } from "@/shared/components/common/restore-modal"
import { DeleteModal } from "@/shared/components/common/delete-modal"
import { NoDataLabel } from "@/shared/components/common/no-data-label"
import { Card } from "@/shared/components/ui/card"

interface ColorsSectionProps {
  colors: ProductColor[]
  productId: number
}

export default function ColorsSection({ colors, productId }: ColorsSectionProps) {
  const t = useTranslations()

  return (
    <Card className='p-6'>
      <div className='flex justify-between items-center'>
        <h3 className='text-xl font-bold'>{t("product.sections.colors")}</h3>
        <CreateColorModal productId={productId} />
      </div>

      {colors.length == 0 && <NoDataLabel label={t("No Data Found")} />}

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {colors.map((color) => (
          <div key={color.id} className='relative group'>
            <div className='flex flex-col items-center gap-3'>
              <div className='w-full h-32 rounded-lg border-2 border-muted-foreground/20 shadow-md' style={{ backgroundColor: color.color }} />
              <p className='text-sm font-mono text-foreground'>
                {color.color} <span className={cn("font-normal ml-2", color.deletedAt ? "text-red-500" : "text-green-500")}>({color.deletedAt ? t("Deleted") : t("Active")})</span>
              </p>
              <div className='flex gap-2 w-full justify-center opacity-0 group-hover:opacity-100 transition-opacity'>{color.deletedAt ? <RestoreModal id={color.id} action={restoreProductColorAction} /> : <DeleteModal id={color.id} action={deleteProductColorAction} />}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
