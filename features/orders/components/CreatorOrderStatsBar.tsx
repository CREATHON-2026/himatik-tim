"use client";

import * as React from "react";
import { ClipboardList, Clock, Package, CheckCircle2, Wallet } from "lucide-react";
import { CreatorOrderStats } from "../types";

interface CreatorOrderStatsBarProps {
  stats: CreatorOrderStats;
}

const formatRupiah = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

export function CreatorOrderStatsBar({ stats }: CreatorOrderStatsBarProps) {
  const cards = [
    {
      label: "Total Pesanan",
      value: stats.total,
      icon: ClipboardList,
      bg: "bg-[#F5F3FF]",
      text: "text-[#6355D9]",
    },
    {
      label: "Menunggu Bayar",
      value: stats.pending,
      icon: Clock,
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
    {
      label: "Perlu Dirangkai",
      value: stats.inEscrow,
      icon: Package,
      bg: "bg-violet-50",
      text: "text-violet-600",
    },
    {
      label: "Selesai",
      value: stats.completed,
      icon: CheckCircle2,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      label: "Total Omzet",
      value: formatRupiah(stats.totalRevenue),
      icon: Wallet,
      bg: "bg-[#EDE9FE]",
      text: "text-[#6355D9]",
      isCurrency: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`bg-white rounded-2xl border border-[#E7E5E4] p-4 shadow-xs space-y-2.5 ${
              card.isCurrency ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#78716C]">{card.label}</span>
              <div className={`p-2 rounded-xl ${card.bg} ${card.text}`}>
                <Icon className="size-4" />
              </div>
            </div>
            <p className="font-serif font-bold text-lg sm:text-xl text-[#111827]">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
