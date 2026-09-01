import type { Product } from "../products/types";

export interface CreatorProfileProduct extends Product {
  averageRating?: number;
  reviewCount?: number;
  sizeBadge?: string | null;
  typeBadge?: string | null;
  reviews?: import("../products/types").ProductReview[];
}

export interface CreatorProfile {
  id: string;
  userId: string;
  shopName: string;
  photoUrl: string | null;
  bannerUrl: string | null;
  bio: string | null;
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
  address: string | null;
  openingHours: string | null;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  products?: CreatorProfileProduct[];
}

export interface UpdateProfileInput {
  shopName: string;
  photoUrl?: string | null;
  bannerUrl?: string | null;
  bio?: string | null;
  whatsapp?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  address?: string | null;
  openingHours?: string | null;
}

export interface UploadPhotoResponse {
  photoUrl: string;
}
