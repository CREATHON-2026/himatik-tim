/**
 * OpenRouter client specifically for Ask Gifteria
 * Uses different configuration than AI Business Insight
 */

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

/**
 * Use reliable free model for Ask Gifteria
 * Nvidia Nemotron 3.5 Lightning is available for free
 */
const MODEL = "nvidia/nemotron-3.5-lightning:free";

/**
 * Build headers for OpenRouter API requests
 */
function buildHeaders() {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY belum di-set");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    "HTTP-Referer": process.env.NEXT_PUBLIC_SUPABASE_URL
      ? "https://gifteria.app"
      : "http://localhost:3000",
    "X-Title": "Ask Gifteria - Creator Assistant",
  };
}

/**
 * Build request body for OpenRouter
 */
function buildBody(messages: ChatMessage[], stream: boolean) {
  return {
    model: MODEL,
    messages,
    stream,
    max_tokens: 800, // Increased to prevent cut-off responses
    temperature: 0.15, // Lower temperature for factual responses
    top_p: 0.9,
  };
}

/**
 * Streaming generator for Ask Gifteria
 * Uses single reliable free model directly (no fallback chain)
 * to avoid timeout delays from broken models upstream.
 */
export async function* streamOpenRouterForAskGifteria(
  messages: ChatMessage[],
  opts: { timeoutMs?: number; signal?: AbortSignal } = {}
): AsyncGenerator<string> {
  const controller = new AbortController();
  opts.signal?.addEventListener("abort", () => controller.abort());
  const timer = setTimeout(
    () => controller.abort(),
    opts.timeoutMs ?? 45_000 // Increased from 25s to 45s
  );

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(buildBody(messages, true)),
      signal: controller.signal,
    });

    if (!res.ok || !res.body) {
      const text = await res.text();
      console.error("OpenRouter API Error Response:", {
        status: res.status,
        statusText: res.statusText,
        body: text
      });
      throw new Error(`OpenRouter stream ${res.status}: ${text}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(":")) continue; // keep-alive comment
        if (!trimmed.startsWith("data:")) continue;

        const payload = trimmed.slice(5).trim();
        if (payload === "[DONE]") return;

        try {
          const delta = JSON.parse(payload)?.choices?.[0]?.delta?.content;
          if (delta) yield delta as string;
        } catch {
          // chunk belum utuh, lanjut
        }
      }
    }
  } finally {
    clearTimeout(timer);
  }
}