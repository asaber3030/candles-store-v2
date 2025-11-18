import { useQuery } from "@tanstack/react-query"
import { getCity } from "../api/city.api"
import { queryKeys } from "@/shared/config/query-keys"

export function useCity(id: number) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.cities.single(id),
    queryFn: ({ queryKey }) => getCity(queryKey[2] as number)
  })

  return {
    city: data,
    isCityLoading: isLoading,
    refetchCity: refetch,
    isCityRefetching: isRefetching
  }
}
