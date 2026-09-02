"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  ClipboardList,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getCreatorOrders } from "@/features/orders/api";
import { CreatorOrderCard } from "@/features/orders/components/CreatorOrderCard";
import { CreatorOrderStatsBar } from "@/features/orders/components/CreatorOrderStatsBar";

const FILTER_TABS = [
  { id: "ALL", label: "Semua" },
  { id: "IN_ESCROW", label: "Perlu Dirangkai" },
  { id: "PENDING", label: "Menunggu Bayar" },
  { id: "COMPLETED", label: "Selesai" },
  { id: "CANCELLED", label: "Dibatalkan" },
];

export default function CreatorOrdersPage() {
  const [activeTab, setActiveTab] = React.useState("ALL");
  const [searchQuery, setSearchQuery] = React.useState("");

  const {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["creator-orders", activeTab, searchQuery],
    queryFn: () =>
      getCreatorOrders({
        status: activeTab,
        search: searchQuery,
      }),
  });

  const orders = data?.orders || [];
  const stats = data?.stats || {
    total: 0,
    pending: 0,
    inEscrow: 0,
    completed: 0,
    cancelled: 0,
    totalRevenue: 0,
  };

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
      {/* ─── Top Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E4] pb-5">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="shrink-0 p-2 rounded-xl border border-[#E7E5E4] bg-white text-[#111827] hover:bg-[#F5F5F4]" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827]">
                Pesanan Masuk
              </h1>
              <span className="p-1 rounded-lg bg-[#EDE9FE] text-[#6355D9] text-xs">
                <Sparkles className="size-3.5" />
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#78716C] mt-0.5">
              Pantau dan proses karya kriya yang dipesan oleh pelanggan Anda.
            </p>
          </div>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E7E5E4] bg-white hover:bg-[#F5F5F4] text-xs font-semibold text-[#111827] transition cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          <RefreshCw className={`size-3.5 ${isRefetching ? "animate-spin" : ""}`} />
          <span>Segarkan Data</span>
        </button>
      </div>

      {/* ─── KPI Stats Bar ─── */}
      <CreatorOrderStatsBar stats={stats} />

      {/* ─── Search & Tab Filters Bar ─── */}
      <div className="space-y-4">
        {/* Status Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#6355D9] text-white shadow-xs"
                  : "bg-white border border-[#E7E5E4] text-[#78716C] hover:text-[#111827] hover:bg-[#FAFAF9]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#A8A29E]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pesanan berdasarkan nama produk atau No. Invoice (#CRT-...)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E7E5E4] bg-white text-xs text-[#111827] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#6355D9] focus:ring-2 focus:ring-[#6355D9]/15 shadow-2xs"
          />
        </div>
      </div>

      {/* ─── Orders List Section ─── */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-[#E7E5E4] p-6 animate-pulse space-y-4"
            >
              <div className="flex justify-between">
                <div className="h-4 w-32 bg-[#E7E5E4] rounded-md" />
                <div className="h-5 w-24 bg-[#E7E5E4] rounded-full" />
              </div>
              <div className="flex gap-4">
                <div className="size-16 bg-[#E7E5E4] rounded-2xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 bg-[#E7E5E4] rounded-md" />
                  <div className="h-3 w-32 bg-[#E7E5E4] rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-rose-200 p-8 space-y-3">
          <p className="text-sm font-semibold text-rose-600">Gagal memuat pesanan.</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-xl bg-[#6355D9] text-white text-xs font-semibold"
          >
            Coba Lagi
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E7E5E4] p-8 space-y-3">
          <div className="size-14 mx-auto rounded-full bg-[#EDE9FE] flex items-center justify-center text-[#6355D9]">
            <ClipboardList className="size-7" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#111827]">
            Belum Ada Pesanan {activeTab !== "ALL" ? `pada status ini` : ""}
          </h3>
          <p className="text-xs text-[#78716C] max-w-sm mx-auto">
            {activeTab === "ALL"
              ? "Ketika pembeli memesan buket atau hampers kriya Anda dari katalog, pesanan akan langsung muncul di sini."
              : "Tidak ada transaksi yang cocok dengan filter status yang dipilih."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <CreatorOrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
