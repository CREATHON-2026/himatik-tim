import type { EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncUserProfile } from "@/features/auth/services/authSyncService";
import { Role } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/katalog";
  const origin = new URL(request.url).origin;

  if (!token_hash || !type) {
    return NextResponse.redirect(
      new URL("/verify-email?error=missing_token", request.url)
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.verifyOtp({ type, token_hash });

  if (error) {
    return NextResponse.redirect(
      new URL(
        `/verify-email?error=${encodeURIComponent(error.code ?? "verify_failed")}`,
        request.url
      )
    );
  }

  // Sync profile ke Prisma setelah verifikasi berhasil
  if (data?.user) {
    try {
      const metadata = data.user.user_metadata || {};
      const rawRole = (metadata.role as string)?.toUpperCase();
      const role: Role = rawRole === "CREATOR" ? Role.CREATOR : Role.CUSTOMER;

      const profile = await syncUserProfile({
        id: data.user.id,
        email: data.user.email || "",
        name:
          metadata.name ||
          metadata.full_name ||
          data.user.email?.split("@")[0],
        avatarUrl: metadata.avatar_url || metadata.picture || null,
        phone: metadata.phone || null,
        role,
        storeName: metadata.storeName || null,
        city: metadata.city || null,
      });

      // Role-based redirect
      if (profile.role === Role.ADMIN) {
        return NextResponse.redirect(new URL("/dashboard/admin", origin));
      } else if (profile.role === Role.CREATOR) {
        return NextResponse.redirect(new URL("/dashboard/creator", origin));
      }
    } catch (syncError) {
      console.error("Profile sync after email verify failed:", syncError);
      // User sudah terverifikasi di Supabase, lanjut redirect meski sync gagal
    }
  }

  return NextResponse.redirect(new URL(next, origin));
}
