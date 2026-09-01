import {
  Plus,
  TrendingUp,
  Package,
  Calendar,
  Wallet,
  Star,
  CheckCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { buildInsightInputs, fmtRupiah, fmtPct } from "@/features/insight/services/insightInputs";
import { narrate } from "@/features/insight/services/narrator";
import { ProductCharts } from "@/components/DashboardCharts";

// --- Local Types for Insight Data ---
interface InsightFact {
  id: string;
  layer: "observation" | "interpretation" | "suggestion" | string;
  template: string;
  slots: Record<string, string>;
}

interface CategoryBreakdown {
  category?: string;
  total?: number;
}

interface ProductBreakdown {
  product?: string;
  total?: number;
  revenue?: number;
}

interface InsightInputs {
  period?: { label?: string };
  data_quality?: { status: string; transaction_count?: number };
  totals?: {
    distinct_products?: number;
    transactions?: number;
    gross_revenue?: number;
    average_order_value?: number;
    unique_buyers?: number;
  };
  comparison?: {
    available?: boolean;
    direction?: "up" | "down" | "flat";
    transactions_delta_pct?: number;
  };
  breakdown?: {
    by_category?: CategoryBreakdown[];
    by_product?: ProductBreakdown[];
  };
  facts?: InsightFact[];
  [key: string]: unknown;
}

export default async function CreatorDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let insightNarration = null;
  let insightInputs: InsightInputs | null = null;
  let storeName = "";
  let isVerified = false;
  let creatorProfileId = "";
  let actualProductCount = 0;
  let publishedProductCount = 0;

  if (user) {
    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
      include: { creatorProfile: true }
    });

    storeName = userProfile?.creatorProfile?.storeName ?? "";
    isVerified = userProfile?.creatorProfile?.isVerified ?? false;
    creatorProfileId = userProfile?.creatorProfile?.id ?? "";

    if (creatorProfileId) {
      // Query actual product counts from products table directly
      [actualProductCount, publishedProductCount] = await Promise.all([
        prisma.product.count({ where: { creatorId: creatorProfileId } }),
        prisma.product.count({ where: { creatorId: creatorProfileId, isPublished: true } }),
      ]);
    }

    if (storeName) {
      try {
        insightInputs = await buildInsightInputs(user.id, storeName);
        insightNarration = await narrate(insightInputs as Parameters<typeof narrate>[0], null);
      } catch (e) {
        console.error("Failed to generate insights:", e);
      }
    }
  }

  // Build dynamic metrics from insightInputs
  const totals = insightInputs?.totals;
  const comparison = insightInputs?.comparison;
  const breakdown = insightInputs?.breakdown;

  const metrics = {
    // Use actual product count from products table, not from transactions
    distinctProducts: actualProductCount,
    publishedProducts: publishedProductCount,
    distinctCategories: breakdown?.by_category?.length ?? 0,
    transactions: totals?.transactions ?? 0,
    trendDirection: comparison?.available ? comparison.direction : "flat",
    trendPct: comparison?.available ? fmtPct(comparison.transactions_delta_pct ?? 0) : "0",
    revenueFormatted: totals ? fmtRupiah(totals.gross_revenue ?? 0) : "Rp0",
    aovFormatted: totals ? fmtRupiah(totals.average_order_value ?? 0) : "Rp0",
    uniqueBuyers: totals?.unique_buyers ?? 0,
    repeatRatio: totals && (totals.unique_buyers ?? 0) > 0
      ? fmtPct(Math.round(((totals.transactions ?? 0) / (totals.unique_buyers ?? 1)) * 10) / 10)
      : "0",
  };


  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Main Studio Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Welcome & Action Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {storeName ? `Studio ${storeName}` : "Creator Studio"}
              </h1>
              {isVerified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Terverifikasi
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-neutral-400">
              Kelola produk, pantau transaksi, dan monitor pencairan escrow.
            </p>
          </div>

          <button className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Tambah Produk</span>
          </button>
        </div>

        {/* 4 Metric Cards — Dynamic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Produk Terdaftar</span>
              <Package className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">{metrics.distinctProducts} Produk</div>
            <p className="text-[11px] text-emerald-400">{metrics.distinctCategories} Kategori</p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Transaksi (28 Hari)</span>
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white">{metrics.transactions} Transaksi</div>
            <p className={`text-[11px] ${metrics.trendDirection === "up" ? "text-emerald-400" : metrics.trendDirection === "down" ? "text-red-400" : "text-neutral-400"}`}>
              {metrics.trendDirection === "up" ? `+${metrics.trendPct}% dari periode lalu` : metrics.trendDirection === "down" ? `${metrics.trendPct}% dari periode lalu` : "Stabil"}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Omzet Kotor (28 Hari)</span>
              <Wallet className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400">{metrics.revenueFormatted}</div>
            <p className="text-[11px] text-neutral-400">Rata-rata {metrics.aovFormatted} / transaksi</p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 space-y-2">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs font-medium">Pembeli Unik</span>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-white">{metrics.uniqueBuyers} Pembeli</div>
            <p className="text-[11px] text-neutral-400">{metrics.repeatRatio} transaksi / pembeli</p>
          </div>
        </div>

        {/* VISUALISASI DATA: Performa Produk */}
        {insightInputs?.breakdown?.by_product && (
          <ProductCharts productData={insightInputs.breakdown.by_product} />
        )}

        {/* AI Insight Section — Storytelling */}
        {insightNarration && insightInputs?.facts && (
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/5 to-neutral-900/50 overflow-hidden">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">AI Business Insight</h2>
                  <p className="text-[11px] text-neutral-400">Analisis otomatis dari data transaksimu</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                {insightInputs?.period?.label}
              </span>
            </div>

            <div className="px-6 pb-6 space-y-5">
              {/* Section 1: Ringkasan Performa (Observations) */}
              {(() => {
                const observations = (insightInputs?.facts ?? []).filter((f) => f.layer === "observation");
                if (observations.length === 0) return null;
                return (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Ringkasan Performa</span>
                    </div>
                    <div className="pl-4 border-l-2 border-emerald-500/20">
                      {observations.map((f) => {
                        const text = f.template.replace(/\{([a-z_]+)\}/g, (_: string, key: string) => f.slots[key] ?? `{${key}}`);
                        return <p key={f.id} className="text-sm text-neutral-200 leading-relaxed">{text}</p>;
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Section 2: Analisis (Interpretations) */}
              {(() => {
                const interpretations = (insightInputs?.facts ?? []).filter((f) => f.layer === "interpretation");
                if (interpretations.length === 0) return null;
                return (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">Analisis Data</span>
                    </div>
                    <div className="pl-4 border-l-2 border-blue-500/20">
                      {interpretations.map((f) => {
                        const text = f.template.replace(/\{([a-z_]+)\}/g, (_: string, key: string) => f.slots[key] ?? `{${key}}`);
                        return <p key={f.id} className="text-sm text-neutral-300 leading-relaxed">{text}</p>;
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Section 3: Rekomendasi (Suggestions) */}
              {(() => {
                const suggestions = (insightInputs?.facts ?? []).filter((f) => f.layer === "suggestion");
                if (suggestions.length === 0) return null;
                return (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">Rekomendasi</span>
                    </div>
                    <div className="pl-4 border-l-2 border-amber-500/20 space-y-2">
                      {suggestions.map((f) => {
                        const text = f.template.replace(/\{([a-z_]+)\}/g, (_: string, key: string) => f.slots[key] ?? `{${key}}`);
                        return (
                          <div key={f.id} className="flex items-start gap-2">
                            <span className="text-amber-400 mt-0.5">💡</span>
                            <p className="text-sm text-neutral-300 leading-relaxed">{text}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-neutral-900/50 border-t border-neutral-800/50 flex justify-between items-center">
              <p className="text-[10px] text-neutral-500 font-mono">
                Mode: {(insightNarration as { mode?: string })?.mode} • {insightInputs?.facts?.length ?? 0} fakta dianalisis
              </p>
              <p className="text-[10px] text-neutral-600">
                Semua angka dihitung dari data transaksi, bukan AI
              </p>
            </div>
          </div>
        )}

        {/* DATA TRANSAKSI: 5 Transaksi Terakhir */}
        <div className="p-6 rounded-2xl border border-neutral-800/80 bg-neutral-900/30 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">5 Transaksi Terakhir</h2>
            <button className="text-xs text-emerald-400 hover:underline">Lihat Semua Data</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-neutral-400 border-b border-neutral-800 text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-4">ID / Tanggal</th>
                  <th className="py-3 px-4">Produk Utama</th>
                  <th className="py-3 px-4">Metode Bayar</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Nilai Transaksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
                {/* We query the actual recent transactions here via a separate async function or just map if we fetched it */}
                <RecentTransactions storeId={user?.id ?? ""} />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

async function RecentTransactions({ storeId }: { storeId: string }) {
  if (!storeId) return null;
  
  // Safe query for recent transactions
  const prismaAny = prisma as unknown as {
    transaction?: {
      findMany: (args: unknown) => Promise<Array<{
        id: string;
        createdAt: Date;
        primaryProductName: string;
        paymentChannel?: string | null;
        grossAmount?: number;
        status: string;
      }>>;
    };
  };

  const recent = prismaAny.transaction
    ? await prismaAny.transaction.findMany({
        where: { storeId },
        orderBy: { createdAt: "desc" },
        take: 5,
      })
    : [];

  if (recent.length === 0) {
    return (
      <tr>
        <td colSpan={5} className="py-8 text-center text-neutral-500">
          Belum ada transaksi di tokomu.
        </td>
      </tr>
    );
  }

  return (
    <>
      {recent.map((trx) => (
        <tr key={trx.id} className="hover:bg-neutral-900/50 transition">
          <td className="py-3.5 px-4 text-neutral-400">
            <div className="text-[10px] text-neutral-500 font-mono mb-1">{trx.id.slice(0, 8).toUpperCase()}</div>
            {new Date(trx.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
          </td>
          <td className="py-3.5 px-4 font-medium text-white">{trx.primaryProductName}</td>
          <td className="py-3.5 px-4 text-neutral-400">{trx.paymentChannel || '-'}</td>
          <td className="py-3.5 px-4">
            <span className={`px-2 py-0.5 rounded text-[10px] border ${
              trx.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
              trx.status === 'PENDING' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
              'bg-neutral-500/10 text-neutral-400 border-neutral-500/20'
            }`}>
              {trx.status}
            </span>
          </td>
          <td className="py-3.5 px-4 font-semibold text-emerald-400 text-right">
            {fmtRupiah(trx.grossAmount || 0)}
          </td>
        </tr>
      ))}
    </>
  );
}
