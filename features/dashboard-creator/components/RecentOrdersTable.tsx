"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MoreVertical } from "lucide-react";

export interface RecentOrderItem {
  id: string;
  productName: string;
  productImage?: string;
  buyerName: string;
  date: string;
  totalFormatted: string;
  status: "COMPLETED" | "PROCESSING" | "PENDING_PAYMENT" | "CANCELLED" | string;
  statusLabel: string;
}

interface RecentOrdersTableProps {
  orders?: RecentOrderItem[];
}

export function RecentOrdersTable({
  orders = [
    {
      id: "ord-1",
      productName: "Gift Box Anniversary Deluxe",
      productImage: "/aset/bglogin.png",
      buyerName: "Dewi Lestari",
      date: "31 Agu 2026",
      totalFormatted: "Rp450.000",
      status: "COMPLETED",
      statusLabel: "Selesai",
    },
    {
      id: "ord-2",
      productName: "Bouquet Bunga Artificial",
      productImage: "/aset/bglogin.png",
      buyerName: "Budi Santoso",
      date: "30 Agu 2026",
      totalFormatted: "Rp250.000",
      status: "PROCESSING",
      statusLabel: "Diproses",
    },
    {
      id: "ord-3",
      productName: "Hampers Spesial",
      productImage: "/aset/bglogin.png",
      buyerName: "Rina Putri",
      date: "29 Agu 2026",
      totalFormatted: "Rp350.000",
      status: "PENDING_PAYMENT",
      statusLabel: "Menunggu Pembayaran",
    },
  ],
}: RecentOrdersTableProps) {
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]"; // Soft green
      case "PROCESSING":
        return "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]"; // Soft yellow/orange
      case "PENDING_PAYMENT":
        return "bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]"; // Soft blue
      default:
        return "bg-[#F5F5F4] text-[#78716C] border-[#E7E5E4]";
    }
  };

  return (
    <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-2xs space-y-4">
      {/* Table Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base text-[#111827]">
          Pesanan Terbaru
        </h3>
        <Link
          href="/dashboard/creator/orders"
          className="text-xs text-[#6355D9] hover:text-[#5145C6] font-medium hover:underline transition-colors"
        >
          Lihat Semua
        </Link>
      </div>

      {/* Orders Table */}
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
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-[#FAFAF9] transition-colors group"
              >
                {/* Product with Thumbnail */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3 min-w-[200px]">
                    <div className="size-9 rounded-lg bg-[#F5F5F4] border border-[#E7E5E4] overflow-hidden shrink-0 relative">
                      <Image
                        src={order.productImage || "/aset/bglogin.png"}
                        alt={order.productName}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium text-xs text-[#111827] truncate max-w-xs">
                      {order.productName}
                    </span>
                  </div>
                </td>

                {/* Buyer Name */}
                <td className="py-3 px-3 text-xs text-[#44403C] whitespace-nowrap">
                  {order.buyerName}
                </td>

                {/* Date */}
                <td className="py-3 px-3 text-xs text-[#78716C] whitespace-nowrap">
                  {order.date}
                </td>

                {/* Total Price */}
                <td className="py-3 px-3 font-medium text-xs text-[#111827] tabular-nums whitespace-nowrap">
                  {order.totalFormatted}
                </td>

                {/* Status Badge */}
                <td className="py-3 px-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${getStatusBadgeStyle(
                      order.status
                    )}`}
                  >
                    {order.statusLabel}
                  </span>
                </td>

                {/* Action Menu (3 Dots) */}
                <td className="py-3 px-2 text-right whitespace-nowrap">
                  <button
                    type="button"
                    className="p-1 rounded-lg text-[#A8A29E] hover:text-[#111827] hover:bg-[#F5F5F4] transition cursor-pointer"
                    title="Menu Aksi"
                  >
                    <MoreVertical className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
