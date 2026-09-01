"use client";

import { useInsightStream } from "@/features/insight/hooks/useInsightStream";
import { TrendingUp, Activity } from "lucide-react";

export function AiInsightStreamCard({ storeId, storeName }: { storeId: string; storeName: string }) {
  const { text, status, source, errorMsg } = useInsightStream(storeId, storeName);

  const isError = status === "error" || errorMsg;

  return (
    <div className={`rounded-2xl border ${isError ? "border-red-500/30 bg-red-500/5" : "border-emerald-500/30 bg-gradient-to-b from-emerald-500/5 to-neutral-900/50"} overflow-hidden`}>
      <div className="px-6 pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg border ${isError ? "bg-red-500/10 border-red-500/20" : "bg-emerald-500/10 border-emerald-500/20"}`}>
            <TrendingUp className={`w-5 h-5 ${isError ? "text-red-400" : "text-emerald-400"}`} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              AI Business Insight
              {status === "streaming" && (
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              )}
            </h2>
            <p className="text-[11px] text-neutral-400">Analisis otomatis dari data transaksimu</p>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap min-h-[80px]">
          {text || (status === "streaming" ? "AI sedang mengetik..." : "Menyiapkan data...")}
        </div>
      </div>
      <div className="px-6 py-3 bg-neutral-900/50 border-t border-neutral-800/50 flex justify-between items-center">
        <p className="text-[10px] text-neutral-500 font-mono">
          Sumber: {source} {status === "streaming" ? "(typing...)" : ""} 
          {errorMsg && ` • Error: ${errorMsg}`}
        </p>
        <p className="text-[10px] text-neutral-600">Semua angka dihitung dari data transaksi, bukan AI</p>
      </div>
    </div>
  );
}
