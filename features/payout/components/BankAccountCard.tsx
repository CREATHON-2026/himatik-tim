"use client";

import React, { useState } from "react";
import { Building2, Edit2, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBankAccount } from "../api";
import { BankAccount } from "../types";

interface BankAccountCardProps {
  bankAccount: BankAccount;
}

const BANK_OPTIONS = [
  "Bank Central Asia (BCA)",
  "Bank Mandiri",
  "Bank Rakyat Indonesia (BRI)",
  "Bank Negara Indonesia (BNI)",
  "Bank Syariah Indonesia (BSI)",
  "Bank Jago",
  "SeaBank",
  "GoPay / Dana (e-Wallet)",
];

export function BankAccountCard({ bankAccount }: BankAccountCardProps) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<BankAccount>(bankAccount);

  const mutation = useMutation({
    mutationFn: () => updateBankAccount(form),
    onSuccess: () => {
      toast.success("Informasi rekening bank berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["payout-dashboard"] });
      setIsEditing(false);
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "Gagal memperbarui rekening";
      toast.error(msg);
    },
  });

  return (
    <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#F5F5F4] pb-3">
        <div className="flex items-center gap-2">
          <Building2 className="size-4 text-[#6355D9]" />
          <h3 className="font-serif text-base font-bold text-[#111827]">
            Rekening Bank Pencairan
          </h3>
        </div>
        <button
          onClick={() => {
            setForm(bankAccount);
            setIsEditing(true);
          }}
          className="text-xs text-[#6355D9] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
        >
          <Edit2 className="size-3" /> Ubah
        </button>
      </div>

      {/* Account Info Box */}
      <div className="flex items-start gap-4">
        <div className="size-12 rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center text-[#6355D9] shrink-0 font-bold">
          <Building2 className="size-6" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm text-[#111827]">{bankAccount.bankName}</span>
            <CheckCircle2 className="size-3.5 text-emerald-600" />
          </div>
          <p className="font-mono text-sm font-semibold text-[#6355D9] tracking-wider">
            {bankAccount.accountNumber}
          </p>
          <p className="text-xs text-[#78716C]">
            a.n <span className="font-medium text-[#111827]">{bankAccount.accountHolder}</span>
          </p>
        </div>
      </div>

      <div className="text-[11px] text-[#A8A29E] pt-2 border-t border-[#F5F5F4] flex items-center gap-1">
        <span>Rekening ini digunakan otomatis setiap kali mengajukan penarikan dana.</span>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#F5F5F4] pb-3">
              <h3 className="font-serif text-base font-bold text-[#111827]">
                Ubah Rekening Bank
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-full text-[#78716C] hover:bg-[#F5F5F4] cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-[#111827] block">Pilih Bank</label>
                <select
                  value={form.bankName}
                  onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#6355D9]"
                >
                  {BANK_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#111827] block">Nomor Rekening</label>
                <input
                  type="text"
                  value={form.accountNumber}
                  onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                  placeholder="Contoh: 8735091234"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] text-[#111827] font-mono focus:outline-none focus:ring-2 focus:ring-[#6355D9] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#111827] block">Nama Pemilik Rekening</label>
                <input
                  type="text"
                  value={form.accountHolder}
                  onChange={(e) => setForm({ ...form, accountHolder: e.target.value })}
                  placeholder="Sesuai buku tabungan / KTP"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#6355D9] focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#F5F5F4]">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl border border-[#E7E5E4] text-xs font-semibold text-[#78716C] hover:bg-[#F5F5F4] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending || !form.accountNumber || !form.accountHolder}
                className="px-5 py-2 rounded-xl bg-[#6355D9] hover:bg-[#5145C6] text-white text-xs font-semibold shadow-xs transition active:scale-98 cursor-pointer disabled:opacity-50"
              >
                {mutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
