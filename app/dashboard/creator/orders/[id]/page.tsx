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
  Wallet,
  User,
  Phone,
  Mail,
  MapPin,
  Copy,
  Sparkles,
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

  const copyToClipboard = (text: string, label: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(text);
      toast.success(`${label} berhasil disalin!`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="size-10 border-4 border-[#6355D9] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-medium text-[#78716C]">Memuat rincian pesanan kado...</p>
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

  const buyer = order.buyer || {
    name: "Pelanggan Gifteria",
    phone: "081234567890",
    email: "customer@Gifteria.id",
    address: "Makassar, Sulawesi Selatan",
    city: "Makassar",
  };

  const gift = order.giftCustomization || {
    greetingCardText: "Selamat atas pencapaian barunya! Semoga berkah dan bahagia selalu.",
    customNotes: "Kemasan rapi dengan pita",
    packaging: "Luxury Gift Hardbox",
    courier: "Kurir Instant (1 - 3 Jam)",
  };

  const handleWhatsAppBuyer = () => {
    const cleanPhone = buyer.phone.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `Halo Kak ${buyer.name}, kami dari sanggar Gifteria ingin mengonfirmasi detail pesanan kriya "${order.product.name}" (#${order.orderNumber}). Pesanan Kakak sedang kami proses ya!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
  };

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
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
              Diterima pada {new Date(order.createdAt).toLocaleDateString("id-ID", {
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Product & Work Order Sheet (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Karya Kriya yang Dipesan */}
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

          {/* Section 2: Personalisasi Kado & Pesan Kartu Ucapan */}
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F5F5F4] pb-3">
              <h2 className="font-serif text-base font-bold text-[#111827] flex items-center gap-2">
                <Sparkles className="size-4 text-[#6355D9]" />
                <span>Kartu Ucapan & Personalisasi Kado</span>
              </h2>
              {gift.greetingCardText && (
                <button
                  onClick={() => copyToClipboard(gift.greetingCardText || "", "Pesan kartu ucapan")}
                  className="text-xs text-[#6355D9] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                >
                  <Copy className="size-3" /> Salin Teks
                </button>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE] space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#6355D9] block">
                Teks Ucapan untuk Dicetak / Ditulis:
              </span>
              <p className="font-serif text-xs text-[#111827] italic leading-relaxed">
                &ldquo;{gift.greetingCardText}&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <span className="text-[10px] text-[#A8A29E] font-bold uppercase block">Kemasan Kado</span>
                <span className="font-semibold text-[#111827]">{gift.packaging || "Standar Wrap"}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
                <span className="text-[10px] text-[#A8A29E] font-bold uppercase block">Kurir Pengiriman</span>
                <span className="font-semibold text-[#111827]">{gift.courier || "Kurir Instant"}</span>
              </div>
            </div>

            {gift.customNotes && (
              <div className="text-xs text-[#78716C] bg-amber-50 border border-amber-200 p-3 rounded-xl">
                <span className="font-bold text-amber-900 block mb-0.5">Catatan Khusus Pembeli:</span>
                <span>{gift.customNotes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Buyer Profile & Financials (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Buyer Profile Card */}
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-[#111827] border-b border-[#F5F5F4] pb-3 flex items-center gap-2">
              <User className="size-4 text-[#6355D9]" />
              <span>Profil Pembeli & Penerima</span>
            </h3>

            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-[#EDE9FE] text-[#6355D9] flex items-center justify-center font-bold text-sm">
                {buyer.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#111827]">{buyer.name}</h4>
                <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium inline-block mt-0.5">
                  Pembeli Terverifikasi
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs pt-1 border-t border-[#F5F5F4]">
              <div className="flex items-center gap-2 text-[#78716C]">
                <Phone className="size-3.5 text-[#6355D9] shrink-0" />
                <span className="font-medium text-[#111827]">{buyer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#78716C]">
                <Mail className="size-3.5 text-[#6355D9] shrink-0" />
                <span className="truncate">{buyer.email}</span>
              </div>
              <div className="flex items-start gap-2 text-[#78716C]">
                <MapPin className="size-3.5 text-[#6355D9] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[#111827]">
                  {buyer.address} ({buyer.city})
                </span>
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

          {/* Financial Overview Card */}
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-[#111827] border-b border-[#F5F5F4] pb-3 flex items-center gap-2">
              <Wallet className="size-4 text-[#6355D9]" />
              <span>Rincian Pendapatan Sanggar</span>
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
        </div>
      </div>
    </div>
  );
}
