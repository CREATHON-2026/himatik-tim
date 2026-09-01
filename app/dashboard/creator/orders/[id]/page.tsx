"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Package,
  XCircle,
  MessageCircle,
  ShieldCheck,
  Gift,
  Calendar,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { getCreatorOrderDetail, updateCreatorOrderStatus } from "@/features/orders/api";

interface CreatorOrderDetailPageProps {
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

export default function CreatorOrderDetailPage({ params }: CreatorOrderDetailPageProps) {
  const queryClient = useQueryClient();
  const resolvedParams = React.use(params);
  const orderId = resolvedParams.id;

  const { data: order, isLoading, error } = useQuery({
    queryKey: ["creator-order-detail", orderId],
    queryFn: () => getCreatorOrderDetail(orderId),
  });

  const statusMutation = useMutation({
    mutationFn: (newStatus: string) => updateCreatorOrderStatus(orderId, newStatus),
    onSuccess: () => {
      toast.success("Status pesanan berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["creator-order-detail", orderId] });
      queryClient.invalidateQueries({ queryKey: ["creator-orders"] });
    },
    onError: (err) => {
      const message = err instanceof Error ? err.message : "Gagal memperbarui status";
      toast.error(message);
    },
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="size-10 border-4 border-[#6355D9] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-medium text-[#78716C]">Memuat rincian pesanan...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#111827]">Pesanan Tidak Ditemukan</h2>
        <p className="text-xs text-[#78716C]">Pesanan ini mungkin telah dihapus atau Anda tidak memiliki akses.</p>
        <Link
          href="/dashboard/creator/orders"
          className="px-5 py-2.5 rounded-full bg-[#6355D9] text-white text-xs font-semibold hover:bg-[#5145C6]"
        >
          Kembali ke Daftar Pesanan
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "IN_ESCROW":
        return {
          label: "Perlu Dirangkai (Escrow Safe)",
          bg: "bg-[#EDE9FE] text-[#6355D9] border-[#DDD6FE]",
          icon: Package,
        };
      case "COMPLETED":
        return {
          label: "Selesai",
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: CheckCircle2,
        };
      case "CANCELLED":
        return {
          label: "Dibatalkan",
          bg: "bg-rose-50 text-rose-700 border-rose-200",
          icon: XCircle,
        };
      case "PENDING":
      default:
        return {
          label: "Menunggu Pembayaran",
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: Clock,
        };
    }
  };

  const badge = getStatusBadge(order.status);
  const StatusIcon = badge.icon;

  const handleWhatsAppBuyer = () => {
    const phone = order.buyerId.startsWith("guest-")
      ? order.buyerId.replace("guest-", "")
      : "6281234567890";
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `Halo Kak, kami dari sanggar Creathon ingin mengonfirmasi detail pesanan "${order.product.name}" (#${order.orderNumber}).`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
  };

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full">
      {/* ─── Top Header & Navigation ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E4] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/creator/orders"
            className="p-2 rounded-xl border border-[#E7E5E4] bg-white text-[#111827] hover:bg-[#F5F5F4] transition"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#111827]">
              Lembar Kerja Pesanan #{order.orderNumber}
            </h1>
            <p className="text-xs text-[#78716C]">
              Dibuat pada {new Date(order.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border self-start sm:self-auto ${badge.bg}`}
        >
          <StatusIcon className="size-3.5" />
          {badge.label}
        </span>
      </div>

      {/* ─── Main Content Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Product & Work Order Sheet (7 Cols) */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-5">
            <h2 className="font-serif text-base font-bold text-[#111827] border-b border-[#F5F5F4] pb-3">
              Karya Kriya yang Dipesan
            </h2>

            <div className="flex items-start gap-4">
              <div className="relative size-20 rounded-2xl overflow-hidden bg-[#FAF9F5] border border-[#E7E5E4] shrink-0">
                {order.product.imageUrl ? (
                  <Image
                    src={order.product.imageUrl}
                    alt={order.product.name}
                    fill
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="size-full flex items-center justify-center text-[#6355D9]">
                    <Gift className="size-8 opacity-40" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8A29E] block">
                  {order.product.category}
                </span>
                <h3 className="font-serif font-bold text-base text-[#111827]">
                  {order.product.name}
                </h3>
                <p className="text-xs font-bold text-[#6355D9] pt-1">
                  Harga Satuan: {formatRupiah(order.product.price)}
                </p>
              </div>
            </div>

            {/* Quick Status Workflow Action Buttons */}
            <div className="pt-3 border-t border-[#F5F5F4] space-y-2">
              <span className="text-xs font-bold text-[#111827] block">Aksi Status Pesanan:</span>
              <div className="flex flex-wrap gap-2.5">
                {order.status === "PENDING" && (
                  <button
                    onClick={() => statusMutation.mutate("IN_ESCROW")}
                    disabled={statusMutation.isPending}
                    className="px-4 py-2.5 rounded-xl bg-[#6355D9] hover:bg-[#5145C6] text-white text-xs font-semibold transition active:scale-98 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    Konfirmasi Pembayaran Diterima (Mulai Rangkai)
                  </button>
                )}

                {order.status === "IN_ESCROW" && (
                  <button
                    onClick={() => statusMutation.mutate("COMPLETED")}
                    disabled={statusMutation.isPending}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition active:scale-98 cursor-pointer shadow-xs disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="size-4" />
                    <span>Tandai Selesai & Diserahkan ke Kurir</span>
                  </button>
                )}

                {order.status !== "CANCELLED" && order.status !== "COMPLETED" && (
                  <button
                    onClick={() => statusMutation.mutate("CANCELLED")}
                    disabled={statusMutation.isPending}
                    className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition cursor-pointer disabled:opacity-50"
                  >
                    Batalkan Pesanan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Financial & Customer Details (5 Cols) */}
        <div className="md:col-span-5 space-y-6">
          {/* Financial Overview */}
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-[#111827] border-b border-[#F5F5F4] pb-3 flex items-center gap-2">
              <Wallet className="size-4 text-[#6355D9]" />
              <span>Rincian Pendapatan</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-[#78716C]">
                <span>Total Bruto Transaksi</span>
                <span className="font-medium text-[#111827]">{formatRupiah(order.grossAmount)}</span>
              </div>
              <div className="flex justify-between text-[#78716C]">
                <span>Biaya Platform (0%)</span>
                <span className="font-bold text-emerald-600">Rp0 (Promo)</span>
              </div>
              <div className="border-t border-[#E7E5E4] pt-2.5 flex justify-between items-baseline">
                <span className="font-bold text-xs text-[#111827]">Pendapatan Bersih Sanggar</span>
                <span className="font-serif font-bold text-lg text-[#6355D9]">
                  {formatRupiah(order.netAmount)}
                </span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-[#A8A29E] flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span>Dana akan diteruskan ke saldo sanggar setelah pesanan selesai</span>
            </div>
          </div>

          {/* Customer Contact & WhatsApp Button */}
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-[#111827] border-b border-[#F5F5F4] pb-3">
              Kontak Pembeli
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#78716C]">
                <Calendar className="size-4 text-[#6355D9]" />
                <span>Pembeli Terdaftar / ID: {order.buyerId.substring(0, 16)}</span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppBuyer}
              className="w-full py-2.5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs transition active:scale-98 cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="size-4" />
              <span>Hubungi Pembeli via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
