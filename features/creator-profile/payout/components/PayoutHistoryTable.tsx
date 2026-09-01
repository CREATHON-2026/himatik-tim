"use client";

import React, { useState } from "react";
import type { PayoutRequest, PayoutStatus } from "../types";
import { Info, ChevronLeft, ChevronRight, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PayoutHistoryTableProps {
  history: PayoutRequest[];
  isLoading?: boolean;
}

export function PayoutHistoryTable({ history, isLoading }: PayoutHistoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(history.length / itemsPerPage) || 1;
  const paginatedItems = history.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: PayoutStatus) => {
    switch (status) {
      case "PENDING":
        return (
          <div className="flex flex-col items-center gap-0.5">
            <Badge variant="skeuo-gold" className="px-3 py-1 font-bold text-xs">
              PENDING
            </Badge>
            <span className="text-[10px] text-[#8A6D1C] font-medium">Menunggu Review</span>
          </div>
        );
      case "PROCESSING":
        return (
          <div className="flex flex-col items-center gap-0.5">
            <Badge variant="skeuo-peach" className="px-3 py-1 font-bold text-xs">
              PROCESSING
            </Badge>
            <span className="text-[10px] text-[#A86B4C] font-medium">Sedang Ditransfer</span>
          </div>
        );
      case "COMPLETED":
        return (
          <div className="flex flex-col items-center gap-0.5">
            <Badge variant="skeuo-sage" className="px-3 py-1 font-bold text-xs">
              COMPLETED
            </Badge>
            <span className="text-[10px] text-[#3E5237] font-medium">Selesai</span>
          </div>
        );
      case "REJECTED":
        return (
          <div className="flex flex-col items-center gap-0.5">
            <Badge variant="skeuo-sand" className="px-3 py-1 font-bold text-xs text-[#803020]">
              REJECTED
            </Badge>
            <span className="text-[10px] text-[#903020] font-medium">Ditolak</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getBankBadgeLogo = (bankName: string) => {
    const cleanBank = bankName.toUpperCase().trim();
    if (cleanBank.includes("BCA")) {
      return (
        <div className="w-8 h-8 rounded-lg bg-[#005B9C] text-white flex items-center justify-center font-bold text-[10px] tracking-tight shrink-0 shadow-2xs">
          BCA
        </div>
      );
    }
    if (cleanBank.includes("MANDIRI")) {
      return (
        <div className="w-8 h-8 rounded-lg bg-[#003B6E] text-[#FFB703] flex items-center justify-center font-bold text-[9px] tracking-tighter shrink-0 shadow-2xs">
          mandiri
        </div>
      );
    }
    if (cleanBank.includes("BRI")) {
      return (
        <div className="w-8 h-8 rounded-lg bg-[#00529C] text-white flex items-center justify-center font-bold text-[10px] tracking-tight shrink-0 shadow-2xs">
          BRI
        </div>
      );
    }
    if (cleanBank.includes("BNI")) {
      return (
        <div className="w-8 h-8 rounded-lg bg-[#E05300] text-white flex items-center justify-center font-bold text-[10px] tracking-tight shrink-0 shadow-2xs">
          BNI
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-lg bg-[#3E5237] text-[#F5E9D5] flex items-center justify-center font-bold text-[10px] tracking-tight shrink-0 shadow-2xs">
        {cleanBank.slice(0, 3)}
      </div>
    );
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return (
        <div className="space-y-0.5">
          <div className="font-bold text-xs text-[#3E5237]">
            {d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
          </div>
          <div className="text-[11px] text-[#6B7280]">
            {d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
          </div>
        </div>
      );
    } catch {
      return <div className="text-xs text-[#3E5237]">{dateStr}</div>;
    }
  };

  return (
    <div className="paper-skeuo w-full rounded-[24px] p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="space-y-1 pb-3 border-b border-[#B89A57]/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E9D7BE]/60 flex items-center justify-center text-[#3E5237] border border-[#B89A57]/30 shrink-0">
            <History className="w-5 h-5" />
          </div>
          <h3 className="text-h3 text-xl sm:text-2xl font-bold text-[#3E5237]">
            Riwayat Penarikan Dana
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          Berikut riwayat semua pengajuan penarikan dana Anda.
        </p>
      </div>

      {/* Table Container - Skeuomorphic Sunken Inner Card */}
      <div className="overflow-x-auto rounded-[16px] border border-[#B89A57]/30 bg-[#E6DCBE]/40 shadow-inner">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead className="bg-[#E9D7BE]/80 text-[#3E5237] font-semibold border-b border-[#B89A57]/30">
            <tr>
              <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider text-[#3E5237]">Tanggal Pengajuan</th>
              <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider text-[#3E5237]">Bank & Rekening</th>
              <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider text-[#3E5237]">Jumlah (Rp)</th>
              <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider text-[#3E5237] text-center">Status</th>
              <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider text-[#3E5237]">Catatan Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#B89A57]/20 text-[#3E5237] bg-[#FAF4EC]/70">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#6B7280]">
                  Memuat riwayat penarikan dana...
                </td>
              </tr>
            ) : paginatedItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#6B7280]">
                  Belum ada riwayat penarikan dana.
                </td>
              </tr>
            ) : (
              paginatedItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#E9D7BE]/30 transition-colors">
                  {/* Tanggal */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </td>

                  {/* Bank & Rekening */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {getBankBadgeLogo(item.bankName)}
                      <div>
                        <div className="font-bold text-xs text-[#3E5237]">{item.bankName}</div>
                        <div className="text-xs text-[#566B4D] font-mono tracking-wide">{item.accountNumber}</div>
                        <div className="text-[11px] text-[#6B7280]">{item.accountHolder}</div>
                      </div>
                    </div>
                  </td>

                  {/* Jumlah */}
                  <td className="py-4 px-4 font-heading font-bold text-base text-[#3E5237] whitespace-nowrap">
                    Rp {parseFloat(item.amount).toLocaleString("id-ID")}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>

                  {/* Catatan Admin */}
                  <td className="py-4 px-4 text-xs text-[#6B7280]">
                    {item.adminNote ? (
                      <div className="flex items-start gap-1.5">
                        {item.status === "REJECTED" && (
                          <Info className="w-4 h-4 text-[#D79C9A] shrink-0 mt-0.5" />
                        )}
                        <span>{item.adminNote}</span>
                      </div>
                    ) : (
                      <span className="italic text-gray-400">
                        {item.status === "PENDING"
                          ? "Menunggu verifikasi dokumen & data."
                          : item.status === "PROCESSING"
                          ? "Dana sedang ditransfer ke rekening Anda."
                          : item.status === "COMPLETED"
                          ? "Berhasil ditransfer."
                          : "-"}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {!isLoading && history.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-[#6B7280]">
          <div>
            Menampilkan {Math.min((currentPage - 1) * itemsPerPage + 1, history.length)} –{" "}
            {Math.min(currentPage * itemsPerPage, history.length)} dari {history.length} data
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="skeuo-paper-secondary"
              size="icon-sm"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="skeuo-forest"
              size="icon-sm"
              className="font-bold text-xs pointer-events-none"
            >
              {currentPage}
            </Button>

            <Button
              variant="skeuo-paper-secondary"
              size="icon-sm"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
