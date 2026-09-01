import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden antialiased selection:bg-emerald-500 selection:text-black">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Card */}
      <div className="w-full max-w-md bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60 relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creathon Marketplace</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xs">{subtitle}</p>
        </div>

        {/* Content */}
        {children}
      </div>

      {/* Footer copyright */}
      <div className="relative z-10 mt-6 text-center text-xs text-neutral-600">
        &copy; {new Date().getFullYear()} Creathon • Sewa Busana Adat & Kreatif Indonesia
      </div>
    </div>
  );
}
