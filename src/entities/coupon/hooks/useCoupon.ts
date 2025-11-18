import { useQuery } from "@tanstack/react-query"
import { getCoupon } from "../api/coupon.api"
import { queryKeys } from "@/shared/config/query-keys"

export function useCoupon(id: number) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.coupons.single(id),
    queryFn: ({ queryKey }) => getCoupon(queryKey[2] as number)
  })

  return {
    coupon: data,
    isCouponLoading: isLoading,
    refetchCoupon: refetch,
    isCouponRefetching: isRefetching
  }
}
