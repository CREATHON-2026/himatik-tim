import { prisma } from "@/lib/prisma";
import { Database, ShieldCheck, Zap, Server } from "lucide-react";

export default async function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-6 antialiased selection:bg-emerald-500 selection:text-black">
      <main className="w-full max-w-3xl space-y-8 text-center sm:text-left">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Setup Complete: Next.js + Supabase + Prisma
        </div>

        {/* Title & Description */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Creathon Project
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg max-w-xl">
            Proyek siap dikembangkan dengan arsitektur modern tanpa folder{" "}
            <code className="text-emerald-400 font-mono text-sm bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
              /src
            </code>
            , dilengkapi integrasi penuh Supabase SSR dan Prisma ORM.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-2 hover:border-neutral-700 transition">
            <div className="flex items-center gap-2.5 text-white font-semibold">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Prisma ORM</span>
            </div>
            <p className="text-xs text-neutral-400">
              Singleton client di <code className="text-neutral-300">lib/prisma.ts</code> dengan PgBouncer pooler connection.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-2 hover:border-neutral-700 transition">
            <div className="flex items-center gap-2.5 text-white font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Supabase SSR</span>
            </div>
            <p className="text-xs text-neutral-400">
              Browser & Server client di <code className="text-neutral-300">lib/supabase/</code> lengkap dengan Next.js auth middleware.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-2 hover:border-neutral-700 transition">
            <div className="flex items-center gap-2.5 text-white font-semibold">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>Flat Root Structure</span>
            </div>
            <p className="text-xs text-neutral-400">
              Arsitektur langsung di root (<code className="text-neutral-300">app/</code>, <code className="text-neutral-300">lib/</code>, <code className="text-neutral-300">components/</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-2 hover:border-neutral-700 transition">
            <div className="flex items-center gap-2.5 text-white font-semibold">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Tailwind CSS</span>
            </div>
            <p className="text-xs text-neutral-400">
              Modern styling system dengan helper <code className="text-neutral-300">cn()</code> di <code className="text-neutral-300">lib/utils.ts</code>.
            </p>
          </div>
        </div>

        {/* Action / Next steps */}
        <div className="pt-4 border-t border-neutral-900 text-xs text-neutral-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>Creathon Workspace • Ready for Feature Development</span>
          <span className="font-mono text-neutral-400">npm run dev</span>
        </div>
      </main>
    </div>
  );
}
