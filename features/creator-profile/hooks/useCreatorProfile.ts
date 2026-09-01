/**
 * useCreatorProfile Hook — Creator Profile State Management
 *
 * Provides:
 * - profile: current creator profile data
 * - isLoading: fetching profile
 * - error: latest error
 * - updateProfile: update shop name
 * - uploadPhoto: upload profile photo
 */

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as profileApi from "../api";
import type { CreatorProfile, UpdateProfileInput } from "../types";

const PROFILE_QUERY_KEY = ["creator-profile"];

export function useCreatorProfile() {
  const queryClient = useQueryClient();

  // Fetch profile on mount
  const {
    data: profile,
    isLoading,
    error: fetchError,
  } = useQuery<CreatorProfile | null>({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: profileApi.getCreatorProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update profile mutation
  const updateMutation = useMutation<CreatorProfile, Error, UpdateProfileInput>(
    {
      mutationFn: profileApi.updateCreatorProfile,
      onSuccess: (updatedProfile) => {
        queryClient.setQueryData<CreatorProfile | null>(
          PROFILE_QUERY_KEY,
          updatedProfile
        );
      },
    }
  );

  // Upload photo mutation
  const uploadPhotoMutation = useMutation<{ photoUrl: string }, Error, File>({
    mutationFn: (file) => profileApi.uploadProfilePhoto(file, "photo"),
    onSuccess: (data) => {
      // Update profile cache with new photoUrl
      queryClient.setQueryData<CreatorProfile | null>(
        PROFILE_QUERY_KEY,
        (old) => (old ? { ...old, photoUrl: data.photoUrl } : null)
      );
    },
  });

  // Upload banner mutation
  const uploadBannerMutation = useMutation<{ photoUrl: string }, Error, File>({
    mutationFn: (file) => profileApi.uploadProfilePhoto(file, "banner"),
    onSuccess: (data) => {
      // Update profile cache with new bannerUrl
      queryClient.setQueryData<CreatorProfile | null>(
        PROFILE_QUERY_KEY,
        (old) => (old ? { ...old, bannerUrl: data.photoUrl } : null)
      );
    },
  });

  // Aggregate error from all sources
  const error =
    fetchError ||
    updateMutation.error ||
    uploadPhotoMutation.error ||
    uploadBannerMutation.error;
  const isError = !!error;

  // Clear mutation errors
  const clearError = () => {
    updateMutation.reset();
    uploadPhotoMutation.reset();
    uploadBannerMutation.reset();
  };

  return {
    profile: profile ?? null,
    isLoading,
    error,
    isError,
    clearError,
    updateProfile: updateMutation.mutateAsync,
    uploadPhoto: uploadPhotoMutation.mutateAsync,
    uploadBanner: uploadBannerMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    isUploading: uploadPhotoMutation.isPending,
    isUploadingBanner: uploadBannerMutation.isPending,
  };
}
