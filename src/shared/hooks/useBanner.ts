import { getBannerImages } from "@/entities/banner/api/banner.api"
import { useQuery } from "@tanstack/react-query"

export function useBannerImages() {
  const query = useQuery({
    queryKey: ['user', 'banner-images'],
    queryFn: getBannerImages
  })

  return {
    isBannerImagesLoading: query.isLoading,
    bannerImages: query.data,
  }
}