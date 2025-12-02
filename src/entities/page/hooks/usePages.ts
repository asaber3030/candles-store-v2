import { queryKeys } from "@/shared/config/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getPages } from "../api/page.api";

export function usePages() {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: queryKeys.pages.index(),
    queryFn: () => getPages(),
  });

  return {
    pages: data,
    isPagesLoading: isLoading,
    refetchPages: refetch,
    isPagesRefetching: isRefetching,
  };
}
