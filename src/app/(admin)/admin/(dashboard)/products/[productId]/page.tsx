import { PageTitle } from "@/shared/components/common/page-title"

import { getTranslations } from "next-intl/server"
import { getProduct } from "@/entities/product/api/proudct.api"
import { notFound } from "next/navigation"
import ProductInfo from "@/features/admin/products/ui/view/product-info"
import PicturesSection from "@/features/admin/products/ui/view/product-pictures"
import SizesSection from "@/features/admin/products/ui/view/product-sizes"
import ReviewsSection from "@/features/admin/products/ui/view/product-reviews"
import ColorsSection from "@/features/admin/products/ui/view/product-colors"
import AttributesSection from "@/features/admin/products/ui/view/product-attributes"

type Props = {
  params: Promise<{ productId: string }>
}

export default async function ViewProductPage({ params }: Props) {
  const t = await getTranslations()

  const { productId } = await params
  const product = await getProduct(+productId)

  if (isNaN(+productId) || !product) notFound()

  console.log(product)

  return (
    <div>
      <PageTitle title={t("View Product")} />
      <div className='space-y-8'>
        <ProductInfo product={product} />
        <AttributesSection attributes={product.attributes} productId={product.id} />
        <PicturesSection pictures={product.pictures} productId={product.id} />
        <SizesSection sizes={product.sizes} productId={product.id} />
        <ReviewsSection reviews={product.reviews} productId={product.id} />
        <ColorsSection colors={product.colors} productId={product.id} />
      </div>
    </div>
  )
}
