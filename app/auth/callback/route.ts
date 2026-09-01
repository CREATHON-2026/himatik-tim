import { createClient } from "@/lib/supabase/server";
import { syncUserProfile } from "@/features/auth/services/authSyncService";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      const user = data.user;
      const metadata = user.user_metadata || {};

      const rawRole = (metadata.role as string)?.toUpperCase();
      const role: Role = rawRole === "CREATOR" ? Role.CREATOR : Role.CUSTOMER;

      // Sinkronisasi ke PostgreSQL via Prisma
      const profile = await syncUserProfile({
        id: user.id,
        email: user.email || "",
        name: metadata.name || metadata.full_name || user.email?.split("@")[0],
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
    }
  }

  // Jika gagal atau code tidak ada, kembalikan ke login dengan error flag
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
