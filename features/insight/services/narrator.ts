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
const MAX_FACTS = 10;
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
  'Kamu adalah data analyst yang merangkai fakta toko creator menjadi narasi storytelling bahasa Indonesia santai. Sapa dengan "kamu".\n\n' +
  'ATURAN KETAT:\n' +
  '- Placeholder dalam kurung kurawal {seperti_ini} wajib disalin utuh, tepat satu kali.\n' +
  '- JANGAN menulis angka dalam bentuk apapun (digit maupun kata).\n' +
  '- JANGAN menambah nama, periode, atau prediksi di luar placeholder.\n\n' +
  'STRUKTUR NARASI (storytelling):\n' +
  '1. Paragraf pertama: Ringkasan performa — apa yang terjadi dan seberapa besar.\n' +
  '2. Paragraf kedua: Analisis — apa artinya, tren apa yang terlihat, dan apa yang menonjol.\n' +
  '3. Paragraf ketiga: Rekomendasi — langkah konkret berdasarkan data, bukan opini.\n\n' +
  'Gunakan nada seperti konsultan bisnis yang ramah: informatif, ringkas, dan actionable.';

// --- Utility ----------------------------------------------------------------

/** Pilih & urutkan fakta berdasarkan prioritas */
function usableFacts(payload: any): Fact[] {
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
export function renderTemplate(payload: any): string {
  const quality = payload.data_quality;
  if (quality.status !== "ok") {
    return `Belum cukup transaksi untuk dibuat ringkasannya di periode ini. Baru ada ${quality.transaction_count} transaksi terbayar.`;
  }
  const facts = usableFacts(payload);
  return facts
    .map((f) => f.template.replace(PLACEHOLDER_RE, (_, key) => f.slots[key] ?? `{${key}}`))
    .join(" ");
}

/** Build pesan untuk LLM — hanya template tanpa data spesifik creator */
export function buildLlmMessages(facts: Fact[]) {
  const lines = facts
    .map((f, i) => `${i + 1}. ${f.template}`)
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

// --- Guard v2 ---------------------------------------------------------------

export interface GuardResult {
  ok: boolean;
  reason: string | null;
}

/** Pagar utama v2: AI tidak boleh menulis angka sama sekali */
export function guardDraft(
  draft: string,
  facts: Fact[],
  comparison: any,
  maxSentences = MAX_SENTENCES,
): GuardResult {
  // 1. Digit — angka HANYA dari kode
  if (DIGIT_RE.test(draft)) {
    return { ok: false, reason: "digit_in_output" };
  }

  // 2. Angka dalam bentuk kata
  if (WORD_NUMBER_RE.test(draft)) {
    return { ok: false, reason: "word_number" };
  }

  // 3. Klaim tak terverifikasi
  if (UNVERIFIABLE_RE.test(draft)) {
    return { ok: false, reason: "unverifiable_claim" };
  }

  // 4. Placeholder mismatch — tiap slot tepat sekali
  const expectedSlots = new Map<string, number>();
  for (const f of facts) {
    for (const m of f.template.matchAll(PLACEHOLDER_RE)) {
      expectedSlots.set(m[1], (expectedSlots.get(m[1]) ?? 0) + 1);
    }
  }
  const actualSlots = new Map<string, number>();
  for (const m of draft.matchAll(PLACEHOLDER_RE)) {
    actualSlots.set(m[1], (actualSlots.get(m[1]) ?? 0) + 1);
  }
  if (expectedSlots.size !== actualSlots.size) {
    return { ok: false, reason: "placeholder_mismatch" };
  }
  for (const [key, count] of expectedSlots) {
    if (actualSlots.get(key) !== count) {
      return { ok: false, reason: "placeholder_mismatch" };
    }
  }

  // 5. Arah terbalik
  if (comparison?.available) {
    const pattern = DIRECTION_BANNED[comparison.direction];
    if (pattern && pattern.test(draft)) {
      return { ok: false, reason: "direction_inverted" };
    }
  }

  // 6. Terlalu panjang
  const sentenceCount = (draft.match(/\./g) || []).length;
  if (sentenceCount > maxSentences) {
    return { ok: false, reason: "too_long" };
  }

  // 7. Saran terselubung (jika suggestion dimatikan)
  if (!ENABLE_SUGGESTION) {
    const lowered = draft.toLowerCase();
    if (ADVICE_MARKERS.some((m) => lowered.includes(m))) {
      return { ok: false, reason: "advice_detected" };
    }
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
  payload: any,
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
  } catch {
    return { text: baseline, mode: "template_fallback_llm_error", blocked_reason: null };
  }

  if (!draft) {
    return { text: baseline, mode: "template_fallback_empty", blocked_reason: null };
  }

  // Guard v2
  const guard = guardDraft(draft, facts, payload.comparison);
  if (!guard.ok) {
    return {
      text: baseline,
      mode: `template_fallback_guard`,
      blocked_reason: guard.reason,
    };
  }

  // Substitusi dilakukan kode
  const rendered = renderDraft(draft, facts);

  return { text: rendered, mode: "llm", blocked_reason: null };
}
