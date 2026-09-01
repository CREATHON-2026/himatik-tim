import { prisma } from "@/lib/prisma";

export const SCHEMA_VERSION = "1.1";

const MIN_TRANSACTIONS = 5;
const MIN_PREV_FOR_TREND = 5;
const COUNTED_STATUSES = ["COMPLETED", "IN_ESCROW"]; // Using Prisma Enums

const MONTHS_ID = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

const NAME_UNSAFE = /[{}\"\\\n\r]/g;

export function safeName(value: string, limit = 60): string {
  return value.replace(NAME_UNSAFE, " ").trim().substring(0, limit);
}

export function fmtInt(value: number): string {
  return Math.round(value).toLocaleString("id-ID");
}

export function fmtPct(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

export function fmtRupiah(value: number): string {
  return "Rp" + fmtInt(value);
}

export function periodLabel(start: Date, endExclusive: Date): string {
  const end = new Date(endExclusive.getTime() - 24 * 60 * 60 * 1000);
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${start.getDate()}–${end.getDate()} ${MONTHS_ID[end.getMonth()]} ${end.getFullYear()}`;
  }
  return `${start.getDate()} ${MONTHS_ID[start.getMonth()]} – ${end.getDate()} ${MONTHS_ID[end.getMonth()]} ${end.getFullYear()}`;
}

export interface Fact {
  id: string;
  layer: "observation" | "interpretation" | "suggestion";
  template: string;
  slots: Record<string, string>;
}

type InsightPayloadAny = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

function buildFacts(payload: InsightPayloadAny): Fact[] {
  const totals = payload.totals;
  const categories = payload.breakdown?.by_category;
  const products = payload.breakdown?.by_product;
  const channels = payload.breakdown?.by_channel;
  
  if (!categories || categories.length === 0) return [];
  
  const top = categories[0] as Record<string, string | number>;
  const tied = categories
    .filter((c: Record<string, string | number>) => c.transactions === top.transactions)
    .map((c: Record<string, string | number>) => String(c.name));

  const facts: Fact[] = [];

  // ═══════════════════════════════════════════════════════════════════
  // LAYER: OBSERVATION — apa yang terjadi (fakta murni)
  // ═══════════════════════════════════════════════════════════════════

  facts.push({
    id: "period_volume",
    layer: "observation",
    template: "Dalam {days} hari terakhir ({periode}), tokomu mencatat {trx} transaksi terbayar dengan total omzet {rev}.",
    slots: {
      days: String(payload.period.days),
      trx: fmtInt(totals.transactions),
      periode: payload.period.label,
      rev: fmtRupiah(totals.gross_revenue),
    },
  });

  facts.push({
    id: "revenue_aov",
    layer: "observation",
    template: "Rata-rata nilai per transaksi adalah {aov}, dengan {buyers} pembeli unik.",
    slots: {
      aov: fmtRupiah(totals.average_order_value),
      buyers: fmtInt(totals.unique_buyers),
    },
  });

  if (tied.length === 1) {
    facts.push({
      id: "top_category",
      layer: "observation",
      template: "Kategori {cat} memimpin dengan {cat_trx} transaksi ({cat_share} dari total).",
      slots: { cat: safeName(String(top.name)), cat_trx: fmtInt(Number(top.transactions)), cat_share: fmtPct(Number(top.share_pct)) + "%" },
    });
  } else {
    facts.push({
      id: "top_category_tie",
      layer: "observation",
      template: "{cat_list} sama-sama memimpin dengan masing-masing {cat_trx} transaksi.",
      slots: { cat_list: tied.map(safeName).join(" dan "), cat_trx: fmtInt(Number(top.transactions)) },
    });
  }

  // Top produk
  if (products && products.length > 0) {
    const topProd = products[0] as Record<string, string | number>;
    facts.push({
      id: "top_product",
      layer: "observation",
      template: "Produk paling laris adalah {prod}, terjual {prod_trx} kali dengan pendapatan {prod_rev}.",
      slots: {
        prod: safeName(String(topProd.name)),
        prod_trx: fmtInt(Number(topProd.transactions)),
        prod_rev: fmtRupiah(Number(topProd.revenue)),
      },
    });
  }

  // Channel utama
  if (channels && channels.length > 0) {
    const topCh = channels[0] as Record<string, string | number>;
    facts.push({
      id: "top_channel",
      layer: "observation",
      template: "Kanal penjualan terbesar adalah {channel} dengan {ch_trx} transaksi ({ch_share} dari total).",
      slots: {
        channel: safeName(String(topCh.name)),
        ch_trx: fmtInt(Number(topCh.transactions)),
        ch_share: fmtPct(Number(topCh.share_pct)) + "%",
      },
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // LAYER: INTERPRETATION — apa artinya (analisis data analyst)
  // ═══════════════════════════════════════════════════════════════════

  const comparison = payload.comparison;
  if (comparison.available && comparison.direction !== "flat") {
    const arah = comparison.direction === "up" ? "naik" : "turun";
    const emosi = comparison.direction === "up" ? "Momentum positif" : "Ada perlambatan";
    facts.push({
      id: "trend_vs_previous",
      layer: "interpretation",
      template: "{emosi}: volume transaksi {arah} {delta_pct} dibanding {days} hari sebelumnya (dari {prev_trx} menjadi {cur_trx} transaksi).",
      slots: {
        emosi,
        arah,
        days: String(payload.period.days),
        prev_trx: fmtInt(comparison.previous_transactions),
        cur_trx: fmtInt(totals.transactions),
        delta_pct: fmtPct(comparison.transactions_delta_pct) + "%",
      }
    });
  }

  // Konsentrasi kategori — risiko ketergantungan
  if (Number(top.share_pct) >= 60 && categories.length > 1) {
    facts.push({
      id: "concentration_risk",
      layer: "interpretation",
      template: "Perlu dicatat: {cat} menyumbang {cat_share} dari seluruh transaksi. Ini berarti tokomu sangat bergantung pada satu kategori saja.",
      slots: { cat: safeName(String(top.name)), cat_share: fmtPct(Number(top.share_pct)) + "%" },
    });
  }

  // AOV benchmark (apakah tinggi atau rendah relatif terhadap produk)
  if (products && products.length >= 2) {
    const p0 = products[0] as Record<string, string | number>;
    const p1 = products[1] as Record<string, string | number>;
    const topProdRev = Number(p0.revenue) / Number(p0.transactions);
    const secondProdRev = Number(p1.revenue) / Number(p1.transactions);
    if (topProdRev > secondProdRev * 1.5) {
      facts.push({
        id: "aov_gap",
        layer: "interpretation",
        template: "Produk {prod_top} memiliki nilai per transaksi ({aov_top}) yang jauh lebih tinggi dari {prod_second} ({aov_second}). Ini menunjukkan potensi segmen premium.",
        slots: {
          prod_top: safeName(String(p0.name)),
          aov_top: fmtRupiah(Math.round(topProdRev)),
          prod_second: safeName(String(p1.name)),
          aov_second: fmtRupiah(Math.round(secondProdRev)),
        },
      });
    }
  }

  // Buyer-to-transaction ratio
  if (totals.unique_buyers > 0 && totals.transactions / totals.unique_buyers >= 1.5) {
    const ratio = Math.round((totals.transactions / totals.unique_buyers) * 10) / 10;
    facts.push({
      id: "repeat_buyer_signal",
      layer: "interpretation",
      template: "Rata-rata setiap pembeli bertransaksi {ratio} kali. Ini mengindikasikan ada potensi repeat buyer yang cukup baik di tokomu.",
      slots: { ratio: fmtPct(ratio) },
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // LAYER: SUGGESTION — apa yang sebaiknya dilakukan (saran berbasis data)
  // ═══════════════════════════════════════════════════════════════════

  // Suggestion: diversifikasi jika konsentrasi tinggi
  if (Number(top.share_pct) >= 60 && categories.length > 1) {
    const weakest = categories[categories.length - 1] as Record<string, string | number>;
    facts.push({
      id: "suggest_diversify",
      layer: "suggestion",
      template: "Pertimbangkan untuk mendorong kategori {weak_cat} (saat ini hanya {weak_trx} transaksi) melalui promo bundling atau penempatan di halaman utama, agar risiko ketergantungan pada {top_cat} berkurang.",
      slots: {
        weak_cat: safeName(String(weakest.name)),
        weak_trx: fmtInt(Number(weakest.transactions)),
        top_cat: safeName(String(top.name)),
      },
    });
  }

  // Suggestion: dorong kanal yang belum dioptimalkan
  if (channels && channels.length >= 2) {
    const weakCh = channels[channels.length - 1];
    if (weakCh.share_pct < 15) {
      facts.push({
        id: "suggest_channel",
        layer: "suggestion",
        template: "Kanal {weak_channel} baru menyumbang {weak_share} transaksi. Coba maksimalkan dengan menambahkan link toko di bio atau story untuk memperluas jangkauan.",
        slots: {
          weak_channel: safeName(weakCh.name),
          weak_share: fmtInt(weakCh.transactions),
        },
      });
    }
  }

  // Suggestion: momentum pertumbuhan
  if (comparison.available && comparison.direction === "up" && comparison.transactions_delta_pct > 20) {
    facts.push({
      id: "suggest_momentum",
      layer: "suggestion",
      template: "Pertumbuhan {delta_pct} adalah sinyal positif. Manfaatkan momentum ini dengan menambah stok pada produk {top_prod} yang sedang diminati, dan pertimbangkan untuk menaikkan exposure melalui katalog atau share link.",
      slots: {
        delta_pct: fmtPct(comparison.transactions_delta_pct) + "%",
        top_prod: products && products.length > 0 ? safeName(String((products[0] as Record<string, string | number>).name)) : safeName(String(top.name)),
      },
    });
  }

  // Suggestion: perlambatan
  if (comparison.available && comparison.direction === "down") {
    facts.push({
      id: "suggest_slowdown",
      layer: "suggestion",
      template: "Penurunan {delta_pct} perlu diantisipasi. Periksa apakah ada produk yang stoknya habis atau kanal promosi yang kurang aktif dalam {days} hari terakhir.",
      slots: {
        delta_pct: fmtPct(comparison.transactions_delta_pct) + "%",
        days: String(payload.period.days),
      },
    });
  }

  // Suggestion: AOV tinggi — dorong upselling
  if (totals.average_order_value >= 200000) {
    facts.push({
      id: "suggest_upsell",
      layer: "suggestion",
      template: "Dengan rata-rata transaksi {aov}, pembelimu termasuk segmen yang willing to pay. Coba tawarkan add-on seperti kartu ucapan atau packaging premium untuk menaikkan nilai keranjang.",
      slots: { aov: fmtRupiah(totals.average_order_value) },
    });
  }

  return facts;
}

export async function buildInsightInputs(storeId: string, storeName: string) {
  // Gunakan UTC dan window 28 hari (P0-4)
  const now = new Date();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const end = today; 
  const start = new Date(end.getTime() - 28 * 24 * 60 * 60 * 1000); // 28 days back
  const previousStart = new Date(start.getTime() - 28 * 24 * 60 * 60 * 1000); // previous 28 days
  const days = 28;

  // Layer 2: Revised grouping sets raw query
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawRows = await (prisma.$queryRaw as any)`
    with rows_ as (
      select
        case when t."createdAt" >= ${start} then 'current' else 'previous' end as period,
        t."primaryCategory" as category, 
        t."paymentChannel" as channel, 
        t."primaryProductName" as product_name, 
        t."buyerId" as buyer_id, 
        t."grossAmount" as gross_amount
      from "Transaction" t
      where t."storeId" = ${storeId}
        and t.status in ('COMPLETED', 'IN_ESCROW')
        and t."createdAt" >= ${previousStart}
        and t."createdAt" < ${end}
    )
    select
      period,
      case
        when grouping(category) = 0 then 'category'
        when grouping(channel) = 0 then 'channel'
        when grouping(product_name) = 0 then 'product'
        else 'total'
      end as dimension,
      coalesce(category, channel, product_name) as name,
      count(*)::int as transactions,
      sum(gross_amount)::int as revenue,
      count(distinct buyer_id)::int as unique_buyers
    from rows_
    group by grouping sets (
      (period), (period, category), (period, channel), (period, product_name)
    )
    order by period, dimension, transactions desc, name;
  `;

  // Parse raw grouping sets
  const currentTotalRow = rawRows.find((r: Record<string, unknown>) => r.period === 'current' && r.dimension === 'total');
  const previousTotalRow = rawRows.find((r: Record<string, unknown>) => r.period === 'previous' && r.dimension === 'total');
  
  const currentTotal = currentTotalRow ? Number(currentTotalRow.transactions) : 0;
  const previousTotal = previousTotalRow ? Number(previousTotalRow.transactions) : 0;

  const payload: InsightPayloadAny = {
    schema_version: SCHEMA_VERSION,
    creator: { creator_id: storeId, store_name: storeName },
    period: {
      start: start.toISOString(),
      end: new Date(end.getTime() - 1).toISOString(),
      days,
      label: periodLabel(start, end),
    },
    data_quality: {
      status: "ok",
      transaction_count: currentTotal as number,
      min_required: MIN_TRANSACTIONS,
      counted_statuses: COUNTED_STATUSES,
      notes: [],
    },
    totals: null,
    breakdown: null,
    comparison: { available: false, reason: "not_evaluated" },
    facts: [],
  };

  // Gerbang data terlalu sedikit
  if (currentTotal < MIN_TRANSACTIONS) {
    payload.data_quality.status = "insufficient_data";
    payload.data_quality.notes.push(`Transaksi terbayar hanya ${currentTotal}; minimum ${MIN_TRANSACTIONS} untuk membuat insight.`);
    return payload;
  }

  // Populate Breakdowns
  const buildBreakdown = (dimensionName: string, limit?: number) => {
    let rows = rawRows.filter((r: Record<string, unknown>) => r.period === 'current' && r.dimension === dimensionName);
    if (limit) rows = rows.slice(0, limit);
    return rows.map((r: Record<string, unknown>) => ({
      name: String(r.name ?? ""),
      transactions: Number(r.transactions ?? 0),
      share_pct: Math.round((Number(r.transactions ?? 0) * 100.0 / (currentTotal || 1)) * 10) / 10,
      revenue: Number(r.revenue ?? 0)
    }));
  };

  payload.totals = {
    transactions: currentTotal,
    gross_revenue: Number(currentTotalRow?.revenue ?? 0),
    average_order_value: Math.round(Number(currentTotalRow?.revenue ?? 0) / currentTotal),
    unique_buyers: Number(currentTotalRow?.unique_buyers ?? 0),
    distinct_products: rawRows.filter((r: Record<string, unknown>) => r.period === 'current' && r.dimension === 'product').length
  };

  payload.breakdown = {
    by_category: buildBreakdown('category'),
    by_product: buildBreakdown('product', 5),
    by_channel: buildBreakdown('channel')
  };

  // Cek gate umur toko (disimplifikasi jika previousTotal cukup)
  if (previousTotal >= MIN_PREV_FOR_TREND) {
    const delta = currentTotal - previousTotal;
    payload.comparison = {
      available: true,
      previous_transactions: previousTotal,
      transactions_delta: Math.abs(delta),
      transactions_delta_pct: Math.abs(Math.round((delta * 100.0 / previousTotal) * 10) / 10),
      direction: delta > 0 ? "up" : (delta < 0 ? "down" : "flat")
    };
  } else {
    payload.comparison = { available: false, reason: "previous_period_too_small" }; // Gate umur toko diabaikan dalam skenario simplifikasi ini namun bisa diubah
  }

  payload.facts = buildFacts(payload);
  
  return payload;
}
