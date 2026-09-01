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
  storeName?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  description?: string | null;
  city?: string | null;
  address?: string | null;
  photoUrl?: string | null;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  bio?: string | null;
  whatsapp?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  openingHours?: string | null;
  verificationStatus?: "PENDING" | "APPROVED" | "REJECTED";
  isVerified?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  products?: CreatorProfileProduct[];
}

export interface UpdateProfileInput {
  shopName?: string;
  storeName?: string;
  name?: string | null;
  phone?: string | null;
  city?: string | null;
  address?: string | null;
  description?: string | null;
  photoUrl?: string | null;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  bio?: string | null;
  whatsapp?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  openingHours?: string | null;
}

export interface UploadPhotoResponse {
  photoUrl: string;
}
