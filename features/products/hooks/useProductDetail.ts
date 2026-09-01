import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "@/features/products/api";
import type { ProductDetailData } from "@/features/products/types";

/**
 * Custom Hook: Fetch single product detail (Public)
 * Requirement 9: useProductDetail Hook
 */
export function useProductDetail(productId: string) {
  return useQuery<ProductDetailData, Error>({
    queryKey: ["product", productId],
    queryFn: () => getProductDetail(productId),
    enabled: !!productId,
    staleTime: 60 * 1000, // 1 minute
  });
}
