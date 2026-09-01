"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  QrCode,
  ArrowLeft,
  Copy,
  MessageCircle,
  Store,
  Gift,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

interface OrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

const formatRupiah = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

export default function OrderDetailPage({ params }: OrderPageProps) {
  const queryClient = useQueryClient();
  const resolvedParams = React.use(params);
  const orderId = resolvedParams.id;

  const { data: order, isLoading, error } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: async () => {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) throw new Error("Gagal memuat detail pesanan");
      return res.json();
    },
  });

  // Mutation to simulate payment success
  const payMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "IN_ESCROW" }),
      });
      if (!res.ok) throw new Error("Gagal memproses simulasi pembayaran");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Pembayaran berhasil diverifikasi (Escrow Safe)!");
      queryClient.invalidateQueries({ queryKey: ["order-detail", orderId] });
    },
    onError: (err) => {
      const message = err instanceof Error ? err.message : "Gagal memproses";
      toast.error(message);
    },
  });

  const copyToClipboard = (text: string, label: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(text);
      toast.success(`${label} berhasil disalin!`);
    }
  };

  const handleWhatsAppConfirmation = () => {
    if (!order) return;
    const phone = order.creator?.phone || "6281234567890";
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `Halo ${order.creator?.storeName || "Sanggar"}, saya telah melakukan pemesanan "${order.product?.name}" dengan No. Invoice #${order.id.substring(0, 8).toUpperCase()} seharga ${formatRupiah(order.grossAmount)}. Mohon konfirmasi pesanannya via Creathon ya!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="size-10 border-4 border-[#6355D9] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-[#78716C]">Memuat invoice digital...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#111827]">Pesanan Tidak Ditemukan</h2>
        <p className="text-sm text-[#78716C]">ID Pesanan tidak valid atau transaksi telah kadaluarsa.</p>
        <Link
          href="/katalog"
          className="px-5 py-2.5 rounded-full bg-[#6355D9] text-white text-xs font-semibold hover:bg-[#5145C6]"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const isPaid = order.status === "IN_ESCROW" || order.status === "COMPLETED";

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111827] antialiased pb-20 selection:bg-[#6355D9]/20 selection:text-[#6355D9]">
      {/* ─── Top Navbar ─── */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E7E5E4] bg-white/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/katalog" className="flex items-center gap-2.5 font-bold text-lg text-[#111827]">
            <span className="p-1.5 rounded-xl bg-[#EDE9FE] border border-[#DDD6FE] text-[#6355D9]">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-serif tracking-tight text-xl">
              Creathon<span className="text-[#6355D9]">.</span>
            </span>
          </Link>

          <Link
            href="/katalog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#78716C] hover:text-[#111827] transition"
          >
            <ArrowLeft className="size-3.5" /> Lanjut Belanja Kriya
          </Link>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Success Header Status Banner */}
        <div className={`p-6 sm:p-8 rounded-3xl border text-center space-y-3 relative overflow-hidden ${
          isPaid
            ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
            : "bg-[#F5F3FF]/80 border-[#DDD6FE] text-[#111827]"
        }`}>
          <div className={`size-14 rounded-full mx-auto flex items-center justify-center ${
            isPaid ? "bg-emerald-100 text-emerald-600" : "bg-[#EDE9FE] text-[#6355D9]"
          }`}>
            {isPaid ? <CheckCircle2 className="size-7" /> : <Clock className="size-7" />}
          </div>

          <div className="space-y-1">
            <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block ${
              isPaid
                ? "bg-emerald-200/60 text-emerald-800"
                : "bg-[#EDE9FE] text-[#6355D9]"
            }`}>
              {isPaid ? "Pembayaran Terverifikasi (Escrow Safe)" : "Menunggu Pembayaran"}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold">
              {isPaid ? "Pesanan Kado Berhasil Dibayar!" : "Pesanan Berhasil Dibuat!"}
            </h1>
            <p className="text-xs text-[#78716C] max-w-md mx-auto">
              {isPaid
                ? "Dana Anda aman di Escrow Creathon. Sanggar akan segera merangkai dan mengirimkan karya kado Anda."
                : "Silakan selesaikan pembayaran untuk memulai perangkaian karya kado personal Anda."}
            </p>
          </div>
        </div>

        {/* Invoice & Payment Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left: Payment QRIS / Method (5 Cols) */}
          <div className="md:col-span-5 bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-5 text-center">
            <div className="space-y-1 border-b border-[#F5F5F4] pb-4">
              <span className="text-[10px] text-[#A8A29E] font-bold uppercase tracking-wider block">
                Total Tagihan
              </span>
              <p className="font-serif text-2xl font-bold text-[#6355D9]">
                {formatRupiah(order.grossAmount)}
              </p>
              <button
                onClick={() => copyToClipboard(String(order.grossAmount), "Nominal")}
                className="text-[11px] text-[#78716C] hover:text-[#111827] inline-flex items-center gap-1 font-medium cursor-pointer"
              >
                <Copy className="size-3" /> Salin Nominal
              </button>
            </div>

            {/* QRIS Simulator Box */}
            <div className="space-y-3">
              <div className="size-48 mx-auto rounded-2xl bg-[#FAFAF9] border-2 border-dashed border-[#DDD6FE] p-3 flex flex-col items-center justify-center relative">
                {isPaid ? (
                  <div className="space-y-2 text-emerald-600">
                    <CheckCircle2 className="size-12 mx-auto" />
                    <span className="text-xs font-bold block">LUNAS</span>
                  </div>
                ) : (
                  <>
                    <QrCode className="size-32 text-[#111827]" />
                    <span className="text-[10px] font-bold text-[#6355D9] mt-1">QRIS Escrow Creathon</span>
                  </>
                )}
              </div>

              {!isPaid && (
                <button
                  onClick={() => payMutation.mutate()}
                  disabled={payMutation.isPending}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition active:scale-98 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {payMutation.isPending ? "Memverifikasi..." : "Simulasikan Bayar Sekarang (Demo)"}
                </button>
              )}
            </div>

            <div className="pt-2 text-[10px] text-[#A8A29E] flex items-center justify-center gap-1">
              <ShieldCheck className="size-3 text-emerald-600" />
              <span>Proteksi Pembayaran Terenkripsi</span>
            </div>
          </div>

          {/* Right: Order & Product Breakdown (7 Cols) */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#F5F5F4] pb-3">
              <div>
                <span className="text-[10px] text-[#A8A29E] uppercase font-bold block">No. Invoice</span>
                <span className="font-mono text-xs font-bold text-[#111827]">
                  #CRT-{order.id.substring(0, 8).toUpperCase()}
                </span>
              </div>
              <span className="text-xs text-[#78716C]">
                {new Date(order.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Product Item Preview */}
            <div className="flex items-start gap-3.5 pb-4 border-b border-[#F5F5F4]">
              <div className="relative size-16 rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#E7E5E4] shrink-0">
                {order.product?.imageUrl ? (
                  <Image
                    src={order.product.imageUrl}
                    alt={order.product.name}
                    fill
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="size-full flex items-center justify-center text-[#6355D9]">
                    <Gift className="size-6 opacity-40" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <span className="text-[10px] font-bold uppercase text-[#A8A29E]">
                  {order.product?.category || "Gift Kriya"}
                </span>
                <h4 className="font-bold text-xs text-[#111827] truncate">{order.product?.name}</h4>
                <p className="text-xs font-bold text-[#6355D9] pt-1">
                  {formatRupiah(order.product?.price || order.grossAmount)}
                </p>
              </div>
            </div>

            {/* Creator Sanggar Information & WhatsApp Action */}
            {order.creator && (
              <div className="p-4 rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Store className="size-4 text-[#6355D9]" />
                    <span className="text-xs font-bold text-[#111827]">{order.creator.storeName}</span>
                  </div>
                  <span className="text-[10px] text-[#78716C]">{order.creator.city}</span>
                </div>

                <button
                  onClick={handleWhatsAppConfirmation}
                  className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-98 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="size-4" />
                  <span>Kirim Rincian ke WhatsApp Sanggar</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
