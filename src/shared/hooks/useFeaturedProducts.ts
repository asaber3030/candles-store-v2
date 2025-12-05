import { getFeaturedProducts } from "@/entities/product/api/proudct.api"
import { useQuery } from "@tanstack/react-query"

export function useFeaturedProducts(count: number = 8) {
  const query = useQuery({
    queryKey: ["user", "featured-products"],
    queryFn: () => getFeaturedProducts(count),
  })

  return {
    isFeaturedProductsLoading: query.isLoading,
    featuredProducts: query.data,
  }
}
