"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { LoginFormData, RegisterFormData } from "../schema";
import { useRouter } from "next/navigation";
import type { UserProfile } from "../types";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          setUser({
            id: authUser.id,
            email: authUser.email || "",
            name: authUser.user_metadata?.name || "Pengguna Gifteria",
            phone: authUser.user_metadata?.phone || null,
            role: authUser.user_metadata?.role || "CUSTOMER",
            creatorStatus: null,
            createdAt: authUser.created_at,
            updatedAt: authUser.created_at,
          });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }
    loadUser();
  }, [supabase]);

  const signInWithEmail = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (authError) {
        throw new Error(
          authError.message === "Invalid login credentials"
            ? "Email atau password yang Anda masukkan salah."
            : authError.message
        );
      }

      if (authData.user) {
        const role = authData.user.user_metadata?.role?.toUpperCase();

        if (role === "ADMIN") {
          router.push("/dashboard/admin");
        } else if (role === "CREATOR") {
          router.push("/dashboard/creator");
        } else {
          router.push("/katalog");
        }
        router.refresh();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat masuk. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const redirectUrl = `${window.location.origin}/auth/callback`;

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: data.name,
            phone: data.phone,
            role: data.role,
            storeName: data.storeName || null,
            city: data.city || null,
          },
        },
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (authData.user) {
        // Supabase silent-duplicate: user sudah ada tapi belum verify
        // ditandai dengan identities array kosong
        if (
          authData.user.identities &&
          authData.user.identities.length === 0
        ) {
          setError(
            "Email ini sudah terdaftar. Silakan cek kotak masuk Anda untuk tautan verifikasi, atau gunakan 'Kirim Ulang' di halaman berikut."
          );
          router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
          return;
        }
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal mendaftar akun. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerification = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (resendError) {
        throw new Error(resendError.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal mengirim ulang email verifikasi. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (role: "CUSTOMER" | "CREATOR" = "CUSTOMER") => {
    setIsLoading(true);
    setError(null);

    try {
      const redirectUrl = `${window.location.origin}/auth/callback?role=${encodeURIComponent(role)}`;

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (oauthError) {
        throw new Error(oauthError.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal menghubungkan dengan akun Google.");
      }
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    setError,
    signInWithEmail,
    signUp,
    resendVerification,
    signInWithGoogle,
    signOut,
  };
}
