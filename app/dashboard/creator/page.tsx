import Link from "next/link";
import {
  Plus,
  Package,
  Calendar,
  Wallet,
  Star,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function CreatorDashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-emerald-500 selection:text-black">
      {/* Navbar Creator */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <span>Creathon Creator Studio</span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
              Mitra Rental
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/katalog"
              className="text-xs text-neutral-400 hover:text-white transition flex items-center gap-1"
            >
              Lihat Katalog Publik <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-xs text-emerald-400">
              CR
            </div>
          </div>
        </div>
      </header>

      {/* Main Studio Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Welcome & Action Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Studio Rental Busana Anda
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" /> Terverifikasi
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400">
              Kelola stok busana adat, pantau kalender sewa, dan monitor pencairan escrow.
            </p>
          </div>

          <button className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Tambah Koleksi Pakaian</span>
          </button>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Total Koleksi Aktif</span>
              <Package className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">14 Baju</div>
            <p className="text-[11px] text-emerald-400">12 Ready • 2 Sedang Disewa</p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Pesanan Sewa Bulan Ini</span>
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white">28 Booking</div>
            <p className="text-[11px] text-neutral-400">+18% dari bulan lalu</p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Saldo Escrow Siap Tarik</span>
              <Wallet className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400">Rp 4.250.000</div>
            <p className="text-[11px] text-neutral-400">Auto payout ke rekening bank</p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Rating Kepuasan</span>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-white">4.9 / 5.0</div>
            <p className="text-[11px] text-neutral-400">Berdasarkan 46 ulasan</p>
          </div>
        </div>

        {/* Recent Rentals Table Mock */}
        <div className="p-6 rounded-2xl border border-neutral-800/80 bg-neutral-900/30 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Koleksi Busana & Status Rental</h2>
            <button className="text-xs text-emerald-400 hover:underline">Lihat Semua</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-neutral-400 border-b border-neutral-800 text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-4">Nama Busana</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Tarif / Hari</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
                <tr className="hover:bg-neutral-900/50 transition">
                  <td className="py-3.5 px-4 font-medium text-white">Baju Bodo Sutera Bugis Modern</td>
                  <td className="py-3.5 px-4 text-neutral-400">Pakaian Adat</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-400">Rp 150.000</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Tersedia
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-neutral-400 hover:text-white px-2 py-1 rounded hover:bg-neutral-800">
                      Edit
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-neutral-900/50 transition">
                  <td className="py-3.5 px-4 font-medium text-white">Beskap Solo Sutera Hitam</td>
                  <td className="py-3.5 px-4 text-neutral-400">Pakaian Adat</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-400">Rp 175.000</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Disewa (s/d 4 Sep)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-neutral-400 hover:text-white px-2 py-1 rounded hover:bg-neutral-800">
                      Edit
                    </button>
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
