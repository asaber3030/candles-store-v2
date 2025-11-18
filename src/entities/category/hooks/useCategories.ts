import { queryKeys } from "@/shared/config/query-keys"
import { useQuery } from "@tanstack/react-query"
import { getAllCategories, getCategoriesPaginated } from "../api/category.api"

export function useCategories(sp: TObject = {}) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.categories.index(sp),
    queryFn: ({ queryKey }) => getCategoriesPaginated(queryKey[3] as TObject)
  })

  return {
    categories: data,
    isCategoriesLoading: isLoading,
    refetchCategories: refetch,
    isCategoriesRefetching: isRefetching
  }
}

export function useAllCategories(sp: TObject = {}) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.categories.index(sp),
    queryFn: ({ queryKey }) => getAllCategories(queryKey[3] as TObject)
  })

  return {
    categories: data,
    isCategoriesLoading: isLoading,
    refetchCategories: refetch,
    isCategoriesRefetching: isRefetching
  }
}
