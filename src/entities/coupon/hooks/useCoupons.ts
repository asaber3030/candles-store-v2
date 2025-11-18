import { queryKeys } from "@/shared/config/query-keys"
import { useQuery } from "@tanstack/react-query"
import { getAllCoupons, getCouponsPaginated } from "../api/coupon.api"

export function useCoupons(sp: TObject = {}) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.coupons.index(sp),
    queryFn: ({ queryKey }) => getCouponsPaginated(queryKey[3] as TObject)
  })

  return {
    coupons: data,
    isCouponsLoading: isLoading,
    refetchCoupons: refetch,
    isCouponsRefetching: isRefetching
  }
}

export function useAllCoupons(sp: TObject = {}) {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.coupons.index(sp),
    queryFn: ({ queryKey }) => getAllCoupons(queryKey[3] as TObject)
  })

  return {
    coupons: data,
    isCouponsLoading: isLoading,
    refetchCoupons: refetch,
    isCouponsRefetching: isRefetching
  }
}
