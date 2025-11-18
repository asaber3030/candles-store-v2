import { queryKeys } from "@/shared/config/query-keys"
import { useQuery } from "@tanstack/react-query"
import { getOrdersPaginated, getUserOrders } from "../api/order.api"

export function useOrders(sp: TObject = {}) {
  const { data, isLoading, refetch, isRefetching, error } = useQuery({
    queryKey: queryKeys.orders.index(sp),
    queryFn: ({ queryKey }) => getOrdersPaginated(queryKey[3] as TObject)
  })

  return {
    orders: data,
    isOrdersLoading: isLoading,
    refetchOrders: refetch,
    isOrdersRefetching: isRefetching,
    ordersError: error
  }
}

export function useUserOrders(userId: number, sp: TObject = {}) {
  const { data, isLoading, refetch, isRefetching, error } = useQuery({
    queryKey: queryKeys.orders.userOrders(userId, sp),
    queryFn: ({ queryKey }) => getUserOrders(Number(queryKey[2]), queryKey[4] as TObject)
  })

  return {
    orders: data,
    isOrdersLoading: isLoading,
    refetchOrders: refetch,
    isOrdersRefetching: isRefetching,
    ordersError: error
  }
}
