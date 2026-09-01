"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface RichEditorProductProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function RichEditorProduct({
  value = "",
  onChange,
  placeholder = "Tuliskan deskripsi lengkap, detail bahan kerajinan, dan keunikan gift...",
  disabled = false,
}: RichEditorProductProps) {
  return (
    <div className="w-full space-y-1.5">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="min-h-[140px] rounded-xl border-[#E7E5E4] bg-white text-sm text-[#111827] focus-visible:ring-[#6355D9] resize-y"
      />
      <div className="flex justify-between text-[11px] text-[#78716C] px-1">
        <span>Gunakan format paragraf yang jelas & informatif.</span>
        <span>{value.length} / 2000 karakter</span>
      </div>
    </div>
  );
}
