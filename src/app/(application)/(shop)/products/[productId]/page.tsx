import { getProduct, getProductBySlug } from "@/entities/product/api/proudct.api"
import { ViewProductContainer } from "@/shared/components/widgets/products/view-product-container"

type Props = {
  params: Promise<{ productId: string }>
}

export default async function ViewProductPage({ params }: Props) {
  const { productId } = await params
  const product = await getProductBySlug(productId)

  if (!product) {
    return <div>Product not found</div>
  }

  return <ViewProductContainer product={product} />
}
