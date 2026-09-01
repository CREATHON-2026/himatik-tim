"use client";

import React, { useState } from "react";
import { Send, Shield, Building2, CreditCard, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { CreatePayoutRequestInput, PayoutBalance, PayoutRequest } from "../types";

interface PayoutRequestFormProps {
  balance?: PayoutBalance;
  activePayout?: PayoutRequest;
  isSubmitting?: boolean;
  onSubmit: (data: CreatePayoutRequestInput) => Promise<void>;
}

const BANK_OPTIONS = [
  "Bank BCA",
  "Bank Mandiri",
  "Bank BRI",
  "Bank BNI",
  "Bank Sulselbar",
  "Bank Permata",
  "Bank CIMB Niaga",
  "Bank Syariah Indonesia (BSI)",
];

export function PayoutRequestForm({
  balance,
  activePayout,
  isSubmitting,
  onSubmit,
}: PayoutRequestFormProps) {
  const availableBalance = balance ? parseFloat(balance.availableBalance) : 0;
  const isDisabled = availableBalance < 50000 || !!activePayout || isSubmitting;

  const [amountInput, setAmountInput] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountHolder, setAccountHolder] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Helper untuk format angka dengan titik pemisah ribuan (misal: 100000 -> 100.000)
  const formatThousand = (val: string) => {
    const rawDigits = val.replace(/\D/g, "");
    if (!rawDigits) return "";
    return parseInt(rawDigits, 10).toLocaleString("id-ID");
  };

  // Extract raw number value
  const rawAmountNumber = parseInt(amountInput.replace(/\D/g, "") || "0", 10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (isNaN(rawAmountNumber) || rawAmountNumber < 50000) {
      setErrorMsg("Nominal penarikan minimal Rp 50.000");
      return;
    }
    if (rawAmountNumber > availableBalance) {
      setErrorMsg(`Nominal penarikan melebihi saldo tersedia (Rp ${availableBalance.toLocaleString("id-ID")})`);
      return;
    }
    if (!bankName) {
      setErrorMsg("Silakan pilih nama bank tujuan");
      return;
    }
    if (!accountNumber || !/^\d+$/.test(accountNumber) || accountNumber.length < 6) {
      setErrorMsg("Nomor rekening minimal 6 digit angka tanpa spasi");
      return;
    }
    if (!accountHolder || accountHolder.trim().length < 3) {
      setErrorMsg("Nama pemilik rekening minimal 3 karakter");
      return;
    }

    try {
      await onSubmit({
        amount: rawAmountNumber,
        bankName,
        accountNumber,
        accountHolder: accountHolder.trim(),
      });
      setSuccessMsg("Pengajuan penarikan dana berhasil dikirim! Mohon tunggu verifikasi admin.");
      setAmountInput("");
      setBankName("");
      setAccountNumber("");
      setAccountHolder("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengajukan penarikan dana";
      setErrorMsg(msg);
    }
  };

  return (
    <div className="paper-skeuo w-full rounded-[24px] p-6 sm:p-8 space-y-6">
      {/* Form Header */}
      <div className="space-y-1 text-left">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E9D7BE]/60 flex items-center justify-center text-[#3E5237] border border-[#B89A57]/30 shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <h3 className="text-h3 text-xl sm:text-2xl font-bold text-[#3E5237]">
            Ajukan Penarikan Dana
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          Isi data penarikan dengan benar untuk memastikan dana sampai ke rekening Anda.
        </p>

        {/* Floral Ornament Divider matching penarikan-dana.png */}
        <div className="flex items-center justify-center gap-2 pt-3 text-[#B89A57]/60 select-none">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#B89A57]/40"></div>
          <span className="text-xs">❀</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#B89A57]/40"></div>
        </div>
      </div>

      {/* Messages */}
      {errorMsg && (
        <div className="p-3.5 bg-[#D79C9A]/15 border border-[#D79C9A] rounded-xl text-xs sm:text-sm text-[#9A3B39]">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-3.5 bg-[#78865C]/15 border border-[#78865C] rounded-xl text-xs sm:text-sm text-[#3E5237]">
          {successMsg}
        </div>
      )}

      {/* Form Fields: 2-Column Responsive Grid matching penarikan-dana-2.png */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Field 1: Nominal Penarikan */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="payout-amount" className="text-xs sm:text-sm font-semibold text-[#3E5237]">
                1. Nominal Penarikan (Rp)
              </Label>
              {availableBalance >= 50000 && !isDisabled && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setAmountInput(formatThousand(Math.floor(availableBalance * 0.5).toString()))}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[#E9D7BE] text-[#3E5237] hover:bg-[#D8C4A7] transition-all border border-[#B89A57]/30 shadow-2xs cursor-pointer"
                  >
                    50%
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmountInput(formatThousand(Math.floor(availableBalance).toString()))}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[#3E5237] text-white hover:bg-[#3E5237]/90 transition-all shadow-2xs cursor-pointer"
                  >
                    Max (100%)
                  </button>
                </div>
              )}
            </div>
            <Input
              id="payout-amount"
              type="text"
              startIcon={<span className="text-xs font-bold text-[#566B4D]">Rp</span>}
              value={amountInput}
              onChange={(e) => setAmountInput(formatThousand(e.target.value))}
              disabled={isDisabled}
              placeholder="0"
              className="font-semibold"
            />
            <p className="text-[11px] text-[#6B7280]">
              Minimum Rp 50.000 • Maksimum Rp {availableBalance.toLocaleString("id-ID")} (saldo tersedia)
            </p>
          </div>

          {/* Field 2: Nama Bank */}
          <div className="space-y-1.5">
            <Label htmlFor="payout-bank" className="text-xs sm:text-sm font-semibold text-[#3E5237]">
              2. Nama Bank
            </Label>
            <Select variant="skeuo" value={bankName} onValueChange={setBankName} disabled={isDisabled}>
              <SelectTrigger id="payout-bank" startIcon={<Building2 className="w-4 h-4" />} className="w-full">
                <SelectValue placeholder="Pilih nama bank" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {BANK_OPTIONS.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Field 3: Nomor Rekening */}
          <div className="space-y-1.5">
            <Label htmlFor="payout-account-number" className="text-xs sm:text-sm font-semibold text-[#3E5237]">
              3. Nomor Rekening
            </Label>
            <Input
              id="payout-account-number"
              type="text"
              startIcon={<CreditCard className="w-4 h-4" />}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
              disabled={isDisabled}
              placeholder="Masukkan nomor rekening"
              className="font-medium"
            />
            <p className="text-[11px] text-[#6B7280]">
              Hanya angka, tanpa spasi atau tanda strip
            </p>
          </div>

          {/* Field 4: Nama Pemilik Rekening */}
          <div className="space-y-1.5">
            <Label htmlFor="payout-account-holder" className="text-xs sm:text-sm font-semibold text-[#3E5237]">
              4. Nama Pemilik Rekening
            </Label>
            <Input
              id="payout-account-holder"
              type="text"
              startIcon={<User className="w-4 h-4" />}
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              disabled={isDisabled}
              placeholder="Masukkan nama pemilik rekening"
              className="font-medium"
            />
            <p className="text-[11px] text-[#6B7280]">
              Sesuai dengan nama di buku tabungan
            </p>
          </div>
        </div>

        {/* CTA Button - Skeuomorphic 3D Tactile Forest Variant */}
        <Button
          type="submit"
          variant="skeuo-forest"
          size="lg"
          disabled={isDisabled}
          className="w-full flex items-center justify-center gap-2 font-bold"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? "Memproses..." : "Ajukan Penarikan Dana"}</span>
        </Button>

        {/* Security Footer Guarantee */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#6B7280] pt-1">
          <Shield className="w-3.5 h-3.5 text-[#78865C]" />
          <span>Dana akan ditransfer ke rekening Anda setelah diverifikasi oleh tim Bicket.</span>
        </div>
      </form>
    </div>
  );
}
