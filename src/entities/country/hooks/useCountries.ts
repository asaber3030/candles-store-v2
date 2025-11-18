import { getAllCountries, getCountriesPaginated } from "../api/country.api"

import { queryKeys } from "@/shared/config/query-keys"

import { useQuery } from "@tanstack/react-query"

export function useCountries(sp: TObject = {}) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.countries.index(sp),
    queryFn: ({ queryKey }) => getCountriesPaginated(queryKey[3] as TObject)
  })

  return {
    countries: data,
    isCountriesLoading: isLoading,
    refetchCountries: refetch,
    isCountriesRefetching: isRefetching
  }
}

export function useAllCountries(sp: TObject = {}) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.countries.index(sp),
    queryFn: ({ queryKey }) => getAllCountries(queryKey[3] as TObject)
  })

  return {
    countries: data,
    isCountriesLoading: isLoading,
    refetchCountries: refetch,
    isCountriesRefetching: isRefetching
  }
}
