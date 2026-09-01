import { useQuery } from "@tanstack/react-query";
import { getCreatorDetail } from "@/features/products/api";
import type { CreatorDetailData } from "@/features/products/types";

/**
 * Custom Hook: Fetch creator profile details (Public)
 * Requirement 9: useCreatorDetail Hook
 */
export function useCreatorDetail(creatorId: string) {
  return useQuery<CreatorDetailData, Error>({
    queryKey: ["creator", creatorId],
    queryFn: () => getCreatorDetail(creatorId),
    enabled: !!creatorId,
    staleTime: 60 * 1000, // 1 minute
  });
}
