import { useQuery } from "@tanstack/react-query"
import { getProduct, userHasReviewedProduct } from "../api/proudct.api"
import { queryKeys } from "@/shared/config/query-keys"

export function useProduct(id: number) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.products.single(id),
    queryFn: ({ queryKey }) => getProduct(queryKey[2] as number)
  })

  return {
    product: data,
    isProductLoading: isLoading,
    refetchProduct: refetch,
    isProductRefetching: isRefetching
  }
}

export function useUserHasProductReview(productId: number) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.products.hasReview(productId),
    queryFn: ({ queryKey }) => userHasReviewedProduct(queryKey[2] as number)
  })

  return {
    hasReview: data,
    isHasReviewLoading: isLoading,
    refetchHasReview: refetch,
    isHasReviewRefetching: isRefetching
  }
}
