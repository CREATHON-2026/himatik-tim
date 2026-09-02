"use client";

import React, { useState } from "react";
import { Copy, CheckCircle2, Clock, XCircle, Search } from "lucide-react";
import { toast } from "sonner";
import { PayoutTransaction } from "../types";

interface PayoutHistoryTableProps {
  history: PayoutTransaction[];
}

const formatRupiah = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

export function PayoutHistoryTable({ history }: PayoutHistoryTableProps) {
  const [search, setSearch] = useState("");

  const copyToClipboard = (text: string, label: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(text);
      toast.success(`${label} berhasil disalin!`);
    }
  };

  const filtered = history.filter(
    (item) =>
      item.referenceNo.toLowerCase().includes(search.toLowerCase()) ||
      item.bankName.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return {
          label: "Berhasil Ditransfer",
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: CheckCircle2,
        };
      case "REJECTED":
        return {
          label: "Ditolak",
          bg: "bg-rose-50 text-rose-700 border-rose-200",
          icon: XCircle,
        };
      case "PROCESSING":
      default:
        return {
          label: "Sedang Diproses",
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: Clock,
        };
    }
  };

  return (
    <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 shadow-xs space-y-5">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F5F5F4] pb-4">
        <div>
          <h3 className="font-serif text-base font-bold text-[#111827]">
            Riwayat Penarikan Saldo
          </h3>
          <p className="text-xs text-[#78716C] mt-0.5">
            Daftar pengajuan pencairan dana ke rekening bank sanggar.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#A8A29E]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ID Penarikan..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#6355D9] focus:bg-white transition"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E7E5E4] text-[#78716C] text-[11px] uppercase tracking-wider font-semibold">
              <th className="pb-3 pr-4">Tanggal Pengajuan</th>
              <th className="pb-3 px-4">No. Referensi</th>
              <th className="pb-3 px-4">Rekening Tujuan</th>
              <th className="pb-3 px-4 text-right">Nominal</th>
              <th className="pb-3 pl-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F4]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#A8A29E]">
                  Tidak ada riwayat penarikan saldo yang ditemukan.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const badge = getStatusBadge(item.status);
                const StatusIcon = badge.icon;

                return (
                  <tr key={item.id} className="hover:bg-[#FAFAF9] transition">
                    <td className="py-3.5 pr-4 text-[#78716C]">
                      {new Date(item.requestedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#111827]">
                      <button
                        onClick={() => copyToClipboard(item.referenceNo, "No. Referensi")}
                        className="hover:text-[#6355D9] inline-flex items-center gap-1.5 cursor-pointer"
                        title="Klik untuk salin"
                      >
                        <span>#{item.referenceNo}</span>
                        <Copy className="size-3 text-[#A8A29E]" />
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-[#111827]">{item.bankName}</p>
                      <p className="text-[11px] text-[#78716C] font-mono">
                        {item.accountNumber}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-right font-serif font-bold text-sm text-[#111827]">
                      {formatRupiah(item.amount)}
                    </td>
                    <td className="py-3.5 pl-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${badge.bg}`}
                      >
                        <StatusIcon className="size-3" />
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
