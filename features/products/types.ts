/**
 * Products Feature — TypeScript Types
 */

export interface Product {
  id: string;
  creatorId: string;
  name: string;
  category: string;
  description: string;
  price: string | number; // String from Prisma Decimal, parsed to number where needed
  imageUrl?: string | null;
  gallery: string[];
  stock: number;
  weight?: number | null;
  sku?: string | null;
  type: string; // READY | PREORDER
  shippingOptions: string[]; // PICKUP | INSTANT | REGULER
  tags: string[];
  showStock: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  creator?: {
    id?: string;
    storeName?: string;
    shopName?: string;
    city?: string;
  };
}

export interface CreateProductInput {
  id?: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  gallery: string[];
  stock: number;
  weight?: number | null;
  sku?: string | null;
  type: string;
  shippingOptions: string[];
  tags: string[];
  showStock: boolean;
  isActive: boolean;
}

export type UpdateProductInput = CreateProductInput;

export interface UploadImageResponse {
  id: string;
  imageUrl: string;
}

export interface ProductReview {
  id: string;
  productId?: string;
  buyerName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

export interface CreatorMinimal {
  id: string;
  shopName: string;
  photoUrl: string | null;
  bannerUrl: string | null;
  bio: string | null;
  whatsapp?: string | null;
  district: string | null;
  subdistrict: string | null;
  openingHours?: string | null;
  createdAt?: string | Date;
  activeProductCount?: number;
  averageRating?: number;
  totalReviewCount?: number;
}

export interface ProductDetailData extends Omit<Product, "price"> {
  price: number;
  averageRating: number;
  reviewCount: number;
  creator: CreatorMinimal;
  reviews: ProductReview[];
}

export interface CreatorProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  averageRating: number;
  reviewCount: number;
  district: string | null;
}

export interface CreatorDetailData {
  id: string;
  shopName: string;
  photoUrl: string | null;
  bannerUrl: string | null;
  bio: string | null;
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
  address: string | null;
  district: string | null;
  subdistrict: string | null;
  openingHours: string | null;
  email: string | null;
  createdAt: string;
  averageRating: number;
  totalReviewCount: number;
  activeProductCount: number;
  products: CreatorProduct[];
  reviews?: ProductReview[];
}

