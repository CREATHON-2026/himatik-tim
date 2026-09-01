import { createClient } from "@/lib/supabase/server";
import { syncUserProfile } from "@/features/auth/services/authSyncService";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const errorCode = requestUrl.searchParams.get("error_code");
  const errorDescription = requestUrl.searchParams.get("error_description");
  const origin = requestUrl.origin;

  // Handle error redirect dari Supabase (otp_expired, access_denied, dll.)
  if (errorCode) {
    const message = errorDescription || errorCode;
    return NextResponse.redirect(
      `${origin}/verify-email?error=${encodeURIComponent(message)}`
    );
  }

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      const user = data.user;
      const metadata = user.user_metadata || {};

      // Cek role dari query param (Google OAuth) atau metadata (Email signup)
      const queryRole = requestUrl.searchParams.get("role")?.toUpperCase();
      const metaRole = (metadata.role as string)?.toUpperCase();
      const isCreator = queryRole === "CREATOR" || metaRole === "CREATOR";
      const role: Role = isCreator ? Role.CREATOR : Role.CUSTOMER;

      // Sinkronisasi ke PostgreSQL via Prisma (wrapped in try/catch)
      try {
        const profile = await syncUserProfile({
          id: user.id,
          email: user.email || "",
          name:
            metadata.name ||
            metadata.full_name ||
            user.email?.split("@")[0],
          avatarUrl: metadata.avatar_url || metadata.picture || null,
          phone: metadata.phone || null,
          role: role,
          storeName: metadata.storeName || null,
          city: metadata.city || null,
        });

        // Role-based routing
        if (profile.role === Role.ADMIN) {
          return NextResponse.redirect(`${origin}/dashboard/admin`);
        } else if (profile.role === Role.CREATOR) {
          return NextResponse.redirect(`${origin}/dashboard/creator`);
        } else {
          // Customer / Buyer dialihkan langsung ke Katalog Baju & Gift
          return NextResponse.redirect(`${origin}/katalog`);
        }
      } catch (syncError) {
        console.error("Profile sync in OAuth callback failed:", syncError);
        // User sudah ter-autentikasi via Supabase, redirect ke katalog meski sync gagal
        return NextResponse.redirect(`${origin}/katalog`);
      }
    }
  }

  // Jika gagal atau code tidak ada, kembalikan ke login dengan error flag
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
