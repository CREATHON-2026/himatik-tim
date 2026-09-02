"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, Heart } from "lucide-react";

interface LandingFooterProps {
  onNavigate?: (targetId: string) => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail("");
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    if (targetId.startsWith("#")) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(targetId);
      } else {
        document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative w-full border-t border-[#E7E5E4] bg-[#FAFAF9] text-[#111827] overflow-hidden select-none">
      <div className="mx-auto w-full max-w-360 px-6 md:px-14 pt-16 md:pt-24 pb-12">
        {/* Newsletter Signup Row */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 pb-14 border-b border-[#E7E5E4]">
          <div className="md:col-span-6">
            <span className="font-mono text-xs font-semibold tracking-[0.24em] uppercase text-[#6355D9]">
              Inspirasi Kado Mingguan
            </span>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111827] leading-tight">
              Dapatkan kurasi kado tematik dan cerita sanggar baru.
            </h3>
          </div>

          <div className="md:col-span-6 flex flex-col justify-end">
            {isSubscribed ? (
              <div className="flex items-center gap-2 text-sm font-mono text-emerald-800 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>Terima kasih. Kami akan mengabari kurasi kado terbaik untuk Anda.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex items-end gap-4 border-b border-[#D6D3D1] pb-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Masukkan alamat email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent font-sans text-sm sm:text-base text-[#111827] placeholder:text-[#A8A29E] focus:outline-none"
                />
                <button
                  type="submit"
                  className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#6355D9] hover:text-[#5145C6] transition-colors duration-300 cursor-pointer"
                >
                  Berlangganan
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Footer Navigation Links */}
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-12 md:gap-12">
          {/* Col 1: Brand Wordmark & Mission */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-baseline font-serif text-2xl font-bold tracking-tight text-[#111827]">
              <span>GIFTERIA</span>
              <span
                aria-hidden="true"
                className="ml-0.5 inline-block h-2 w-2 rounded-full bg-[#6355D9] align-baseline"
              />
            </div>
            <p className="mt-3 font-sans text-xs sm:text-sm text-[#78716C] leading-relaxed max-w-xs">
              Platform kurasi kado kriya personal. Menghubungkan ketulusan hati pembeli dengan ketelitian tangan sanggar independen Indonesia.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#78716C]">
              <ShieldCheck className="size-4 text-emerald-600" />
              <span>100% Escrow Protection</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <span className="font-mono text-[10px] font-bold tracking-[0.24em] uppercase text-[#A8A29E]">
              Koleksi Kado
            </span>
            <ul className="mt-3 flex flex-col gap-2 font-sans text-xs sm:text-sm text-[#44403C]">
              <li>
                <Link href="/katalog" className="hover:text-[#6355D9] transition-colors">
                  Katalog Lengkap
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="hover:text-[#6355D9] transition-colors">
                  Buket Bunga Segar
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="hover:text-[#6355D9] transition-colors">
                  Hampers Tematik
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="hover:text-[#6355D9] transition-colors">
                  Kriya Kustom
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Creator Network */}
          <div className="col-span-1 md:col-span-3">
            <span className="font-mono text-[10px] font-bold tracking-[0.24em] uppercase text-[#A8A29E]">
              Untuk Sanggar
            </span>
            <ul className="mt-3 flex flex-col gap-2 font-sans text-xs sm:text-sm text-[#44403C]">
              <li>
                <Link href="/register" className="hover:text-[#6355D9] transition-colors">
                  Daftar Sebagai Mitra
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#6355D9] transition-colors">
                  Masuk ke Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/creator/payout" className="hover:text-[#6355D9] transition-colors">
                  Sistem Penarikan Dana
                </Link>
              </li>
              <li>
                <a
                  href="#story"
                  onClick={(e) => handleLinkClick(e, "#story")}
                  className="hover:text-[#6355D9] transition-colors cursor-pointer"
                >
                  Cerita Sanggar
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div className="col-span-1 md:col-span-2">
            <span className="font-mono text-[10px] font-bold tracking-[0.24em] uppercase text-[#A8A29E]">
              Bantuan
            </span>
            <ul className="mt-3 flex flex-col gap-2 font-sans text-xs sm:text-sm text-[#44403C]">
              <li>
                <a
                  href="#inside"
                  onClick={(e) => handleLinkClick(e, "#inside")}
                  className="hover:text-[#6355D9] transition-colors cursor-pointer"
                >
                  Standar Kualitas
                </a>
              </li>
              <li>
                <span className="text-[#78716C]">Proteksi Transaksi</span>
              </li>
              <li>
                <span className="text-[#78716C]">Syarat & Ketentuan</span>
              </li>
              <li>
                <span className="text-[#78716C]">Kebijakan Privasi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Baseline Copyright */}
        <div className="mt-14 pt-6 border-t border-[#E7E5E4] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#78716C]">
          <p>© 2026 GIFTERIA. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Bangga Kriya Indonesia</span>
            <Heart className="size-3 text-[#E76F61] fill-[#E76F61]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
