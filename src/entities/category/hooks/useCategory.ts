import { useQuery } from "@tanstack/react-query"
import { getCategory } from "../api/category.api"
import { queryKeys } from "@/shared/config/query-keys"

export function useCategory(id: number) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.categories.single(id),
    queryFn: ({ queryKey }) => getCategory(queryKey[2] as number)
  })

  return {
    category: data,
    isCategoryLoading: isLoading,
    refetchCategory: refetch,
    isCategoryRefetching: isRefetching
  }
}
