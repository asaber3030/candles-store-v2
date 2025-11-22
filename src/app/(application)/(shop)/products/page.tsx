import { DefaultContainer } from "@/shared/components/common/default-container"
import { ProductsHero } from "@/shared/components/widgets/products/hero"
import { ViewAllProductsList } from "@/shared/components/widgets/products/products-list"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our products"
}

type Props = {
  searchParams: TSearchParams
}

export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams
  return (
    <div>
      <ProductsHero />
      <DefaultContainer className='py-10'>
        <ViewAllProductsList searchParams={sp} />
      </DefaultContainer>
    </div>
  )
}
