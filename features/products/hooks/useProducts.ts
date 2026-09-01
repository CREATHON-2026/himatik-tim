import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  shopName: string;
  creatorAvatar?: string | null;
  district: string | null;
  averageRating: number;
  reviewCount: number;
  salesCount?: number;
  badge?: string;
  category?: string;
  tags?: string[];
}

export interface UseProductsParams {
  page?: number;
  limit?: number;
  keyword?: string;
  minPrice?: string | null;
  maxPrice?: string | null;
  category?: string | null;
  flowerType?: string | null; // legacy alias
  color?: string | null;
  occasion?: string | null;
  moment?: string | null; // legacy alias
  creatorLocation?: string | null;
  sortBy?: string | null;
}

export interface SearchResponse {
  products: Product[];
  categoryCounts?: Record<string, number>;
  pagination: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    hasMore: boolean;
  };
}

// Fetcher function placed directly inside the hook file
async function fetchProducts(params: UseProductsParams): Promise<SearchResponse> {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.keyword) query.append("keyword", params.keyword);
  if (params.minPrice) query.append("minPrice", params.minPrice);
  if (params.maxPrice) query.append("maxPrice", params.maxPrice);

  const selectedCategory = params.category || params.flowerType;
  if (selectedCategory) query.append("category", selectedCategory);

  if (params.color) query.append("color", params.color);

  const selectedOccasion = params.occasion || params.moment;
  if (selectedOccasion) query.append("occasion", selectedOccasion);

  if (params.creatorLocation) query.append("creatorLocation", params.creatorLocation);
  if (params.sortBy) query.append("sortBy", params.sortBy);

  const res = await fetch(`/api/products/search?${query.toString()}`);
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || "Gagal memuat produk");
  }
  const result = await res.json();
  return result.data;
}

export function useProducts(params: UseProductsParams = {}) {
  const selectedCategory = params.category || params.flowerType || "";
  const selectedOccasion = params.occasion || params.moment || "";

  const queryKey = [
    "products",
    params.page || 1,
    params.limit || 12,
    params.keyword || "",
    params.minPrice || "",
    params.maxPrice || "",
    selectedCategory,
    params.color || "",
    selectedOccasion,
    params.creatorLocation || "",
    params.sortBy || "newest",
  ];

  return useQuery<SearchResponse, Error>({
    queryKey,
    queryFn: () => fetchProducts(params),
    staleTime: 60 * 1000, // 1 minute
  });
}
