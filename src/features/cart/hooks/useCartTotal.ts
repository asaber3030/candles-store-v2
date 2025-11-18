import { useQuery } from "@tanstack/react-query"
import { useCartStore } from "../model/cart.store"

import { calculateOrderTotal } from "@/entities/order/api/order.api"
import { queryKeys } from "@/shared/config/query-keys"

export function useCartTotalByServer() {
  const { items } = useCartStore()

  const query = useQuery({
    queryKey: queryKeys.cart.total(),
    queryFn: () => calculateOrderTotal(items),
    refetchInterval: 2,
    retry: 2
  })

  return {
    totalAmount: query.data || 0,
    isTotalAmountLoading: query.isLoading,
    isTotalAmountError: query.isError,
    totalAmountError: query.error
  }
}
