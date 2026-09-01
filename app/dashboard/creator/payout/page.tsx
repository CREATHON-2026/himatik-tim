"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Wallet, RefreshCw, Info, HelpCircle } from "lucide-react";
import { getPayoutDashboardData } from "@/features/payout/api";
import { PayoutBalanceHeader } from "@/features/payout/components/PayoutBalanceHeader";
import { BankAccountCard } from "@/features/payout/components/BankAccountCard";
import { PayoutHistoryTable } from "@/features/payout/components/PayoutHistoryTable";
import { RequestPayoutModal } from "@/features/payout/components/RequestPayoutModal";

export default function CreatorPayoutPage() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["payout-dashboard"],
    queryFn: getPayoutDashboardData,
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="size-10 border-4 border-[#6355D9] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-medium text-[#78716C]">Memuat data saldo & keuangan sanggar...</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    availableBalance: 0,
    inEscrowBalance: 0,
    totalRevenue: 0,
    totalWithdrawn: 0,
  };

  const bankAccount = data?.bankAccount || {
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "8735-0912-34",
    accountHolder: "Sanggar Kriya Creathon",
  };

  const history = data?.history || [];

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#EDE9FE] border border-[#DDD6FE] text-[#6355D9]">
              <Wallet className="size-4" />
            </span>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#111827]">
              Saldo & Penarikan Dana
            </h1>
          </div>
          <p className="text-xs text-[#78716C] mt-1">
            Pantau saldo pendapatan kriya sanggar dan cairkan dana langsung ke rekening bank Anda.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E7E5E4] bg-white hover:bg-[#F5F5F4] text-xs font-semibold text-[#111827] transition shadow-2xs cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`size-3.5 ${isRefetching ? "animate-spin text-[#6355D9]" : ""}`} />
          <span>{isRefetching ? "Menyinkronkan..." : "Segarkan Saldo"}</span>
        </button>
      </div>

      {/* ─── 1. Main Balance Metric Cards ─── */}
      <PayoutBalanceHeader
        stats={stats}
        onRequestWithdraw={() => setIsWithdrawModalOpen(true)}
      />

      {/* ─── 2. Bank Account & Guidelines (2 Cols) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7">
          <BankAccountCard bankAccount={bankAccount} />
        </div>

        <div className="lg:col-span-5 bg-white border border-[#E7E5E4] rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F5F5F4] pb-3">
            <HelpCircle className="size-4 text-[#6355D9]" />
            <h3 className="font-serif text-base font-bold text-[#111827]">
              Ketentuan Pencairan Dana
            </h3>
          </div>

          <ul className="space-y-2.5 text-xs text-[#78716C] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="size-1.5 rounded-full bg-[#6355D9] mt-1.5 shrink-0" />
              <span>
                Minimal penarikan dana adalah <strong>Rp50.000</strong> per transaksi.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="size-1.5 rounded-full bg-[#6355D9] mt-1.5 shrink-0" />
              <span>
                Biaya transfer antarbank <strong>Rp0 (Gratis Promo Creathon)</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="size-1.5 rounded-full bg-[#6355D9] mt-1.5 shrink-0" />
              <span>
                Dana dari pesanan otomatis masuk ke saldo siap tarik segera setelah status pesanan <strong>Selesai</strong>.
              </span>
            </li>
          </ul>

          <div className="p-3 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] text-[11px] text-[#78716C] flex items-center gap-2">
            <Info className="size-4 text-[#6355D9] shrink-0" />
            <span>Butuh bantuan pencairan? Hubungi tim Helpdesk Creathon.</span>
          </div>
        </div>
      </div>

      {/* ─── 3. Payout History Ledger ─── */}
      <PayoutHistoryTable history={history} />

      {/* ─── 4. Request Withdrawal Modal ─── */}
      <RequestPayoutModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        availableBalance={stats.availableBalance}
        bankAccount={bankAccount}
      />
    </div>
  );
}
