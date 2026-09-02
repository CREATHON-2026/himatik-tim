"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Store, ShieldCheck, Heart } from "lucide-react";

export const DualCtaBanner: React.FC = () => {
  return (
    <div className="mt-20 md:mt-28 w-full max-w-360 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Card 1: For Gift Buyers */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-[#E7E5E4] p-8 sm:p-10 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all duration-300">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#6355D9]/5 blur-2xl"
          />

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6355D9]/10 text-[#6355D9] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Heart className="size-3.5" />
              <span>Untuk Pembeli Kado</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#111827] leading-snug">
              Ingin Mengirimkan Kado Spesial Hari Ini?
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-[#78716C] leading-relaxed">
              Jelajahi ratusan buket bunga segar, hampers tematik, dan kriya buatan tangan langsung dari sanggar terpercaya dengan proteksi pembayaran 100% Escrow.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-[#F5F5F4] flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/katalog"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6355D9] hover:bg-[#5145C6] text-white text-xs sm:text-sm font-semibold shadow-xs transition active:scale-98"
            >
              <span>Jelajahi Katalog Lengkap</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>

            <span className="text-[11px] font-mono text-[#78716C] flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span>100% Escrow Guarantee</span>
            </span>
          </div>
        </div>

        {/* Card 2: For Artisan / Sanggar Creators */}
        <div className="relative overflow-hidden rounded-3xl bg-[#FAF9F6] border border-[#E7E5E4] p-8 sm:p-10 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all duration-300">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#E76F61]/5 blur-2xl"
          />

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E76F61]/10 text-[#E76F61] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Store className="size-3.5" />
              <span>Untuk Mitra Sanggar</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#111827] leading-snug">
              Buka Sanggar Kriya Anda di Gifteria
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-[#78716C] leading-relaxed">
              Jangkau ribuan pembeli kado personal di seluruh Indonesia. Dapatkan kemudahan manajemen pesanan, pencairan saldo langsung tanpa ribet, dan ruang apresiasi karya nyata.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-[#E7E5E4] flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/register"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#D6D3D1] hover:bg-[#F5F5F4] text-[#111827] text-xs sm:text-sm font-semibold shadow-2xs transition active:scale-98"
            >
              <span>Daftar Sebagai Sanggar</span>
              <Sparkles className="size-3.5 text-[#6355D9]" />
            </Link>

            <span className="text-[11px] font-mono text-[#78716C]">
              Pendaftaran Gratis & Cepat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
