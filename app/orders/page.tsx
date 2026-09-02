"use client";

import * as React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  PackageOpen,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  Home,
  Gift,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface OrderSummary {
  id: string;
  status: string;
  grossAmount: number;
  paymentChannel: string;
  productName: string;
  category: string;
  createdAt: string;
}

export default function OrdersListPage() {
  const { user, isAuthenticated } = useAuth();
  const [activeStatusTab, setActiveStatusTab] = React.useState("ALL");

  const { data: orders = [], isLoading } = useQuery<OrderSummary[]>({
    queryKey: ["buyer-orders", user?.id],
    queryFn: async () => {
      const res = await fetch("/api/orders");
      const json = await res.json();
      return json.orders || [];
    },
  });

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const filteredOrders = React.useMemo(() => {
    if (activeStatusTab === "ALL") return orders;
    return orders.filter((o) => o.status === activeStatusTab);
  }, [orders, activeStatusTab]);

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111827] antialiased pb-20 selection:bg-[#6355D9]/20 selection:text-[#6355D9]">
      {/* ─── Top Navbar ─── */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E7E5E4] bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/katalog" className="flex items-center gap-2.5 font-bold text-lg text-[#111827] group">
            <span className="p-1.5 rounded-xl bg-[#EDE9FE] border border-[#DDD6FE] text-[#6355D9] group-hover:scale-105 transition-transform">
              <Gift className="w-4 h-4" />
            </span>
            <span className="font-serif tracking-tight text-xl">
              Gifteria<span className="text-[#6355D9]">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <Link href="/katalog" className="hover:text-[#111827] transition font-medium">
              Eksplorasi Katalog
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Main Content Container ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-[#78716C]">
          <Link href="/" className="hover:text-[#111827] flex items-center gap-1">
            <Home className="size-3.5" />
            <span>Beranda</span>
          </Link>
          <ChevronRight className="size-3 text-[#A8A29E]" />
          <Link href="/katalog" className="hover:text-[#111827]">
            Katalog
          </Link>
          <ChevronRight className="size-3 text-[#A8A29E]" />
          <span className="font-semibold text-[#111827]">Pesanan Saya</span>
        </div>

        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7E5E4] pb-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827]">
              Daftar Pesanan & Invoice Kriya
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1">
              Pantau status pembuatan kado personal, resi pengiriman kurir, dan riwayat invoice pesanan Anda.
            </p>
          </div>

          <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-[#EDE9FE] text-[#6355D9] text-xs font-bold border border-[#DDD6FE]">
            {orders.length} Total Transaksi
          </span>
        </div>

        {/* Filter Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
          {[
            { id: "ALL", label: "Semua Pesanan" },
            { id: "PENDING", label: "Menunggu Pembayaran" },
            { id: "PROCESSING", label: "Diproses Sanggar" },
            { id: "SHIPPED", label: "Dalam Pengiriman" },
            { id: "DELIVERED", label: "Selesai" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveStatusTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-2xs cursor-pointer ${
                activeStatusTab === tab.id
                  ? "bg-[#6355D9] text-white shadow-xs"
                  : "bg-white border border-[#E7E5E4] text-[#78716C] hover:border-[#DDD6FE] hover:text-[#111827]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List / Empty State */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <div className="size-8 border-4 border-[#6355D9] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-[#78716C]">Memuat daftar pesanan kado...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          // ─── EMPTY ORDERS STATE ───
          <div className="py-16 px-6 rounded-3xl bg-white border border-[#E7E5E4] text-center space-y-5 shadow-xs max-w-2xl mx-auto">
            <div className="size-20 rounded-full bg-[#FAF8FF] border border-[#DDD6FE] text-[#6355D9] flex items-center justify-center mx-auto shadow-sm">
              <PackageOpen className="size-9" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-[#111827]">
                Belum Ada Riwayat Pesanan
              </h2>
              <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto leading-relaxed">
                Anda belum melakukan pemesanan kado atau hampers kriya. Yuk buat momen berharga menjadi berkesan dengan hadiah eksklusif!
              </p>
            </div>
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6355D9] hover:bg-[#5145C6] text-white font-semibold text-xs transition shadow-xs"
            >
              <span>Mulai Belanja Kado</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          // ─── ORDERS CARD GRID ───
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const isPending = order.status === "PENDING";
              const isCompleted = order.status === "DELIVERED" || order.status === "COMPLETED";

              return (
                <div
                  key={order.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E7E5E4] hover:border-[#DDD6FE] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition"
                >
                  {/* Order Info & Product Details */}
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-mono text-xs font-bold text-[#111827]">
                        #{order.id.slice(0, 10).toUpperCase()}
                      </span>
                      <span className="text-xs text-[#78716C]">• {formatDate(order.createdAt)}</span>

                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          isPending
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : isCompleted
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-[#FAF8FF] text-[#6355D9] border-[#DDD6FE]"
                        }`}
                      >
                        {isPending ? (
                          <>
                            <Clock className="size-3" /> Menunggu Pembayaran
                          </>
                        ) : isCompleted ? (
                          <>
                            <CheckCircle2 className="size-3" /> Selesai
                          </>
                        ) : (
                          <>
                            <Truck className="size-3" /> Diproses Sanggar
                          </>
                        )}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#111827]">
                      {order.productName}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-[#78716C] flex-wrap">
                      <span>Kategori: <strong className="text-[#44403C]">{order.category}</strong></span>
                      <span>•</span>
                      <span>Metode: <strong className="text-[#44403C]">{order.paymentChannel}</strong></span>
                    </div>
                  </div>

                  {/* Price & Action Button */}
                  <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto shrink-0 gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-[#F5F5F4]">
                    <div className="text-left md:text-right">
                      <p className="text-[11px] text-[#78716C]">Total Pembayaran</p>
                      <p className="font-serif text-base sm:text-lg font-bold text-[#6355D9]">
                        {formatPrice(order.grossAmount)}
                      </p>
                    </div>

                    <Link
                      href={`/orders/${order.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] hover:bg-[#F5F3FF] text-[#6355D9] text-xs font-semibold shadow-2xs transition"
                    >
                      <span>Lihat Invoice</span>
                      <ExternalLink className="size-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
