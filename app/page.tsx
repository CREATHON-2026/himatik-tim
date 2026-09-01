import Link from "next/link";
import {
  Sparkles,
  ShoppingBag,
  Store,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between antialiased selection:bg-emerald-500 selection:text-black">
      {/* Navigation Header */}
      <header className="w-full border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <span>Creathon<span className="text-emerald-400">.</span></span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white transition"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition shadow-md shadow-emerald-500/20"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" /> Platform Rental Busana Adat & Kreatif Nusantara
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Sewa Pakaian Tradisional & Busana Kreatif dengan Aman
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Ekosistem marketplace busana adat terlengkap yang menghubungkan penyewa dengan kreator busana di seluruh Indonesia, didukung perlindungan transaksi escrow.
          </p>

          {/* Action Navigation Matrix */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/katalog"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition flex items-center gap-2 shadow-lg shadow-emerald-500/25"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Jelajahi Katalog Busana</span>
            </Link>

            <Link
              href="/register?role=CREATOR"
              className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-medium text-sm transition flex items-center gap-2"
            >
              <Store className="w-4 h-4 text-emerald-400" />
              <span>Buka Rental (Creator)</span>
            </Link>
          </div>

          {/* Quick Route Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 text-left">
            <Link
              href="/katalog"
              className="p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/40 hover:border-emerald-500/50 hover:bg-neutral-900/80 transition group block"
            >
              <div className="flex items-center justify-between text-white font-semibold text-xs mb-1">
                <span className="flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Katalog Customer</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition" />
              </div>
              <p className="text-[11px] text-neutral-400">
                Lihat busana sewa, filtering adat daerah, dan opsi sewa.
              </p>
            </Link>

            <Link
              href="/dashboard/creator"
              className="p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/40 hover:border-emerald-500/50 hover:bg-neutral-900/80 transition group block"
            >
              <div className="flex items-center justify-between text-white font-semibold text-xs mb-1">
                <span className="flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Studio Creator</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition" />
              </div>
              <p className="text-[11px] text-neutral-400">
                Kelola koleksi busana, pantau pesanan sewa & pencairan.
              </p>
            </Link>

            <Link
              href="/dashboard/admin"
              className="p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/40 hover:border-rose-500/50 hover:bg-neutral-900/80 transition group block"
            >
              <div className="flex items-center justify-between text-white font-semibold text-xs mb-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  <span>Admin Center</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-rose-400 group-hover:translate-x-0.5 transition" />
              </div>
              <p className="text-[11px] text-neutral-400">
                Pusat audit escrow Midtrans & persetujuan verifikasi toko.
              </p>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-900 py-6 text-center text-xs text-neutral-600">
        &copy; {new Date().getFullYear()} Creathon Marketplace • Next.js 16 + Supabase SSR + Prisma
      </footer>
    </div>
  );
}
