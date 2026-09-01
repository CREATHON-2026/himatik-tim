import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { MailCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

interface VerifyEmailPageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { email } = await searchParams;

  return (
    <AuthLayout
      title="Periksa Kotak Masuk Anda"
      subtitle="Kami telah mengirimkan tautan konfirmasi pendaftaran akun Anda."
    >
      <div className="flex flex-col items-center text-center space-y-5 py-2">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <MailCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-neutral-300">
            Tautan verifikasi telah dikirimkan ke:
          </p>
          <p className="text-sm font-semibold text-emerald-400 font-mono bg-neutral-950/80 px-3 py-1.5 rounded-lg border border-neutral-800 break-all">
            {email || "email Anda"}
          </p>
          <p className="text-xs text-neutral-500 pt-2 leading-relaxed">
            Silakan klik tombol atau tautan di dalam email tersebut untuk
            mengaktifkan akun dan langsung masuk ke dashboard Anda.
          </p>
        </div>

        <div className="pt-4 border-t border-neutral-800 w-full flex flex-col gap-2.5">
          <Link
            href="/login"
            className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs flex items-center justify-center gap-2 transition"
          >
            <span>Kembali ke Halaman Masuk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
