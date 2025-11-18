import { UpdateProductForm } from "@/features/admin/products/ui/update-form"
import { PageTitle } from "@/shared/components/common/page-title"

import { getTranslations } from "next-intl/server"
import { getProduct } from "@/entities/product/api/proudct.api"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ productId: string }>
}

export default async function CreateProductPage({ params }: Props) {
  const t = await getTranslations()

  const { productId } = await params
  const product = await getProduct(+productId)

  if (isNaN(+productId) || !product) notFound()

  return (
    <div>
      <PageTitle title={t("Update Product")} />
      <div className='max-w-md'>
        <UpdateProductForm product={product} />
      </div>
    </div>
  )
}
