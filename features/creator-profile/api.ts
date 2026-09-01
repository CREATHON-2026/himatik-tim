/**
 * Creator Profile Feature — API Client Functions
 *
 * Typed fetch wrappers for creator profile endpoints.
 */

import type {
  CreatorProfile,
  UpdateProfileInput,
  UploadPhotoResponse,
} from "./types";
import type { ApiResponse } from "../auth/types";

const BASE_URL = "/api/creator-profile";

/**
 * Get current creator's profile
 * Returns null if profile doesn't exist yet
 */
export async function getCreatorProfile(): Promise<CreatorProfile | null> {
  const res = await fetch(BASE_URL, {
    method: "GET",
  });

  const json: ApiResponse<CreatorProfile | null> = await res.json();

  if (!res.ok || json.error) {
    throw new Error(json.error || "Failed to fetch profile");
  }

  return (json.data ?? null) as CreatorProfile | null;
}

/**
 * Create or update creator profile
 * @throws Error with validation message on failure
 */
export async function updateCreatorProfile(
  input: UpdateProfileInput
): Promise<CreatorProfile> {
  const res = await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const json: ApiResponse<CreatorProfile> = await res.json();

  if (!res.ok || json.error) {
    throw new Error(json.error || "Failed to update profile");
  }

  return (json.data ?? json) as CreatorProfile;
}

/**
 * Upload profile photo or banner (max 1MB, JPG/PNG)
 * @throws Error on validation failure or upload error
 */
export async function uploadProfilePhoto(
  file: File,
  type: "photo" | "banner" = "photo"
): Promise<UploadPhotoResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload-photo?type=${type}`, {
    method: "POST",
    body: formData,
  });

  const json: ApiResponse<UploadPhotoResponse> = await res.json();

  if (!res.ok || json.error) {
    throw new Error(json.error || `Failed to upload ${type}`);
  }

  return (json.data ?? json) as UploadPhotoResponse;
}
