"use client";

import Link from "next/link";
import {
  Plus,
  Gift,
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreatorDashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-6 md:p-10">
      {/* Top Header Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E7E5E4] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-xs font-semibold text-[#6355D9]">
              <Sparkles className="h-3 w-3" /> Creator Studio
            </span>
          </div>
          <h1 className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
            Ringkasan Studio Gift & Kriya
          </h1>
          <p className="mt-1 text-sm text-[#78716C]">
            Kelola katalog kado kreatif, pantau pesanan, dan kelola karya kustom Anda.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            render={<Link href="/katalog" />}
            className="border-[#E7E5E4] bg-white text-[#292524] hover:bg-[#F5F5F4]"
          >
            Katalog Publik <ArrowUpRight className="ml-1.5 h-4 w-4" />
          </Button>

          <Button
            render={<Link href="/dashboard/creator/products/new" />}
            className="bg-[#6355D9] text-white hover:bg-[#5145C6] shadow-sm"
          >
            <Plus className="mr-1.5 h-4 w-4" /> Tambah Gift Baru
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-[#78716C]">
              Total Produk Gift
            </span>
            <div className="rounded-xl bg-[#F5F3FF] p-2 text-[#6355D9]">
              <Gift className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-[#111827]">0</span>
            <span className="ml-2 text-xs text-[#78716C]">karya aktif</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-[#78716C]">
              Pesanan Masuk
            </span>
            <div className="rounded-xl bg-[#F5F3FF] p-2 text-[#6355D9]">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-[#111827]">0</span>
            <span className="ml-2 text-xs text-[#78716C]">perlu diproses</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-[#78716C]">
              Estimasi Pendapatan
            </span>
            <div className="rounded-xl bg-[#ECFDF5] p-2 text-[#10B981]">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-[#111827]">Rp 0</span>
            <span className="ml-2 text-xs text-[#10B981]">Bulan Ini</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-[#78716C]">
              Waktu Pembuatan
            </span>
            <div className="rounded-xl bg-[#FEF3C7] p-2 text-[#F59E0B]">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-[#111827]">1-2 Hari</span>
            <span className="ml-2 text-xs text-[#78716C]">rata-rata kustom</span>
          </div>
        </div>
      </div>

      {/* Quick Action & Guide Banner */}
      <div className="rounded-2xl border border-[#EDE9FE] bg-gradient-to-r from-[#F5F3FF] via-[#FAFAF9] to-white p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <h2 className="font-serif text-lg font-bold text-[#111827] sm:text-xl">
              Siap Mempublikasikan Gift Pertama Anda?
            </h2>
            <p className="max-w-2xl text-sm text-[#78716C]">
              Lengkapi informasi produk, foto kerajinan tangan terbaik, dan opsi personalisasi agar pembeli dapat memesan kado dengan mudah.
            </p>
          </div>

          <Button
            render={<Link href="/dashboard/creator/products/new" />}
            className="bg-[#6355D9] text-white hover:bg-[#5145C6] shrink-0"
          >
            <Layers className="mr-1.5 h-4 w-4" /> Buka Form Produk
          </Button>
        </div>
      </div>
    </div>
  );
}
