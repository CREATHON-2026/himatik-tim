"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Loader2, RefreshCcw, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

interface VerifyEmailActionsProps {
  email: string;
}

const COOLDOWN_SECONDS = 60;

export function VerifyEmailActions({ email }: VerifyEmailActionsProps) {
  const { resendVerification, isLoading } = useAuth();
  const [cooldown, setCooldown] = useState(0);
  const [resendStatus, setResendStatus] = useState<"idle" | "success" | "error">("idle");
  const [resendError, setResendError] = useState<string | null>(null);

  // Count-down timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = useCallback(async () => {
    if (!email || cooldown > 0 || isLoading) return;

    setResendStatus("idle");
    setResendError(null);

    try {
      await resendVerification(email);
      setResendStatus("success");
      setCooldown(COOLDOWN_SECONDS);
    } catch (err: unknown) {
      setResendStatus("error");
      setResendError(
        err instanceof Error
          ? err.message
          : "Gagal mengirim ulang. Silakan coba lagi."
      );
    }
  }, [email, cooldown, isLoading, resendVerification]);

  const canResend = !!email && cooldown === 0 && !isLoading;

  return (
    <div className="pt-4 border-t border-neutral-800 w-full flex flex-col gap-2.5">
      {/* Resend feedback banner */}
      {resendStatus === "success" && (
        <div className="flex items-start gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2.5 text-xs text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>
            Email verifikasi baru telah dikirim ke{" "}
            <span className="font-semibold font-mono">{email}</span>. Periksa
            juga folder <span className="font-semibold">Spam / Junk</span>.
          </span>
        </div>
      )}

      {resendStatus === "error" && resendError && (
        <div className="flex items-start gap-2 rounded-xl bg-rose-500/10 border border-rose-500/30 px-3.5 py-2.5 text-xs text-rose-400">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>{resendError}</span>
        </div>
      )}

      {/* Resend button */}
      <button
        type="button"
        onClick={handleResend}
        disabled={!canResend}
        aria-label="Kirim ulang email verifikasi"
        className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Mengirim...</span>
          </>
        ) : cooldown > 0 ? (
          <>
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Kirim Ulang ({cooldown}d)</span>
          </>
        ) : (
          <>
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Kirim Ulang Email Verifikasi</span>
          </>
        )}
      </button>

      {/* Back to login */}
      <Link
        href="/login"
        aria-label="Kembali ke halaman masuk"
        className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs flex items-center justify-center gap-2 transition"
      >
        <span>Kembali ke Halaman Masuk</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>

      {/* Helper hint */}
      <p className="text-[11px] text-neutral-600 text-center leading-relaxed pt-0.5">
        Tidak menemukan email? Periksa folder{" "}
        <span className="text-neutral-400 font-medium">Spam / Junk / Promosi</span>.
        <br />
        Tautan verifikasi berlaku selama <span className="text-neutral-400 font-medium">24 jam</span>.
      </p>
    </div>
  );
}
