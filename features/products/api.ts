/**
 * Products Feature — API Client Functions
 *
 * Typed fetch wrappers for product CRUD and image upload endpoints.
 */

import type {
  Product,
  CreateProductInput,
  UpdateProductInput,
  UploadImageResponse,
  ProductDetailData,
  CreatorDetailData,
} from "./types";
import type { ApiResponse } from "../auth/types";

const BASE_URL = "/api/products";

/**
 * List all products for current creator
 */
export async function listCreatorProducts(): Promise<Product[]> {
  const res = await fetch(BASE_URL, {
    method: "GET",
  });

  const json: ApiResponse<Product[]> = await res.json();

  if (!res.ok || json.error) {
    throw new Error(json.error || "Failed to fetch products");
  }

  return (json.data ?? json) as Product[];
}

/**
 * Create a new product
 * @throws Error with validation message on failure
 */
export async function createProduct(
  input: CreateProductInput
): Promise<Product> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const json: ApiResponse<Product> = await res.json();

  if (!res.ok || json.error) {
    throw new Error(json.error || "Failed to create product");
  }

  return (json.data ?? json) as Product;
}

/**
 * Get a single product by ID
 * @throws Error if not found or not owned by current creator
 */
export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
  });

  const json: ApiResponse<Product> = await res.json();

  if (!res.ok || json.error) {
    throw new Error(json.error || "Failed to fetch product");
  }

  return (json.data ?? json) as Product;
}

/**
 * Update an existing product
 * @throws Error with validation message on failure
 */
export async function updateProduct(
  id: string,
  input: UpdateProductInput
): Promise<Product> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const json: ApiResponse<Product> = await res.json();

  if (!res.ok || json.error) {
    throw new Error(json.error || "Failed to update product");
  }

  return (json.data ?? json) as Product;
}

/**
 * Delete a product
 * @throws Error on failure
 */
export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const json: ApiResponse<void> = await res.json();

  if (!res.ok || json.error) {
    throw new Error(json.error || "Failed to delete product");
  }
}

/**
 * Upload a product image (direct form upload)
 * @throws Error on upload failure
 */
export async function uploadProductImage(
  productId: string,
  file: File
): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("productId", productId);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  const json: ApiResponse<UploadImageResponse> = await res.json();

  if (!res.ok || json.error) {
    throw new Error(json.error || "Failed to upload image");
  }

  return (json.data ?? json) as UploadImageResponse;
}

/**
 * Get product detail by ID (Public view)
 */
export async function getProductDetail(id: string): Promise<ProductDetailData> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
  });

  const json: ApiResponse<ProductDetailData> = await res.json();

  if (!res.ok || json.error) {
    throw new Error(json.error || "Failed to fetch product detail");
  }

  return (json.data ?? json) as ProductDetailData;
}

/**
 * Get creator public profile and their active products
 */
export async function getCreatorDetail(id: string): Promise<CreatorDetailData> {
  const res = await fetch(`/api/creators/${id}`, {
    method: "GET",
  });

  const json: ApiResponse<CreatorDetailData> = await res.json();

  if (!res.ok || json.error) {
    throw new Error(json.error || "Failed to fetch creator profile");
  }

  return (json.data ?? json) as CreatorDetailData;
}
