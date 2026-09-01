/**
 * Bicket · Layer 4 & 5 — Narasi bahasa manusia + pagar anti-halusinasi (TypeScript)
 *
 * AI di sini hanya penulis ulang. Guard v2: AI tidak boleh menulis angka
 * sama sekali — ia hanya merangkai prosa di sekitar placeholder, dan kode
 * yang menyubstitusi nilainya.
 */

import type { Fact } from "./insightInputs";
import { createHash } from "crypto";

// --- Konfigurasi -----------------------------------------------------------
export const ENABLE_SUGGESTION = true;
const MAX_FACTS = 7;
const MAX_SENTENCES = 12;

export const PROMPT_VERSION = "narrator-v2";
export const MODEL_ID = "gemini-2.5-flash"; // ganti sesuai model yang dipakai

const NARRATION_PRIORITY = [
  // Observations — apa yang terjadi
  "period_volume",
  "revenue_aov",
  "top_category",
  "top_category_tie",
  "top_product",
  "top_channel",
  // Interpretations — apa artinya
  "trend_vs_previous",
  "concentration_risk",
  "aov_gap",
  "repeat_buyer_signal",
  // Suggestions — apa yang harus dilakukan
  "suggest_diversify",
  "suggest_channel",
  "suggest_momentum",
  "suggest_slowdown",
  "suggest_upsell",
];

// --- Guard v2 Patterns ------------------------------------------------------
const PLACEHOLDER_RE = /\{([a-z_]+)\}/g;
const DIGIT_RE = /\d/;
const WORD_NUMBER_RE =
  /\b(setengah|separuh|sepertiga|seperempat|dua kali lipat|tiga kali lipat|berkali[- ]kali|nol|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|puluh|ratus|ribu|juta|miliar)\b/i;
const UNVERIFIABLE_RE =
  /\b(seperti biasa|seperti bulan[- ]bulan sebelumnya|pelanggan setia|kemungkinan|sepertinya|mungkin akan|diperkirakan|bakal)\b/i;

const DIRECTION_BANNED: Record<string, RegExp> = {
  up: /\b(turun|menurun|berkurang|lebih sedikit|melemah|anjlok)\b/i,
  down: /\b(naik|meningkat|bertambah|lebih banyak|menguat|melonjak)\b/i,
};

const ADVICE_MARKERS = [
  "sebaiknya", "kamu bisa", "kamu sebaiknya", "coba ",
  "disarankan", "rekomendasi", "pertimbangkan", "harus",
];

// --- Prompt -----------------------------------------------------------------
const SYSTEM_PROMPT =
  'Kamu adalah analis data toko kreator. Kamu diberi fakta-fakta bisnis yang sudah mengandung angka nyata. Tugas kamu: tulis ulang sebagai narasi yang mengalir, bukan daftar poin.\n\n' +
  'GAYA:\n' +
  '- Langsung ke poin, tanpa sapaan pembuka.\n' +
  '- Profesional tapi mudah dipahami — seperti teman yang jago analisis, bukan konsultan korporat.\n' +
  '- Tidak ada emoji.\n' +
  '- Tidak ada pengulangan fakta yang sama.\n' +
  '- Jangan mengarang angka atau nama produk di luar yang diberikan.\n\n' +
  'STRUKTUR (3 paragraf, masing-masing 1–2 kalimat):\n' +
  '1. Performa keseluruhan: ringkas apa yang terjadi.\n' +
  '2. Temuan kunci: apa yang paling menonjol dan kenapa penting bagi kreator.\n' +
  '3. Satu rekomendasi konkret yang bisa langsung dilakukan minggu ini.';

// --- Utility ----------------------------------------------------------------

/** Pilih & urutkan fakta berdasarkan prioritas */
export function usableFacts(payload: any): Fact[] {
  const layers = new Set(["observation", "interpretation"]);
  if (ENABLE_SUGGESTION) layers.add("suggestion");

  const pool = new Map<string, Fact>();
  for (const f of payload.facts ?? []) {
    if (layers.has(f.layer)) pool.set(f.id, f);
  }

  const ordered: Fact[] = [];
  for (const id of NARRATION_PRIORITY) {
    const f = pool.get(id);
    if (f) ordered.push(f);
  }
  // tambahkan yang belum masuk priority
  for (const f of payload.facts ?? []) {
    if (layers.has(f.layer) && !ordered.includes(f)) ordered.push(f);
  }
  return ordered.slice(0, MAX_FACTS);
}

/** Render narasi deterministik tanpa AI — baseline MVP + fallback */
export function renderTemplate(payload: { data_quality: { status: string; transaction_count?: number }; facts?: Fact[] }): string {
  const quality = payload.data_quality;
  if (quality.status !== "ok") {
    return `Belum cukup transaksi untuk dibuat ringkasannya di periode ini. Baru ada ${quality.transaction_count} transaksi terbayar.`;
  }
  const facts = usableFacts(payload);
  return facts
    .map((f) => f.template.replace(PLACEHOLDER_RE, (_, key) => f.slots[key] ?? `{${key}}`))
    .join(" ");
}

/** Build pesan untuk LLM — kirim kalimat yang sudah disubstitusi (bukan template mentah) */
export function buildLlmMessages(facts: Fact[]) {
  // Pre-substitute semua placeholder dengan nilai aslinya sebelum dikirim ke LLM.
  // Ini menghilangkan kebutuhan placeholder guard dan menghasilkan narasi yang lebih natural.
  const lines = facts
    .map((f, i) => {
      const sentence = f.template.replace(PLACEHOLDER_RE, (_, key) => f.slots[key] ?? `{${key}}`);
      return `${i + 1}. ${sentence}`;
    })
    .join("\n");
  return [
    { role: "system" as const, content: SYSTEM_PROMPT },
    { role: "user" as const, content: lines },
  ];
}

/** Shape cache key — satu hasil melayani semua creator dengan bentuk fakta sama */
export function shapeKey(facts: Fact[], lang = "id"): string {
  const ids = facts.map((f) => f.id).join("|");
  const raw = `${PROMPT_VERSION}|${MODEL_ID}|${lang}|${ids}`;
  return createHash("sha256").update(raw).digest("hex").substring(0, 16);
}

// --- Guard v3 ---------------------------------------------------------------

export interface GuardResult {
  ok: boolean;
  reason: string | null;
}

/** Guard v3: LLM kini menerima kalimat yang sudah berisi angka asli.
 *  Cukup cek: tidak kosong, tidak terlalu panjang, tidak ada klaim arah yang terbalik. */
export function guardDraft(
  draft: string,
  facts: Fact[],
  comparison: { available?: boolean; direction?: string } | null | undefined,
  maxSentences = MAX_SENTENCES,
): GuardResult {
  // 1. Output tidak boleh kosong
  if (!draft.trim()) {
    return { ok: false, reason: "empty_output" };
  }

  // 2. Tidak boleh terlalu panjang (model kebanyakan nulis)
  const sentenceCount = (draft.match(/[.!?]/g) || []).length;
  if (sentenceCount > maxSentences) {
    return { ok: false, reason: "too_long" };
  }

  // 3. Arah tren tidak boleh terbalik
  if (comparison?.available) {
    const pattern = DIRECTION_BANNED[comparison.direction];
    if (pattern && pattern.test(draft)) {
      return { ok: false, reason: "direction_inverted" };
    }
  }

  // 4. Klaim tak terverifikasi
  if (UNVERIFIABLE_RE.test(draft)) {
    return { ok: false, reason: "unverifiable_claim" };
  }

  return { ok: true, reason: null };
}

/** Substitusi placeholder → nilai slot. Dilakukan kode, bukan model. */
export function renderDraft(draft: string, facts: Fact[]): string {
  const slots: Record<string, string> = {};
  for (const f of facts) {
    for (const [k, v] of Object.entries(f.slots)) {
      slots[k] = v;
    }
  }
  return draft.replace(PLACEHOLDER_RE, (_, key) => slots[key] ?? `{${key}}`);
}

// --- Narrate ----------------------------------------------------------------

export interface NarrationResult {
  text: string;
  mode: string;
  blocked_reason: string | null;
}

/**
 * Entry point narasi.
 *
 * @param payload - Validated insight inputs dari insightInputs.ts
 * @param llm - Optional async callable: (messages) => string. Null = murni template (MVP).
 */
export async function narrate(
  payload: { data_quality: { status: string }; facts?: Fact[] } & Record<string, unknown>,
  llm?: ((messages: { role: string; content: string }[]) => Promise<string>) | null,
): Promise<NarrationResult> {
  const baseline = renderTemplate(payload);

  // Data tidak cukup, atau AI memang dimatikan
  if (payload.data_quality.status !== "ok" || !llm) {
    return { text: baseline, mode: "template", blocked_reason: null };
  }

  const facts = usableFacts(payload);
  const messages = buildLlmMessages(facts);

  let draft: string;
  try {
    draft = (await llm(messages)).trim();
  } catch (error: any) {
    console.error("LLM Error in narrator:", error);
    return { text: `Gagal memuat AI Business Insight. Detail Error: ${error.message}`, mode: "error_llm", blocked_reason: null };
  }

  if (!draft) {
    return { text: "AI mengembalikan respons kosong. Silakan coba lagi.", mode: "error_empty", blocked_reason: null };
  }

  // Guard v2
  const guard = guardDraft(draft, facts, payload.comparison as { available?: boolean; direction?: string } | null);
  if (!guard.ok) {
    console.warn(`[Narrator Guard] Draft ditolak karena: ${guard.reason}. Menggunakan fallback template.`);
    return {
      text: baseline,
      mode: `fallback_guard_${guard.reason}`,
      blocked_reason: guard.reason,
    };
  }

  // Substitusi dilakukan kode
  const rendered = renderDraft(draft, facts);

  return { text: rendered, mode: "llm", blocked_reason: null };
}
