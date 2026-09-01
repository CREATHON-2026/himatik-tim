"use client";

import React from "react";
import type { PayoutBalance, PayoutRequest } from "../types";
import { Info } from "lucide-react";

interface BalanceCardProps {
  balance?: PayoutBalance;
  activePayout?: PayoutRequest;
  isLoading?: boolean;
}

export function BalanceCard({ balance, activePayout, isLoading }: BalanceCardProps) {
  const availableBalance = balance ? parseFloat(balance.availableBalance) : 0;
  const totalEarned = balance ? parseFloat(balance.totalEarned) : 0;
  const totalWithdrawn = balance ? parseFloat(balance.totalWithdrawn) : 0;
  const pendingEscrow = balance?.pendingEscrow ? parseFloat(balance.pendingEscrow) : 0;

  const formattedAvailable = availableBalance.toLocaleString("id-ID");
  const formattedEarned = totalEarned.toLocaleString("id-ID");
  const formattedWithdrawn = totalWithdrawn.toLocaleString("id-ID");
  const formattedPending = pendingEscrow.toLocaleString("id-ID");

  return (
    <div className="paper-skeuo w-full rounded-[24px] overflow-hidden space-y-0">
      {/* Header Banner - Forest Green with Golden Floral Ornament matching penarikan-dana.png */}
      <div className="forest-skeuo px-6 py-4 flex items-center justify-between border-b border-[#B89A57]/30 text-[#FAF4EC]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FAF4EC]/15 backdrop-blur-sm flex items-center justify-center border border-[#FAF4EC]/20 shrink-0">
            <svg className="w-4.5 h-4.5 text-[#F5E9D5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-h3 text-lg sm:text-xl font-bold tracking-wide text-[#FAF4EC]">
            Ringkasan Saldo
          </h2>
        </div>
        <span className="text-[11px] font-medium tracking-wide text-[#E9D7BE] bg-[#FAF4EC]/10 px-3 py-1 rounded-full border border-[#FAF4EC]/15 hidden sm:inline-block">
          Marketplace Virtual Escrow System
        </span>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Main Available Balance with Floral Ornament Divider matching penarikan-dana.png */}
        <div className="text-center space-y-2 py-2 relative">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#566B4D]">
            Saldo Tersedia (Available Balance)
          </span>
          <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#3E5237] tracking-tight">
            {isLoading ? (
              <span className="animate-pulse text-gray-400">Rp ...</span>
            ) : (
              `Rp ${formattedAvailable}`
            )}
          </div>

          {/* Floral Ornament Divider matching mockup */}
          <div className="flex items-center justify-center gap-2 pt-2 text-[#B89A57]/60 select-none">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#B89A57]/40"></div>
            <span className="text-xs">❀</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#B89A57]/40"></div>
          </div>
        </div>

        {/* 3 Supporting Metric Cards - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Total Earned */}
          <div className="bg-[#FAF4EC] border border-[#D8C4A7] rounded-xl p-4 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-[#E9D7BE]/50 flex items-center justify-center shrink-0 border border-[#D8C4A7]/60">
              <span className="font-bold text-[#3E5237] text-xs">Rp</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#566B4D]">Total Pendapatan Bersih</p>
              <p className="font-bold text-[#3E5237] text-base sm:text-lg">
                {isLoading ? "Rp ..." : `Rp ${formattedEarned}`}
              </p>
              <p className="text-[10px] text-gray-500">Order selesai setelah komisi 10%</p>
            </div>
          </div>

          {/* 2. Dana Dalam Proses (Pending Escrow) - BARU */}
          <div className="bg-[#FAF4EC] border border-[#EBC3A8] rounded-xl p-4 flex items-center gap-3.5 shadow-2xs relative">
            <div className="w-10 h-10 rounded-full bg-[#EBC3A8]/40 flex items-center justify-center shrink-0 border border-[#EBC3A8]">
              <span className="font-bold text-[#B89A57] text-xs">⌛</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-xs font-semibold text-[#3E5237]">Dana Dalam Proses</p>
              </div>
              <p className="font-bold text-[#B89A57] text-base sm:text-lg">
                {isLoading ? "Rp ..." : `Rp ${formattedPending}`}
              </p>
              <p className="text-[10px] text-gray-500">Order aktif di Escrow (HELD)</p>
            </div>
          </div>

          {/* 3. Total Withdrawn */}
          <div className="bg-[#FAF4EC] border border-[#D8C4A7] rounded-xl p-4 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-[#E9D7BE]/50 flex items-center justify-center shrink-0 border border-[#D8C4A7]/60">
              <span className="font-bold text-[#3E5237] text-sm">$</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#566B4D]">Total Sudah Ditarik</p>
              <p className="font-bold text-[#3E5237] text-base sm:text-lg">
                {isLoading ? "Rp ..." : `Rp ${formattedWithdrawn}`}
              </p>
              <p className="text-[10px] text-gray-500">Payout selesai & diproses</p>
            </div>
          </div>
        </div>

        {/* Active Payout Banner Alert */}
        {activePayout && (
          <div className="bg-[#FAF4EC] border border-[#EBC3A8] rounded-xl p-4 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-[#B89A57] shrink-0" />
              <p className="text-xs sm:text-sm text-[#3E5237]">
                Anda memiliki 1 pengajuan penarikan dana yang sedang diproses.
              </p>
            </div>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full uppercase shrink-0 ${
                activePayout.status === "PROCESSING"
                  ? "bg-[#EBC3A8] text-[#3E5237]"
                  : "bg-[#D8C4A7] text-[#3E5237]"
              }`}
            >
              {activePayout.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
