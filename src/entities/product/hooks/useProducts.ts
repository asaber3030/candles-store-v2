import { queryKeys } from "@/shared/config/query-keys"
import { useQuery } from "@tanstack/react-query"
import { getCategoryProductsPaginated, getProductsPaginated } from "../api/proudct.api"

export function useProducts(sp: TObject = {}) {
  const { data, isLoading, refetch, isRefetching, error, isError } = useQuery({
    queryKey: queryKeys.products.index(sp),
    queryFn: ({ queryKey }) => getProductsPaginated(queryKey[3] as TObject),
    retry: 2
  })

  return {
    products: data,
    isProductsLoading: isLoading,
    refetchProducts: refetch,
    productsError: error,
    isProductsError: isError,
    isProductsRefetching: isRefetching
  }
}

export function useCategoryProducts(categoryId: number, sp: TObject = {}) {
  const { data, isLoading, refetch, isRefetching, error, isError } = useQuery({
    queryKey: queryKeys.categories.products(categoryId, sp),
    queryFn: ({ queryKey }) => getCategoryProductsPaginated(queryKey[2] as number, queryKey[4] as TObject),
    retry: 2
  })

  return {
    products: data,
    isProductsLoading: isLoading,
    refetchProducts: refetch,
    productsError: error,
    isProductsError: isError,
    isProductsRefetching: isRefetching
  }
}
