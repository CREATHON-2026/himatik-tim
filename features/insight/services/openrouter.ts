/**
 * Bicket · LLM Provider — OpenRouter (Low-Latency)
 * Quick wins: max_tokens, reasoning off, provider routing, timeout + retry, streaming
 */

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

/**
 * Model chain: OpenRouter mencoba berurutan di sisi server.
 * Varian tanpa ":free" tidak antre pool gratis → fix latensi terbesar.
 */
const MODEL_CHAIN = [
  "nvidia/nemotron-3.5-lightning:free", // fallback kalau kredit habis
];

function buildHeaders() {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY belum di-set");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    "HTTP-Referer": process.env.NEXT_PUBLIC_SUPABASE_URL
      ? "https://bicket.app"
      : "http://localhost:3000",
    "X-Title": "Bicket Creator Insight",
  };
}

function buildBody(messages: ChatMessage[], stream: boolean) {
  return {
    models: MODEL_CHAIN,
    provider: {
      // Pilih endpoint tercepat, depriorisasi yang ngantre
      sort: { by: "throughput", partition: "none" },
      allow_fallbacks: true,
    },
    messages,
    stream,
    // Output token = kontributor latensi terbesar. Insight tidak butuh 2000 token.
    max_tokens: 320,
    temperature: 0.3,
    // Matikan reasoning: penyebab utama "lama tapi output-nya pendek"
    reasoning: { enabled: false },
  };
}

export type LlmResult = {
  text: string;
  model?: string;
  latencyMs: number;
  promptTokens?: number;
  completionTokens?: number;
};

/** Non-streaming: dipakai server component & fallback. Timeout + 1 retry. */
export async function callOpenRouter(
  messages: ChatMessage[],
  opts: { timeoutMs?: number; retries?: number } = {}
): Promise<string> {
  const timeoutMs = opts.timeoutMs ?? 8_000;
  const retries = opts.retries ?? 1;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const startedAt = Date.now();

    try {
      const res = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify(buildBody(messages, false)),
        signal: controller.signal,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("OpenRouter API Error:", text);
        throw new Error(`OpenRouter ${res.status}: ${text}`);
      }

      const json = await res.json();
      const content = json.choices?.[0]?.message?.content ?? "";

      console.log(
        JSON.stringify({
          tag: "insight_llm",
          model: json.model,
          latencyMs: Date.now() - startedAt,
          promptTokens: json.usage?.prompt_tokens,
          completionTokens: json.usage?.completion_tokens,
        })
      );

      return content;
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        // Exponential backoff + jitter — hindari retry storm
        await new Promise((r) =>
          setTimeout(r, 400 * 2 ** attempt + Math.random() * 250)
        );
      }
    } finally {
      clearTimeout(timer);
    }
  }

  throw lastError;
}

/** Streaming generator: dipakai SSE route. Token mengalir satu per satu. */
export async function* streamOpenRouter(
  messages: ChatMessage[],
  opts: { timeoutMs?: number; signal?: AbortSignal } = {}
): AsyncGenerator<string> {
  const controller = new AbortController();
  opts.signal?.addEventListener("abort", () => controller.abort());
  const timer = setTimeout(
    () => controller.abort(),
    opts.timeoutMs ?? 25_000
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
