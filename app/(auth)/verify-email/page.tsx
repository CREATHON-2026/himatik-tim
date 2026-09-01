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
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-600 shadow-sm shadow-indigo-600/10">
          <MailCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-neutral-600">
            Tautan verifikasi resmi telah dikirimkan ke:
          </p>
          <p className="text-sm font-semibold text-neutral-900 font-mono bg-neutral-100/90 px-3.5 py-2 rounded-xl border border-neutral-200/80 break-all">
            {email || "email Anda"}
          </p>
          <p className="text-xs text-neutral-500 pt-2 leading-relaxed max-w-sm">
            Silakan buka Gmail / kotak masuk Anda dan klik tombol <strong>&quot;Confirm your email&quot;</strong> untuk mengaktifkan akun dan masuk ke platform.
          </p>
        </div>

        <div className="pt-4 border-t border-neutral-100 w-full flex flex-col gap-2.5">
          <Link
            href="/login"
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs flex items-center justify-center gap-2 transition shadow-sm shadow-indigo-600/20"
          >
            <span>Kembali ke Halaman Masuk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
