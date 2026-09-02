import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan — Gifteria",
  description:
    "Halaman yang kamu cari tidak ditemukan. Kembali menjelajah karya gift, hampers, dan kriya terbaik di Gifteria.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#FAFAF9] px-6 py-16 text-center text-[#111827]">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-1/3 h-144 w-xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EDE9FE] opacity-60 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#F5F3FF] opacity-70 blur-3xl" />
      </div>

      {/* Badge */}
      <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E7E5E4] bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#78716C]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E76F61]" />
        Gifteria
      </span>

      {/* Big 404 */}
      <h1
        className="select-none text-[7rem] font-bold leading-none tracking-tight text-[#6355D9] sm:text-[10rem]"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        404
      </h1>

      {/* Headline */}
      <h2
        className="mt-2 max-w-xl text-2xl font-semibold text-[#111827] sm:text-3xl"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        Halaman ini tidak ditemukan
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-md text-base leading-relaxed text-[#78716C]">
        Sepertinya karya yang kamu cari sudah berpindah tempat atau tautannya
        keliru. Yuk kembali menjelajah gift, hampers, dan kriya terbaik di
        Gifteria.
      </p>

      {/* Actions */}
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 min-w-45 items-center justify-center rounded-xl bg-[#6355D9] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#5145C6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6355D9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF9]"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/katalog"
          className="inline-flex h-12 min-w-45 items-center justify-center rounded-xl border border-[#E7E5E4] bg-white px-6 text-sm font-semibold text-[#292524] transition-colors duration-200 hover:bg-[#F5F5F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6355D9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF9]"
        >
          Jelajahi Katalog
        </Link>
      </div>
    </main>
  );
}
