import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/user.api"
import { queryKeys } from "@/shared/config/query-keys"

export function useUser(id: number) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.users.single(id),
    queryFn: ({ queryKey }) => getUser(queryKey[2] as number)
  })

  return {
    user: data,
    isUserLoading: isLoading,
    refetchUser: refetch,
    isUserRefetching: isRefetching
  }
}
