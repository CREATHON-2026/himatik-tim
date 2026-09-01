import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  CreditCard,
  Check,
  X,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-emerald-500 selection:text-black">
      {/* Navbar Admin */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
              <span className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span>Creathon Admin Center</span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[11px] font-semibold">
              Super Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/katalog"
              className="text-xs text-neutral-400 hover:text-white transition flex items-center gap-1"
            >
              Lihat Katalog <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <div className="w-8 h-8 rounded-full bg-rose-950/60 border border-rose-800/60 flex items-center justify-center font-bold text-xs text-rose-400">
              AD
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Pusat Kontrol Escrow & Manajemen Platform
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Monitoring arus transaksi Midtrans, persetujuan KYC mitra rental, dan pengawasan sengketa sewa.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Dana Escrow Tertampung</span>
              <CreditCard className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400">Rp 128.450.000</div>
            <p className="text-[11px] text-neutral-400">142 Transaksi aktif berjalan</p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Platform Fee Revenue (5%)</span>
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white">Rp 6.422.500</div>
            <p className="text-[11px] text-emerald-400">+24% growth bulan ini</p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Verifikasi Toko Pending</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400">4 Mitra</div>
            <p className="text-[11px] text-neutral-400">Menunggu review KYC</p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Total Pengguna Terdaftar</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">1.824 User</div>
            <p className="text-[11px] text-neutral-400">1.680 Buyer • 144 Creator</p>
          </div>
        </div>

        {/* Pending Approvals Table */}
        <div className="p-6 rounded-2xl border border-neutral-800/80 bg-neutral-900/30 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Pengajuan Mitra Toko Rental Baru</h2>
            <span className="text-xs text-amber-400 font-medium bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              4 Membutuhkan Tindakan
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-neutral-400 border-b border-neutral-800 text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-4">Nama Toko & Pemilik</th>
                  <th className="py-3 px-4">Kota</th>
                  <th className="py-3 px-4">Kontak</th>
                  <th className="py-3 px-4">Tanggal Pengajuan</th>
                  <th className="py-3 px-4 text-right">Keputusan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
                <tr className="hover:bg-neutral-900/50 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-white">Nusantara Kostum Adat</div>
                    <div className="text-[11px] text-neutral-500">Andi Saputra (andi@nusantara.id)</div>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-300">Makassar</td>
                  <td className="py-3.5 px-4 font-mono text-neutral-400">081234889900</td>
                  <td className="py-3.5 px-4 text-neutral-400">1 Sep 2026</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-semibold text-xs transition border border-emerald-500/30 flex items-center gap-1 cursor-pointer">
                        <Check className="w-3.5 h-3.5" />
                        <span>Setujui</span>
                      </button>
                      <button className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white text-xs transition border border-rose-500/30 flex items-center gap-1 cursor-pointer">
                        <X className="w-3.5 h-3.5" />
                        <span>Tolak</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
