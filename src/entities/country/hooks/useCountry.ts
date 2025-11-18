import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/shared/config/query-keys"
import { getCountry } from "../api/country.api"

export function useCountry(id: number) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.countries.single(id),
    queryFn: ({ queryKey }) => getCountry(queryKey[2] as number)
  })

  return {
    country: data,
    isCountryLoading: isLoading,
    refetchCountry: refetch,
    isCountryRefetching: isRefetching
  }
}
