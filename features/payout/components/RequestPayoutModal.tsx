"use client";

import React, { useState } from "react";
import { X, Building2, AlertCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestPayout } from "../api";
import { BankAccount } from "../types";

interface RequestPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  bankAccount: BankAccount;
}

const PRESET_AMOUNTS = [100000, 250000, 500000, 1000000];

const formatRupiah = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

export function RequestPayoutModal({
  isOpen,
  onClose,
  availableBalance,
  bankAccount,
}: RequestPayoutModalProps) {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState<number>(Math.min(availableBalance, 500000));
  const [inputStr, setInputStr] = useState<string>(
    String(Math.min(availableBalance, 500000))
  );

  const mutation = useMutation({
    mutationFn: () =>
      requestPayout({
        amount,
        bankName: bankAccount.bankName,
        accountNumber: bankAccount.accountNumber,
        accountHolder: bankAccount.accountHolder,
      }),
    onSuccess: (res) => {
      toast.success(res.message || "Pengajuan penarikan dana berhasil dikirim!");
      queryClient.invalidateQueries({ queryKey: ["payout-dashboard"] });
      onClose();
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "Gagal mengajukan penarikan";
      toast.error(msg);
    },
  });

  if (!isOpen) return null;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, "");
    const num = Number(rawVal);
    setInputStr(rawVal);
    setAmount(num);
  };

  const handleSelectPreset = (val: number) => {
    const clamped = Math.min(val, availableBalance);
    setAmount(clamped);
    setInputStr(String(clamped));
  };

  const handleWithdrawAll = () => {
    setAmount(availableBalance);
    setInputStr(String(availableBalance));
  };

  const isInvalid = amount < 50000 || amount > availableBalance;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F5F5F4] pb-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#111827]">
              Tarik Saldo ke Rekening
            </h3>
            <p className="text-xs text-[#78716C]">
              Saldo tersedia: <strong>{formatRupiah(availableBalance)}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#78716C] hover:bg-[#F5F5F4] transition cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Input Nominal */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-[#111827] block">
            Nominal Penarikan (IDR)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif font-bold text-lg text-[#78716C]">
              Rp
            </span>
            <input
              type="text"
              value={inputStr}
              onChange={handleAmountChange}
              placeholder="50000"
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] font-serif text-xl font-bold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#6355D9] focus:bg-white transition"
            />
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {PRESET_AMOUNTS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleSelectPreset(val)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  amount === val
                    ? "bg-[#6355D9] text-white border-[#6355D9]"
                    : "bg-[#FAFAF9] text-[#44403C] border-[#E7E5E4] hover:bg-[#F5F5F4]"
                }`}
              >
                {formatRupiah(val)}
              </button>
            ))}
            <button
              type="button"
              onClick={handleWithdrawAll}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#EDE9FE] text-[#6355D9] border border-[#DDD6FE] hover:bg-[#DDD6FE]/60 transition cursor-pointer"
            >
              Tarik Semua
            </button>
          </div>

          {amount > availableBalance && (
            <p className="text-xs text-rose-600 flex items-center gap-1 font-medium">
              <AlertCircle className="size-3.5" /> Nominal melebihi saldo tersedia.
            </p>
          )}
          {amount < 50000 && (
            <p className="text-xs text-amber-600 flex items-center gap-1 font-medium">
              <AlertCircle className="size-3.5" /> Minimal penarikan dana adalah Rp50.000.
            </p>
          )}
        </div>

        {/* Destination Bank Account Preview */}
        <div className="p-4 rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE] space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#6355D9] block">
            Rekening Tujuan Pencairan
          </span>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white border border-[#DDD6FE] flex items-center justify-center text-[#6355D9]">
              <Building2 className="size-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-[#111827]">{bankAccount.bankName}</p>
              <p className="font-mono text-xs text-[#78716C]">
                {bankAccount.accountNumber} a.n {bankAccount.accountHolder}
              </p>
            </div>
          </div>
        </div>

        {/* Fee & Calculation */}
        <div className="space-y-1.5 text-xs text-[#78716C] border-t border-[#F5F5F4] pt-3">
          <div className="flex justify-between">
            <span>Biaya Transfer Antarbank</span>
            <span className="font-bold text-emerald-600">Rp0 (Gratis Promo)</span>
          </div>
          <div className="flex justify-between">
            <span>Estimasi Dana Tiba</span>
            <span className="font-semibold text-[#111827]">Instan s.d 1x24 Jam Kerja</span>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-[#E7E5E4] text-xs font-semibold text-[#78716C] hover:bg-[#F5F5F4] transition cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => mutation.mutate()}
            disabled={isInvalid || mutation.isPending}
            className="px-6 py-2.5 rounded-xl bg-[#6355D9] hover:bg-[#5145C6] text-white text-xs font-semibold shadow-xs transition active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            {mutation.isPending ? (
              <span>Memproses...</span>
            ) : (
              <>
                <span>Konfirmasi Penarikan</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
