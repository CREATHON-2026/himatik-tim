/**
 * useCreatorProducts Hook — Product List & CRUD State Management
 *
 * Provides:
 * - products: array of creator's products
 * - isLoading: fetching product list
 * - error: latest error
 * - addProduct, updateProduct, deleteProduct, uploadImage: mutations
 */

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as productApi from "../api";
import type { Product, CreateProductInput, UpdateProductInput } from "../types";

const PRODUCTS_QUERY_KEY = ["creator-products"];

export function useCreatorProducts() {
  const queryClient = useQueryClient();

  // Fetch product list on mount
  const {
    data: products,
    isLoading,
    error: fetchError,
  } = useQuery<Product[]>({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: productApi.listCreatorProducts,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Create product mutation
  const addMutation = useMutation<Product, Error, CreateProductInput>({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });

  // Update product mutation
  const updateMutation = useMutation<
    Product,
    Error,
    { id: string; data: UpdateProductInput }
  >({
    mutationFn: ({ id, data }) => productApi.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });

  // Delete product mutation
  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: productApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });

  // Upload image mutation
  const uploadImageMutation = useMutation<
    { id: string; imageUrl: string },
    Error,
    { productId: string; file: File }
  >({
    mutationFn: ({ productId, file }) =>
      productApi.uploadProductImage(productId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });

  // Aggregate error from all sources
  const error =
    fetchError ||
    addMutation.error ||
    updateMutation.error ||
    deleteMutation.error ||
    uploadImageMutation.error;
  const isError = !!error;

  // Clear all mutation errors
  const clearError = () => {
    addMutation.reset();
    updateMutation.reset();
    deleteMutation.reset();
    uploadImageMutation.reset();
  };

  return {
    products: products ?? [],
    isLoading,
    error,
    isError,
    clearError,
    addProduct: addMutation.mutateAsync,
    updateProduct: (id: string, data: UpdateProductInput) =>
      updateMutation.mutateAsync({ id, data }),
    deleteProduct: deleteMutation.mutateAsync,
    uploadImage: (productId: string, file: File) =>
      uploadImageMutation.mutateAsync({ productId, file }),
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isUploadingImage: uploadImageMutation.isPending,
  };
}
