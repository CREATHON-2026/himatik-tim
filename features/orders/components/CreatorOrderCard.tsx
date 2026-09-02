"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Clock,
  CheckCircle2,
  Package,
  XCircle,
  MessageCircle,
  ArrowRight,
  Gift,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { CreatorOrder } from "../types";
import { updateCreatorOrderStatus } from "../api";

interface CreatorOrderCardProps {
  order: CreatorOrder;
}

const formatRupiah = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

export function CreatorOrderCard({ order }: CreatorOrderCardProps) {
  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: (newStatus: string) => updateCreatorOrderStatus(order.id, newStatus),
    onSuccess: () => {
      toast.success("Status pesanan berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["creator-orders"] });
    },
    onError: (err) => {
      const message = err instanceof Error ? err.message : "Gagal memperbarui status";
      toast.error(message);
    },
  });

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
    // Guest buyer format: guest-08123...
    const phone = order.buyerId.startsWith("guest-")
      ? order.buyerId.replace("guest-", "")
      : "6281234567890";
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `Halo Kak, terima kasih telah memesan karya kriya "${order.product.name}" di Gifteria (Invoice: #${order.orderNumber}). Pesanan Kakak sedang kami siapkan ya!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E7E5E4] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 space-y-4">
      {/* ─── Top Header: Order Number, Date & Status Badge ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F5F5F4] pb-3.5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-[#111827]">
            #{order.orderNumber}
          </span>
          <span className="text-[11px] text-[#A8A29E]">
            {new Date(order.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}
        >
          <StatusIcon className="size-3.5" />
          {badge.label}
        </span>
      </div>

      {/* ─── Middle Section: Product Details ─── */}
      <div className="flex items-start gap-4">
        <div className="relative size-18 rounded-2xl overflow-hidden bg-[#FAF9F5] border border-[#E7E5E4] shrink-0">
          {order.product.imageUrl ? (
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

        <div className="flex-1 min-w-0 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8A29E] block">
            {order.primaryCategory}
          </span>
          <h4 className="font-serif font-bold text-sm text-[#111827] truncate">
            {order.product.name}
          </h4>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-[#78716C]">Pendapatan Bersih:</span>
            <span className="font-bold text-sm text-[#6355D9]">
              {formatRupiah(order.netAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Bottom Actions Bar ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F5F5F4]">
        <button
          onClick={handleWhatsAppBuyer}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition cursor-pointer"
        >
          <MessageCircle className="size-3.5" />
          <span>Chat Pembeli</span>
        </button>

        <div className="flex items-center gap-2">
          {order.status === "IN_ESCROW" && (
            <button
              onClick={() => statusMutation.mutate("COMPLETED")}
              disabled={statusMutation.isPending}
              className="px-3.5 py-2 rounded-xl bg-[#6355D9] hover:bg-[#5145C6] text-white text-xs font-semibold transition active:scale-98 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              <ShieldCheck className="size-3.5" />
              <span>Tandai Selesai</span>
            </button>
          )}

          <Link
            href={`/dashboard/creator/orders/${order.id}`}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-[#E7E5E4] hover:bg-[#F5F5F4] text-xs font-semibold text-[#111827] transition"
          >
            <span>Rincian</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
