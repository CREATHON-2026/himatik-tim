"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  RotateCcw,
  TrendingUp,
  Package,
  Wallet,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Copy,
  Check,
  X,
  CheckCircle2,
  Clock,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import rawTransactions from "@/data/transactions.json";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RawTrx {
  transaction_id: string;
  creator_id?: string;
  buyer_id: string;
  product_id: string;
  product_name: string;
  category: string;
  quantity: number;
  unit_price: number;
  gross_amount: number;
  status: string;
  channel: string;
  created_at: string;
}

interface Trx {
  id: string;
  buyerId: string;
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  unitPrice: number;
  grossAmount: number;
  platformFee: number;
  netAmount: number;
  status: string;
  channel: string;
  createdAt: string;
}

interface ProductStat {
  productName: string;
  category: string;
  unitPrice: number;
  totalTrx: number;
  totalUnits: number;
  uniqueBuyers: number;
  grossRevenue: number;
  netRevenue: number;
  sharePct: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(amount: number) {
  return "Rp" + Math.round(amount).toLocaleString("id-ID");
}

function channelLabel(ch: string) {
  const map: Record<string, string> = {
    katalog: "Katalog",
    share_link: "Share Link",
    instagram_bio: "Instagram Bio",
    whatsapp: "WhatsApp",
  };
  return map[ch] ?? ch;
}

function statusBadge(status: string) {
  if (status === "COMPLETED")
    return {
      cls: "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]",
      icon: <CheckCircle2 className="w-3 h-3" />,
      label: "Selesai",
    };
  if (status === "PAID_ESCROW" || status === "IN_ESCROW" || status === "PROCESSING")
    return {
      cls: "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
      icon: <ShieldCheck className="w-3 h-3" />,
      label: "Diproses",
    };
  if (status === "CANCELLED" || status === "REFUNDED")
    return {
      cls: "bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]",
      icon: <XCircle className="w-3 h-3" />,
      label: status === "REFUNDED" ? "Refund" : "Dibatalkan",
    };
  return {
    cls: "bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]",
    icon: <Clock className="w-3 h-3" />,
    label: "Menunggu Pembayaran",
  };
}

// ─── Parse JSON once ──────────────────────────────────────────────────────────

const ALL_TRX: Trx[] = (rawTransactions as RawTrx[]).map((t) => {
  const gross = t.gross_amount;
  const fee = Math.round(gross * 0.05);
  return {
    id: t.transaction_id,
    buyerId: t.buyer_id,
    productId: t.product_id,
    productName: t.product_name,
    category: t.category,
    quantity: t.quantity ?? 1,
    unitPrice: t.unit_price,
    grossAmount: gross,
    platformFee: fee,
    netAmount: gross - fee,
    status: t.status,
    channel: t.channel,
    createdAt: t.created_at,
  };
});

function calcProductStats(trxList: Trx[]): ProductStat[] {
  const totalRevenue = trxList
    .filter((t) => t.status === "COMPLETED" || t.status === "PAID_ESCROW")
    .reduce((s, t) => s + t.grossAmount, 0);

  const map = new Map<string, { buyers: Set<string>; units: number; gross: number; net: number; count: number; unitPrice: number; category: string }>();

  trxList.forEach((t) => {
    const key = t.productName;
    if (!map.has(key)) map.set(key, { buyers: new Set(), units: 0, gross: 0, net: 0, count: 0, unitPrice: t.unitPrice, category: t.category });
    const entry = map.get(key)!;
    entry.count++;
    entry.buyers.add(t.buyerId);
    if (t.status === "COMPLETED" || t.status === "PAID_ESCROW") {
      entry.units += t.quantity;
      entry.gross += t.grossAmount;
      entry.net += t.netAmount;
    }
  });

  return Array.from(map.entries())
    .map(([name, v]) => ({
      productName: name,
      category: v.category,
      unitPrice: v.unitPrice,
      totalTrx: v.count,
      totalUnits: v.units,
      uniqueBuyers: v.buyers.size,
      grossRevenue: v.gross,
      netRevenue: v.net,
      sharePct: totalRevenue > 0 ? Math.round((v.gross / totalRevenue) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.grossRevenue - a.grossRevenue);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function RecentTransactionsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [receipt, setReceipt] = useState<Trx | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // filter + sort state
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [productFilter, setProductFilter] = useState("ALL");
  const [sort, setSort] = useState<"date_desc" | "date_asc" | "amt_desc" | "amt_asc">("date_desc");

  // pagination
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  // active tab in stats panel
  const [tab, setTab] = useState<"products" | "channels">("products");

  // ── Derived data ─────────────────────────────────────────────────────────

  const recentFive = useMemo(
    () => [...ALL_TRX].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
    []
  );

  const productStats = useMemo(() => calcProductStats(ALL_TRX), []);

  const channelStats = useMemo(() => {
    const total = ALL_TRX.filter((t) => t.status === "COMPLETED" || t.status === "PAID_ESCROW").reduce((s, t) => s + t.grossAmount, 0);
    const map = new Map<string, { count: number; gross: number }>();
    ALL_TRX.forEach((t) => {
      if (!map.has(t.channel)) map.set(t.channel, { count: 0, gross: 0 });
      const e = map.get(t.channel)!;
      e.count++;
      if (t.status === "COMPLETED" || t.status === "PAID_ESCROW") e.gross += t.grossAmount;
    });
    return Array.from(map.entries())
      .map(([ch, v]) => ({ ch, label: channelLabel(ch), count: v.count, gross: v.gross, pct: total > 0 ? Math.round((v.gross / total) * 1000) / 10 : 0 }))
      .sort((a, b) => b.gross - a.gross);
  }, []);

  const totalGross = useMemo(
    () => ALL_TRX.filter((t) => t.status === "COMPLETED" || t.status === "PAID_ESCROW").reduce((s, t) => s + t.grossAmount, 0),
    []
  );
  const totalNet = useMemo(
    () => ALL_TRX.filter((t) => t.status === "COMPLETED" || t.status === "PAID_ESCROW").reduce((s, t) => s + t.netAmount, 0),
    []
  );
  const uniqueBuyers = useMemo(() => new Set(ALL_TRX.map((t) => t.buyerId)).size, []);
  const completedCount = useMemo(() => ALL_TRX.filter((t) => t.status === "COMPLETED" || t.status === "PAID_ESCROW").length, []);
  const productOptions = useMemo(() => [...new Set(ALL_TRX.map((t) => t.productName))], []);

  const filtered = useMemo(() => {
    return ALL_TRX.filter((t) => {
      if (query) {
        const q = query.toLowerCase();
        if (
          !t.id.toLowerCase().includes(q) &&
          !t.productName.toLowerCase().includes(q) &&
          !t.buyerId.toLowerCase().includes(q) &&
          !t.category.toLowerCase().includes(q)
        )
          return false;
      }
      if (statusFilter !== "ALL") {
        if (statusFilter === "COMPLETED" && t.status !== "COMPLETED") return false;
        if (statusFilter === "ESCROW" && t.status !== "PAID_ESCROW" && t.status !== "IN_ESCROW") return false;
        if (statusFilter === "PENDING" && t.status !== "PENDING" && t.status !== "PENDING_PAYMENT") return false;
        if (statusFilter === "CANCELLED" && t.status !== "CANCELLED" && t.status !== "REFUNDED") return false;
      }
      if (productFilter !== "ALL" && t.productName !== productFilter) return false;
      return true;
    }).sort((a, b) => {
      if (sort === "date_desc") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sort === "date_asc") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sort === "amt_desc") return b.grossAmount - a.grossAmount;
      return a.grossAmount - b.grossAmount;
    });
  }, [query, statusFilter, productFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  
  // reset page on filter change during render
  const filterKey = `${query}-${statusFilter}-${productFilter}-${sort}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
  }

  // ── Handlers ─────────────────────────────────────────────────────────────

  function copyId(id: string, e?: React.MouseEvent) {
    e?.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function resetFilters() {
    setQuery("");
    setStatusFilter("ALL");
    setProductFilter("ALL");
    setSort("date_desc");
  }

  function exportCSV() {
    const headers = ["ID Transaksi", "Tanggal", "Produk", "Kategori", "Qty", "Harga Satuan", "Bruto", "Fee Platform (5%)", "Net Omzet", "Status", "Kanal"];
    const rows = filtered.map((t) => [
      t.id,
      new Date(t.createdAt).toLocaleString("id-ID"),
      t.productName,
      t.category,
      t.quantity,
      t.unitPrice,
      t.grossAmount,
      t.platformFee,
      t.netAmount,
      t.status,
      channelLabel(t.channel),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    a.download = `transaksi_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  const activeFilters = (query ? 1 : 0) + (statusFilter !== "ALL" ? 1 : 0) + (productFilter !== "ALL" ? 1 : 0);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Pesanan Terbaru Card (Aliged with ringkasan-page.png) ─────────── */}
      <div className="p-6 rounded-2xl border border-[#E7E5E4] bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-base text-[#111827]">Pesanan Terbaru</h3>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#EDE9FE] text-[#6355D9] border border-[#DDD6FE] font-medium">
              {ALL_TRX.length} Total
            </span>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="text-xs text-[#6355D9] hover:text-[#5145C6] inline-flex items-center gap-1 font-medium hover:underline transition-colors cursor-pointer"
          >
            Lihat Semua
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[#78716C] border-b border-[#F5F5F4] text-[11px] font-medium">
              <tr>
                <th className="py-2.5 px-3 font-medium">Produk</th>
                <th className="py-2.5 px-3 font-medium">Pembeli</th>
                <th className="py-2.5 px-3 font-medium">Tanggal</th>
                <th className="py-2.5 px-3 font-medium">Total</th>
                <th className="py-2.5 px-3 font-medium">Status</th>
                <th className="py-2.5 px-2 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F4] text-[#111827]">
              {recentFive.map((trx) => {
                const badge = statusBadge(trx.status);
                return (
                  <tr
                    key={trx.id}
                    onClick={() => { setReceipt(trx); setModalOpen(true); }}
                    className="hover:bg-[#FAFAF9] transition cursor-pointer group"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <div className="size-9 rounded-lg bg-[#F5F5F4] border border-[#E7E5E4] overflow-hidden shrink-0 relative">
                          <img
                            src="/aset/bglogin.png"
                            alt={trx.productName}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-medium text-xs text-[#111827] block truncate max-w-xs group-hover:text-[#6355D9] transition-colors">
                            {trx.productName}
                          </span>
                          <span className="text-[10px] text-[#A8A29E] font-mono block">
                            #{trx.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-xs text-[#44403C] whitespace-nowrap">
                      {trx.buyerId.startsWith("usr_") ? (trx.buyerId === "usr_101" ? "Dewi Lestari" : trx.buyerId === "usr_102" ? "Budi Santoso" : "Rina Putri") : trx.buyerId}
                    </td>
                    <td className="py-3 px-3 text-xs text-[#78716C] whitespace-nowrap">
                      {new Date(trx.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="py-3 px-3 font-medium text-xs text-[#111827] tabular-nums whitespace-nowrap">
                      {fmt(trx.grossAmount)}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${badge.cls}`}>
                        {badge.icon}{badge.label}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setReceipt(trx); setModalOpen(true); }}
                        className="p-1 rounded-lg text-[#A8A29E] hover:text-[#111827] hover:bg-[#F5F5F4] transition cursor-pointer"
                        title="Detail Transaksi"
                      >
                        <Eye className="size-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MODAL OVERLAY ──────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto"
          onClick={() => { setModalOpen(false); setReceipt(null); }}
        >
          <div
            className="relative w-full max-w-6xl my-4 bg-white rounded-2xl shadow-2xl text-[#111827] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E5E4] bg-white rounded-t-2xl sticky top-0 z-10">
              <div>
                <h2 className="font-bold text-lg text-[#111827]">Daftar Transaksi & Statistik Produk</h2>
                <p className="text-xs text-[#78716C] mt-0.5">Data otomatis dari <code className="bg-[#F5F5F4] px-1 rounded">data/transactions.json</code> · {ALL_TRX.length} total transaksi</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={exportCSV}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E7E5E4] text-xs font-semibold text-[#111827] hover:border-violet-400 hover:text-violet-700 hover:bg-violet-50 transition inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Ekspor CSV
                </button>
                <button
                  onClick={() => { setModalOpen(false); setReceipt(null); }}
                  className="p-2 rounded-xl text-[#78716C] hover:bg-[#F5F5F4] hover:text-[#111827] transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">

              {/* ── Struk Detail (jika ada transaksi yang dipilih) ──────── */}
              {receipt && (
                <div className="p-4 rounded-2xl border-2 border-violet-200 bg-violet-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-violet-700 uppercase tracking-wider">Struk Transaksi #{receipt.id}</span>
                    <button onClick={() => setReceipt(null)} className="text-xs text-[#78716C] hover:text-[#111827] underline">Tutup struk</button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1.5">
                      <div className="flex justify-between"><span className="text-[#78716C]">Produk:</span><span className="font-semibold">{receipt.productName}</span></div>
                      <div className="flex justify-between"><span className="text-[#78716C]">Kategori:</span><span>{receipt.category}</span></div>
                      <div className="flex justify-between"><span className="text-[#78716C]">Jumlah:</span><span>{receipt.quantity} pcs</span></div>
                      <div className="flex justify-between"><span className="text-[#78716C]">Kanal:</span><span>{channelLabel(receipt.channel)}</span></div>
                      <div className="flex justify-between"><span className="text-[#78716C]">ID Pembeli:</span><span className="font-mono">{receipt.buyerId}</span></div>
                      <div className="flex justify-between"><span className="text-[#78716C]">Waktu:</span><span>{new Date(receipt.createdAt).toLocaleString("id-ID")}</span></div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-violet-200 space-y-1.5">
                      <div className="flex justify-between text-xs"><span className="text-[#78716C]">Bruto ({receipt.quantity} × {fmt(receipt.unitPrice)})</span><span className="font-medium">{fmt(receipt.grossAmount)}</span></div>
                      <div className="flex justify-between text-xs text-rose-600"><span>Fee Platform (5%)</span><span>- {fmt(receipt.platformFee)}</span></div>
                      <div className="flex justify-between text-sm font-bold border-t border-violet-100 pt-1.5 mt-1">
                        <span>Net Omzet Kreator</span>
                        <span className="text-emerald-600">{receipt.status === "CANCELLED" ? "Rp0" : fmt(receipt.netAmount)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── KPI Summary Cards ─────────────────────────────────── */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: <Wallet className="w-4 h-4" />, label: "Total Omzet Bruto", value: fmt(totalGross), sub: `Net: ${fmt(totalNet)}`, color: "emerald" },
                  { icon: <Package className="w-4 h-4" />, label: "Total Transaksi", value: `${ALL_TRX.length} Order`, sub: `${completedCount} berhasil`, color: "violet" },
                  { icon: <TrendingUp className="w-4 h-4" />, label: "Produk Terdaftar", value: `${productStats.length} Produk`, sub: `${productOptions.length} varian`, color: "blue" },
                  { icon: <Users className="w-4 h-4" />, label: "Pembeli Unik", value: `${uniqueBuyers} Orang`, sub: `AOV: ${fmt(completedCount > 0 ? totalGross / completedCount : 0)}`, color: "purple" },
                ].map((kpi) => (
                  <div key={kpi.label} className="p-4 rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] space-y-1.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-${kpi.color}-50 text-${kpi.color}-600 border border-${kpi.color}-100`}>
                      {kpi.icon}
                    </div>
                    <div className="text-[10px] text-[#78716C]">{kpi.label}</div>
                    <div className="text-base font-bold text-[#111827]">{kpi.value}</div>
                    <div className="text-[10px] text-[#78716C]">{kpi.sub}</div>
                  </div>
                ))}
              </div>

              {/* ── Statistik Produk & Kanal ─────────────────────────── */}
              <div className="rounded-2xl border border-[#E7E5E4] bg-white overflow-hidden">
                {/* Tab Bar */}
                <div className="flex items-center gap-1 p-3 border-b border-[#E7E5E4] bg-[#FAFAF9]">
                  <span className="text-xs font-bold text-[#111827] mr-2">Statistik:</span>
                  {[
                    { key: "products" as const, label: `Produk Terlaris (${productStats.length})` },
                    { key: "channels" as const, label: `Kanal Penjualan (${channelStats.length})` },
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        tab === t.key ? "bg-violet-600 text-white shadow-sm" : "bg-white border border-[#E7E5E4] text-[#78716C] hover:text-[#111827]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Products Tab */}
                {tab === "products" && (
                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {productStats.map((p, idx) => {
                      const medals = ["🥇 #1 Terlaris", "🥈 Peringkat #2", "🥉 Peringkat #3"];
                      const medalCls = [
                        "bg-amber-50 text-amber-800 border-amber-200",
                        "bg-slate-100 text-slate-700 border-slate-200",
                        "bg-orange-50 text-orange-800 border-orange-200",
                      ];
                      return (
                        <div key={p.productName} className="p-4 rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] space-y-3 hover:bg-white hover:border-violet-200 transition">
                          <div className="flex items-start justify-between gap-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${medalCls[idx] ?? "bg-[#F5F5F4] text-[#78716C] border-[#E7E5E4]"}`}>
                              {medals[idx] ?? `#${idx + 1}`}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 font-medium">{p.category}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-[#111827]">{p.productName}</h4>
                            <p className="text-[10px] text-[#78716C]">{fmt(p.unitPrice)} / unit</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-[#78716C]">Omzet Bruto</span>
                              <span className="font-bold text-emerald-600">{fmt(p.grossRevenue)}</span>
                            </div>
                            <div className="w-full bg-[#E7E5E4] rounded-full h-1.5">
                              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, Math.max(4, p.sharePct))}%` }} />
                            </div>
                            <div className="flex justify-between text-[10px] text-[#78716C]">
                              <span>Pangsa omzet</span>
                              <span className="font-semibold text-[#111827]">{p.sharePct}%</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 text-center text-[10px] p-2 rounded-lg bg-white border border-[#E7E5E4]">
                            <div><div className="text-[#78716C]">Transaksi</div><div className="font-bold text-[#111827]">{p.totalTrx}</div></div>
                            <div><div className="text-[#78716C]">Unit</div><div className="font-bold text-blue-600">{p.totalUnits}</div></div>
                            <div><div className="text-[#78716C]">Pembeli</div><div className="font-bold text-purple-600">{p.uniqueBuyers}</div></div>
                          </div>
                          <button
                            onClick={() => { setProductFilter(p.productName); setTab("products"); }}
                            className="w-full py-1 text-[11px] font-semibold text-violet-600 border border-[#E7E5E4] rounded-lg hover:bg-violet-50 hover:border-violet-200 transition"
                          >
                            Filter transaksi produk ini
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Channels Tab */}
                {tab === "channels" && (
                  <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {channelStats.map((c) => (
                      <div key={c.ch} className="p-3.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] space-y-1.5">
                        <div className="text-xs font-bold text-[#111827]">{c.label}</div>
                        <div className="text-base font-bold text-emerald-600">{fmt(c.gross)}</div>
                        <div className="flex justify-between text-[10px] text-[#78716C]">
                          <span>{c.count} Transaksi</span>
                          <span className="font-bold text-[#111827]">{c.pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Filter & Search Bar ───────────────────────────────── */}
              <div className="p-4 rounded-2xl border border-[#E7E5E4] bg-white space-y-3">
                {/* Row 1: search + status pills */}
                <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                    <input
                      type="text"
                      placeholder="Cari ID, produk, pembeli, atau kategori…"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] text-xs text-[#111827] placeholder-[#A8A29E] focus:outline-none focus:border-violet-400 transition"
                    />
                    {query && (
                      <button onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#111827]">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0">
                    {[
                      { id: "ALL", label: "Semua" },
                      { id: "COMPLETED", label: "Selesai" },
                      { id: "ESCROW", label: "Escrow" },
                      { id: "PENDING", label: "Pending" },
                      { id: "CANCELLED", label: "Batal" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setStatusFilter(s.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                          statusFilter === s.id ? "bg-violet-600 text-white" : "bg-[#F5F5F4] text-[#78716C] hover:bg-[#E7E5E4]"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 2: dropdowns + reset */}
                <div className="flex flex-wrap gap-2 items-center border-t border-[#F5F5F4] pt-3">
                  <select
                    value={productFilter}
                    onChange={(e) => setProductFilter(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] text-xs text-[#111827] focus:outline-none focus:border-violet-400"
                  >
                    <option value="ALL">Semua Produk ({productOptions.length})</option>
                    {productOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>

                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as typeof sort)}
                    className="px-2.5 py-1.5 rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] text-xs text-[#111827] focus:outline-none focus:border-violet-400"
                  >
                    <option value="date_desc">Tanggal Terbaru</option>
                    <option value="date_asc">Tanggal Terlama</option>
                    <option value="amt_desc">Nominal Tertinggi</option>
                    <option value="amt_asc">Nominal Terendah</option>
                  </select>

                  <div className="ml-auto text-xs text-[#78716C] flex items-center gap-2">
                    {activeFilters > 0 && (
                      <button
                        onClick={resetFilters}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold hover:bg-rose-100 transition"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset ({activeFilters})
                      </button>
                    )}
                    <span>{filtered.length} dari {ALL_TRX.length} transaksi</span>
                  </div>
                </div>
              </div>

              {/* ── Full Transactions Table ───────────────────────────── */}
              <div className="rounded-2xl border border-[#E7E5E4] bg-white overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F5F5F4] text-[#78716C] text-[11px] font-semibold uppercase border-b border-[#E7E5E4]">
                      <tr>
                        <th className="py-3 px-4">ID Transaksi</th>
                        <th className="py-3 px-4">Pembeli</th>
                        <th className="py-3 px-4">Produk</th>
                        <th className="py-3 px-4">Kanal</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Bruto</th>
                        <th className="py-3 px-4 text-right">Net Omzet</th>
                        <th className="py-3 px-4 text-center">Struk</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7E5E4] text-[#111827]">
                      {paginated.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center">
                            <p className="text-sm font-semibold text-[#111827] mb-2">Tidak ada transaksi yang cocok</p>
                            <button onClick={resetFilters} className="px-4 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-semibold">Reset Filter</button>
                          </td>
                        </tr>
                      ) : (
                        paginated.map((trx) => {
                          const badge = statusBadge(trx.status);
                          return (
                            <tr key={trx.id} onClick={() => setReceipt(trx)} className="hover:bg-violet-50/40 transition cursor-pointer group">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-1">
                                  <span className="font-mono text-xs font-bold text-[#111827]">{trx.id}</span>
                                  <button
                                    onClick={(e) => copyId(trx.id, e)}
                                    className="text-[#A8A29E] hover:text-violet-600 p-0.5 rounded transition"
                                  >
                                    {copiedId === trx.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                                  </button>
                                </div>
                                <div className="text-[10px] text-[#78716C]">
                                  {new Date(trx.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                </div>
                              </td>
                              <td className="py-3 px-4 font-mono text-xs text-[#44403C]">{trx.buyerId}</td>
                              <td className="py-3 px-4">
                                <div className="font-semibold text-xs text-[#111827] group-hover:text-violet-600 transition">{trx.productName}</div>
                                <div className="text-[10px] text-[#78716C]">{trx.category} · {trx.quantity} pcs</div>
                              </td>
                              <td className="py-3 px-4 text-[11px] text-[#78716C]">{channelLabel(trx.channel)}</td>
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badge.cls}`}>
                                  {badge.icon}{badge.label}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right font-bold text-xs">{fmt(trx.grossAmount)}</td>
                              <td className="py-3 px-4 text-right font-semibold text-xs text-emerald-600">
                                {trx.status === "CANCELLED" ? "Rp0" : fmt(trx.netAmount)}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <button
                                  onClick={(e) => { e.stopPropagation(); setReceipt(trx); }}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[#78716C] hover:text-violet-600 hover:bg-violet-50 border border-transparent hover:border-violet-200 transition text-[11px] font-semibold"
                                >
                                  <Eye className="w-3.5 h-3.5" /> Lihat
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-4 py-3 border-t border-[#E7E5E4] bg-[#FAFAF9] flex items-center justify-between text-xs text-[#78716C]">
                    <span>
                      Hal. <strong className="text-[#111827]">{page}</strong> / <strong className="text-[#111827]">{totalPages}</strong>
                      &nbsp;({filtered.length} data)
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-1.5 rounded-lg border border-[#E7E5E4] bg-white hover:bg-[#F5F5F4] disabled:opacity-40 transition"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let n = i + 1;
                        if (totalPages > 5 && page > 3) n = Math.min(page - 2 + i, totalPages - 4 + i);
                        return (
                          <button
                            key={n}
                            onClick={() => setPage(n)}
                            className={`w-7 h-7 rounded-lg text-xs font-semibold transition ${
                              page === n ? "bg-violet-600 text-white" : "border border-[#E7E5E4] bg-white text-[#111827] hover:bg-[#F5F5F4]"
                            }`}
                          >
                            {n}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="p-1.5 rounded-lg border border-[#E7E5E4] bg-white hover:bg-[#F5F5F4] disabled:opacity-40 transition"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#E7E5E4] bg-white rounded-b-2xl flex items-center justify-between sticky bottom-0">
              <span className="text-xs text-[#78716C]">
                Biaya platform 5% otomatis dihitung dari setiap transaksi berhasil
              </span>
              <button
                onClick={() => { setModalOpen(false); setReceipt(null); }}
                className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
