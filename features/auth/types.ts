export type UserRole = "CUSTOMER" | "CREATOR" | "ADMIN";

export type CreatorStatus = "PENDING_VERIFICATION" | "APPROVED" | "SUSPENDED";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  avatarUrl?: string | null;
  role: UserRole;
  creatorStatus?: CreatorStatus | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  creatorProfile?: {
    id: string;
    storeName: string;
    description?: string | null;
    city: string;
    address?: string | null;
    isVerified: boolean;
  } | null;
}

export interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}
