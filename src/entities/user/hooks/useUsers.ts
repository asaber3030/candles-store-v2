import { queryKeys } from "@/shared/config/query-keys"
import { useQuery } from "@tanstack/react-query"
import { getAllUsers, getCurrentUserAddresses, getUserAddresses, getUsersPaginated } from "../api/user.api"

export function useUsers(sp: TObject = {}) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.users.index(sp),
    queryFn: ({ queryKey }) => getUsersPaginated(queryKey[3] as TObject)
  })

  return {
    users: data,
    isUsersLoading: isLoading,
    refetchUsers: refetch,
    isUsersRefetching: isRefetching
  }
}

export function useAllUsers(sp: TObject = {}) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.users.all(sp),
    queryFn: ({ queryKey }) => getAllUsers(queryKey[3] as TObject)
  })

  return {
    users: data,
    isUsersLoading: isLoading,
    refetchUsers: refetch,
    isUsersRefetching: isRefetching
  }
}

export function useUserAddresses(userId: number) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.users.userAddresses(userId),
    queryFn: ({ queryKey }) => getUserAddresses(Number(queryKey[2]))
  })

  return {
    addresses: data,
    isAddressesLoading: isLoading,
    refetchAddresses: refetch,
    isAddressesRefetching: isRefetching
  }
}

export function useCurrentUserAddresses() {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.users.currentUserAddresses(),
    queryFn: () => getCurrentUserAddresses()
  })

  return {
    addresses: data,
    isAddressesLoading: isLoading,
    refetchAddresses: refetch,
    isAddressesRefetching: isRefetching
  }
}
