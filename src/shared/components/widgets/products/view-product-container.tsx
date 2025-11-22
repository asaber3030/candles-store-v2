"use client"

import { FullProduct } from "@/entities/product/model/product"
import { ViewProductLeftSide } from "./view-product-left"
import { ViewProductRightSide } from "./view-product-right"
import { DefaultContainer } from "@/shared/components/common/default-container"
import { Separator } from "@/shared/components/ui/separator"
import { ProductReviewsViewer } from "./product-reviews"

type Props = {
  product: FullProduct
}

export const ViewProductContainer = ({ product }: Props) => {
  return (
    <DefaultContainer className='py-20'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        {/* Left Side */}
        <ViewProductLeftSide pictures={product.pictures} mainPicture={product.picture} />

        {/* Right Side */}
        <ViewProductRightSide details={product} sizes={product.sizes} colors={product.colors} />
      </div>
      <Separator className='my-10' />
      <ProductReviewsViewer productId={product.id} reviews={product.reviews} />
    </DefaultContainer>
  )
}
