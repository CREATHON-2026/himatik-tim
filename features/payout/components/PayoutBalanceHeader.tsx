"use client";

import React from "react";
import { Wallet, ShieldCheck, TrendingUp, ArrowUpRight } from "lucide-react";
import { WalletBalanceStats } from "../types";

interface PayoutBalanceHeaderProps {
  stats: WalletBalanceStats;
  onRequestWithdraw: () => void;
}

const formatRupiah = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

export function PayoutBalanceHeader({ stats, onRequestWithdraw }: PayoutBalanceHeaderProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* ─── Card 1: Saldo Siap Ditarik (Primary Spotlight) ─── */}
      <div className="bg-gradient-to-br from-[#6355D9] to-[#4F42B5] text-white rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider block">
              Saldo Siap Ditarik
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              {formatRupiah(stats.availableBalance)}
            </h2>
          </div>
          <div className="size-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0">
            <Wallet className="size-5 text-white" />
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onRequestWithdraw}
            disabled={stats.availableBalance < 50000}
            className="w-full py-2.5 px-4 rounded-xl bg-white text-[#6355D9] hover:bg-[#FAF8FF] font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-98 shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Tarik Saldo ke Rekening</span>
            <ArrowUpRight className="size-4" />
          </button>
        </div>
      </div>

      {/* ─── Card 2: Saldo Tertahan di Escrow ─── */}
      <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#78716C] uppercase tracking-wider block">
              Tertahan di Escrow
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#111827]">
              {formatRupiah(stats.inEscrowBalance)}
            </h3>
          </div>
          <div className="size-11 rounded-2xl bg-[#EDE9FE] flex items-center justify-center shrink-0">
            <ShieldCheck className="size-5 text-[#6355D9]" />
          </div>
        </div>

        <div className="text-[11px] text-[#78716C] bg-[#FAFAF9] p-2.5 rounded-xl border border-[#E7E5E4]">
          <span>Dana pesanan yang sedang dirangkai atau dalam pengiriman kurir.</span>
        </div>
      </div>

      {/* ─── Card 3: Total Omzet Kumulatif ─── */}
      <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#78716C] uppercase tracking-wider block">
              Total Omzet Bersih
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#111827]">
              {formatRupiah(stats.totalRevenue)}
            </h3>
          </div>
          <div className="size-11 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
            <TrendingUp className="size-5 text-emerald-600" />
          </div>
        </div>

        <div className="text-[11px] text-[#78716C] bg-[#FAFAF9] p-2.5 rounded-xl border border-[#E7E5E4]">
          <span>Akumulasi seluruh pendapatan kado yang pernah diperoleh sanggar.</span>
        </div>
      </div>
    </div>
  );
}
