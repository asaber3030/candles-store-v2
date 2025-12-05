import { getUserCounts } from "@/entities/settings/api/settings.api"
import { useQuery } from "@tanstack/react-query"

export function useCountStats() {
  const query = useQuery({
    queryKey: ["user", "count-stats"],
    queryFn: getUserCounts,
  })

  return {
    isLoading: query.isLoading,
    data: query.data || { productsCount: 0, categoriesCount: 0 },
  }
}
