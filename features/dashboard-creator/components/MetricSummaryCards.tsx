"use client";

import React from "react";
import { Package, ShoppingBag, Wallet, Users, Info, ArrowUpRight } from "lucide-react";

interface MetricSummaryCardsProps {
  productCount?: number;
  categoryCount?: number;
  transactionCount?: number;
  transactionGrowthPct?: number;
  grossRevenueFormatted?: string;
  averageOrderFormatted?: string;
  uniqueBuyersCount?: number;
  transactionPerBuyer?: string;
}

export function MetricSummaryCards({
  productCount = 3,
  categoryCount = 3,
  transactionCount = 11,
  transactionGrowthPct = 37.5,
  grossRevenueFormatted = "Rp2.823.000",
  averageOrderFormatted = "Rp256.636 / transaksi",
  uniqueBuyersCount = 11,
  transactionPerBuyer = "1,0 transaksi / pembeli",
}: MetricSummaryCardsProps) {
  const cards = [
    {
      id: "products",
      label: "Produk Terdaftar",
      value: `${productCount} Produk`,
      subLabel: `${categoryCount} Kategori`,
      icon: Package,
      iconBg: "bg-[#F5F3FF]",
      iconColor: "text-[#6355D9]",
    },
    {
      id: "transactions",
      label: "Transaksi",
      value: `${transactionCount} Transaksi`,
      subLabel: `+${transactionGrowthPct}% dari periode sebelumnya`,
      hasGrowthBadge: true,
      icon: ShoppingBag,
      iconBg: "bg-[#F5F3FF]",
      iconColor: "text-[#6355D9]",
    },
    {
      id: "revenue",
      label: "Omzet",
      value: grossRevenueFormatted,
      subLabel: `Rata-rata ${averageOrderFormatted}`,
      icon: Wallet,
      iconBg: "bg-[#FFF1F0]",
      iconColor: "text-[#E76F61]",
    },
    {
      id: "buyers",
      label: "Pembeli Unik",
      value: `${uniqueBuyersCount} Pembeli`,
      subLabel: transactionPerBuyer,
      icon: Users,
      iconBg: "bg-[#F5F3FF]",
      iconColor: "text-[#8B7CF6]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-2xs hover:border-[#DDD6FE] transition-all duration-200 flex items-start gap-4 group"
          >
            <div
              className={`size-12 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}
            >
              <Icon className="size-5.5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#78716C] font-medium truncate">
                  {card.label}
                </span>
                <Info className="size-3.5 text-[#D6D3D1] group-hover:text-[#A8A29E] transition-colors shrink-0 ml-1" />
              </div>

              <div className="font-serif text-xl sm:text-[22px] font-normal text-[#111827] tracking-tight mt-1 leading-tight truncate">
                {card.value}
              </div>

              <div className="mt-1.5 flex items-center gap-1 text-[11px] text-[#78716C] truncate">
                {card.hasGrowthBadge && (
                  <span className="inline-flex items-center text-emerald-600 font-semibold mr-0.5">
                    <ArrowUpRight className="size-3 stroke-[2.5]" />
                  </span>
                )}
                <span className={card.hasGrowthBadge ? "text-[#78716C]" : ""}>
                  {card.subLabel}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
