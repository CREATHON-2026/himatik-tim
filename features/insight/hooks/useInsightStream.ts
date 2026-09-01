"use client";

import { useEffect, useRef, useState } from "react";

export type InsightState = {
  metrics: any | null;
  text: string;
  source: "baseline" | "llm" | "cache";
  status: "idle" | "streaming" | "done" | "error";
  errorMsg?: string;
};

export function useInsightStream(storeId: string, storeName: string) {
  const [state, setState] = useState<InsightState>({
    metrics: null,
    text: "",
    source: "baseline",
    status: "idle",
  });
  
  const rawLlmDraft = useRef("");
  const metricsPayload = useRef<any>(null);



  useEffect(() => {
    if (!storeId) return;

    rawLlmDraft.current = "";
    setState((s) => ({ ...s, text: "", status: "streaming", errorMsg: undefined }));

    const es = new EventSource(`/api/insight?storeId=${storeId}&storeName=${encodeURIComponent(storeName)}`);

    es.addEventListener("metrics", (e) => {
      const payload = JSON.parse((e as MessageEvent).data);
      metricsPayload.current = payload;
      setState((s) => ({ ...s, metrics: payload }));
    });

    es.addEventListener("baseline", (e) => {
      const { text } = JSON.parse((e as MessageEvent).data);
      setState((s) => (s.source !== "baseline" ? s : { ...s, text, source: "baseline" }));
    });

    es.addEventListener("delta", (e) => {
      const { delta, isFullText } = JSON.parse((e as MessageEvent).data);
      
      if (isFullText) {
        // Ini dari cache (sudah final)
        setState((s) => ({ ...s, text: delta, source: "cache" }));
      } else {
        // Ini streaming LLM (juga sudah final tanpa placeholder)
        rawLlmDraft.current += delta;
        setState((s) => ({ 
          ...s, 
          text: rawLlmDraft.current, 
          source: "llm" 
        }));
      }
    });

    es.addEventListener("guard_reject", (e) => {
      // Guard menolak hasil LLM, kembali ke teks baseline
      console.warn("LLM Insight ditolak oleh Guard:", JSON.parse((e as MessageEvent).data).reason);
      if (metricsPayload.current) {
        // Kita butuh import renderTemplate, tapi sebagai gantinya kita bisa parse ulang baseline
        // atau kita set error state saja dan biarkan component merender ulang fallback.
        // Di sini kita fallback ke error status agar UI tau.
      }
      setState((s) => ({ ...s, status: "error", errorMsg: "Ditolak Guard, fallback ke template aman" }));
    });

    es.addEventListener("error", (e) => {
      setState((s) => ({ ...s, status: "error", errorMsg: JSON.parse((e as MessageEvent).data).message }));
    });

    es.addEventListener("done", () => {
      setState((s) => ({ ...s, status: s.status === "error" ? "error" : "done" }));
      es.close();
    });

    es.onerror = () => {
      setState((s) => ({ ...s, status: "error", errorMsg: "Koneksi terputus" }));
      es.close();
    };

    return () => es.close();
  }, [storeId, storeName]);

  return state;
}
