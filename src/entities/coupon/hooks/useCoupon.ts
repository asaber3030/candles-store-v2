import { checkCouponCode, getCoupon } from "../api/coupon.api"
import { queryKeys } from "@/shared/config/query-keys"

import { useQuery } from "@tanstack/react-query"

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

export function useCheckCoupon(code: string) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.coupons.singleByCode(code),
    queryFn: ({ queryKey }) => checkCouponCode(queryKey[2] as string),
    retry: 2
  })

  return {
    coupon: data,
    isCheckCouponLoading: isLoading,
    refetchCheckCoupon: refetch,
    isCheckCouponRefetching: isRefetching
  }
}
