/**
 * useCreatorProduct Hook — Single Product Detail & Mutations
 */

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as productApi from "../api";
import type { Product, UpdateProductInput } from "../types";

const PRODUCTS_QUERY_KEY = ["creator-products"];
const PRODUCT_QUERY_KEY = (id: string) => ["creator-product", id];

export function useCreatorProduct(id: string) {
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    error: fetchError,
  } = useQuery<Product>({
    queryKey: PRODUCT_QUERY_KEY(id),
    queryFn: () => productApi.getProduct(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });

  const updateMutation = useMutation<
    Product,
    Error,
    UpdateProductInput
  >({
    mutationFn: (data) => productApi.updateProduct(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(PRODUCT_QUERY_KEY(id), updated);
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });

  const deleteMutation = useMutation<void, Error>({
    mutationFn: () => productApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });

  const uploadImageMutation = useMutation<
    { id: string; imageUrl: string },
    Error,
    File
  >({
    mutationFn: (file) => productApi.uploadProductImage(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEY(id) });
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });

  const error =
    fetchError ||
    updateMutation.error ||
    deleteMutation.error ||
    uploadImageMutation.error;

  return {
    product,
    isLoading,
    error,
    updateProduct: updateMutation.mutateAsync,
    deleteProduct: deleteMutation.mutateAsync,
    uploadImage: uploadImageMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isUploadingImage: uploadImageMutation.isPending,
  };
}
