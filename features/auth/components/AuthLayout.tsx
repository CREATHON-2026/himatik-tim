import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Heart } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#FAFAF9] text-neutral-900 flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-hidden antialiased selection:bg-indigo-500 selection:text-white">
      {/* Subtle Background Glows */}
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-indigo-200/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-purple-200/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Two-Panel Horizontal Container */}
      <div className="w-full max-w-5xl bg-white border border-neutral-200/80 rounded-3xl shadow-xl shadow-neutral-900/5 overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* LEFT PANEL: Editorial Brand Visual (Desktop) */}
        <div className="hidden lg:flex lg:col-span-5 bg-[#F5F5F7] border-r border-neutral-200/70 p-8 sm:p-10 flex-col justify-between relative overflow-hidden">
          {/* Subtle Botanical / Line-art SVG background */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 opacity-20 pointer-events-none">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M40 180C70 120 120 70 180 40M180 40C150 70 130 110 120 160M180 40C130 50 90 70 50 110"
                stroke="#6366F1"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Top Brand Header */}
          <div className="space-y-6 relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-neutral-900">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="tracking-tight font-serif text-2xl">Creatons<span className="text-indigo-600">.</span></span>
            </Link>

            {/* Editorial Serif Heading */}
            <div className="space-y-3 pt-4">
              <h2 className="text-3xl sm:text-4xl font-serif text-neutral-900 leading-[1.2] tracking-tight">
                Where ideas <br />
                become <span className="italic text-indigo-600">real.</span>
              </h2>
              <p className="text-sm text-neutral-500 leading-relaxed font-sans">
                Connect with creators and artisans who understand your creative vision and craft traditions.
              </p>
            </div>
          </div>

          {/* Middle Visual Card: Studio Showcase */}
          <div className="relative z-10 my-6 p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-3">
            {/* Visual Photography Mock with Warm Tone */}
            <div className="h-40 w-full rounded-xl bg-gradient-to-tr from-amber-100 via-rose-50 to-indigo-100 border border-neutral-100 relative overflow-hidden flex flex-col justify-between p-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-semibold text-indigo-700 shadow-xs">
                  ★ Top Rated Creator
                </span>
                <span className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-rose-500">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                </span>
              </div>
              <div className="text-[11px] font-medium text-neutral-700 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-md w-fit">
                Studio Flora • Bandung, Indonesia
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-600 pt-1">
              <div className="flex items-center gap-1 text-amber-600 font-semibold">
                <span>★ 4.9</span>
                <span className="text-neutral-400 font-normal">(120+ Proyek)</span>
              </div>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-medium text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" /> Escrow Verified
              </span>
            </div>
          </div>

          {/* Bottom Footer Quote */}
          <div className="relative z-10 text-xs text-neutral-400 border-t border-neutral-200/70 pt-4 flex items-center justify-between">
            <span>Modern Editorial Creative</span>
            <span>v1.0 • 2026</span>
          </div>
        </div>

        {/* RIGHT PANEL: Authentication Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
          <div className="w-full max-w-md mx-auto space-y-6">
            {/* Mobile Brand Bar */}
            <div className="lg:hidden flex items-center justify-between pb-2 border-b border-neutral-100">
              <Link href="/" className="inline-flex items-center gap-2 font-bold text-lg text-neutral-900 font-serif">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span>Creatons.</span>
              </Link>
              <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Sewa Busana
              </span>
            </div>

            {/* Form Title & Subtitle */}
            <div className="space-y-1.5 text-left">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500">
                {subtitle}
              </p>
            </div>

            {/* Form Content */}
            {children}
          </div>

          {/* Bottom Security Note */}
          <div className="w-full max-w-md mx-auto pt-6 text-center text-[11px] text-neutral-400 border-t border-neutral-100 mt-6">
            &copy; {new Date().getFullYear()} Creatons Platform • Dilindungi Sistem Escrow Transaksi
          </div>
        </div>

      </div>
    </div>
  );
}
