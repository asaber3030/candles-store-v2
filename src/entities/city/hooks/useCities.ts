import { queryKeys } from "@/shared/config/query-keys"
import { useQuery } from "@tanstack/react-query"
import { getAllCities, getCitiesPaginated } from "../api/city.api"

export function useCities(sp: TObject = {}) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.cities.index(sp),
    queryFn: ({ queryKey }) => getCitiesPaginated(queryKey[3] as TObject)
  })

  return {
    cities: data,
    isCitiesLoading: isLoading,
    refetchCities: refetch,
    isCitiesRefetching: isRefetching
  }
}

export function useAllCities(sp: TObject = {}) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.cities.index(sp),
    queryFn: ({ queryKey }) => getAllCities(queryKey[3] as TObject)
  })

  return {
    cities: data,
    isCitiesLoading: isLoading,
    refetchCities: refetch,
    isCitiesRefetching: isRefetching
  }
}
