import { useQuery } from "@tanstack/react-query"

import { queryKeys } from "@/shared/config/query-keys"
import { getAppSettings } from "../api/settings.api"

export function useSettings(id: number = 1) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.settings.single(id),
    queryFn: ({ queryKey }) => getAppSettings(queryKey[2] as number)
  })

  return {
    settings: data,
    isSettingsLoading: isLoading,
    refetchSettings: refetch,
    isSettingsRefetching: isRefetching
  }
}
