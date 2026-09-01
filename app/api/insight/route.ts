import { prisma } from "@/lib/prisma";
import { buildInsightInputs } from "@/features/insight/services/insightInputs";
import { buildLlmMessages, usableFacts, renderTemplate, guardDraft } from "@/features/insight/services/narrator";
import { streamOpenRouter } from "@/features/insight/services/openrouter";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const storeId = searchParams.get("storeId");
  const storeName = searchParams.get("storeName") || "";
  
  if (!storeId) {
    return new Response("storeId wajib", { status: 400 });
  }

  const payload = await buildInsightInputs(storeId, storeName);
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };

      // 1) Kirim data metrik/angka duluan
      send("metrics", payload);

      // 2) Teks deterministik (baseline fallback)
      const baseline = renderTemplate(payload);
      send("baseline", { text: baseline });

      // Jika data tidak cukup, berhenti di sini (jangan panggil LLM)
      if (payload.data_quality.status !== "ok") {
        send("done", { source: "template" });
        controller.close();
        return;
      }

      // Cek Cache (InsightSnapshot)
      // Gunakan periodStart dan periodEnd dari payload
      const periodStart = new Date(payload.period.start);
      const periodEnd = new Date(payload.period.end);
      
      // Cek Cache (InsightSnapshot) - SEMENTARA DIMATIKAN UNTUK TESTING
      // try {
      //   const cached = await prisma.insightSnapshot.findUnique({
      //     where: {
      //       storeId_periodStart_periodEnd: {
      //         storeId,
      //         periodStart,
      //         periodEnd
      //       }
      //     }
      //   });
      //
      //   if (cached && cached.narration && cached.source === "llm") {
      //     send("delta", { delta: cached.narration, isFullText: true });
      //     send("done", { source: "cache" });
      //     controller.close();
      //     return;
      //   }
      // } catch (err) {
      //   console.error("Gagal baca cache:", err);
      // }

      // 3) Streaming dari LLM
      const facts = usableFacts(payload);
      const messages = buildLlmMessages(facts);
      
      let fullDraft = "";
      try {
        for await (const delta of streamOpenRouter(messages, { signal: req.signal })) {
          fullDraft += delta;
          // Kirim delta mentah ke client untuk efek ngetik. Substitusi dilakukan di client.
          send("delta", { delta, isFullText: false });
        }

        // Setelah selesai, validasi dengan Guard v3
        const guard = guardDraft(fullDraft, facts, payload.comparison);
        if (guard.ok) {
          // Simpan ke cache (LLM sudah menghasilkan teks final)
          try {
            await prisma.insightSnapshot.upsert({
              where: {
                storeId_periodStart_periodEnd: {
                  storeId,
                  periodStart,
                  periodEnd
                }
              },
              create: {
                storeId,
                periodStart,
                periodEnd,
                payload,
                narration: fullDraft,
                source: "llm"
              },
              update: {
                payload,
                narration: fullDraft,
                source: "llm"
              }
            });
          } catch (e) {
            console.error("Gagal simpan cache:", e);
          }
        } else {
          // Jika ditolak Guard, kirim error signal ke client agar fallback ke baseline
          send("guard_reject", { reason: guard.reason });
        }

      } catch (err: any) {
        console.error("Streaming error:", err);
        send("error", { message: err.message });
      }

      send("done", { source: "llm" });
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no", // Cegah proxy buffer
    },
  });
}
