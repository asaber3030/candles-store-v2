import { getFeaturedProducts } from "@/entities/product/api/proudct.api"
import { HomeBanner } from "@/shared/components/widgets/user/home/banner"
import { HomeCategories } from "@/shared/components/widgets/user/home/categories"
import { HomeCTA } from "@/shared/components/widgets/user/home/cta"
import { HomeFeaturedProducts } from "@/shared/components/widgets/user/home/featured-products"
import { HomeUSP } from "@/shared/components/widgets/user/home/usp"

export default async function Home() {
  const products = await getFeaturedProducts(8)

  return (
    <main>
      <HomeBanner />
      <HomeCategories />
      <HomeFeaturedProducts products={products} />
      <HomeUSP />
      <HomeCTA />
    </main>
  )
}
