/**
 * Ask Gifteria Creator Assistant API
 * Streaming endpoint with knowledge-grounded responses and safety guardrails
 */

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { streamOpenRouterForAskGifteria } from "@/lib/creator-assistant/openrouter-client";
import { 
  retrieveKnowledge, 
  isSufficientKnowledge, 
  getSourcesSummary 
} from "@/lib/creator-assistant/retrieval";
import { 
  buildSystemPrompt, 
  buildMessagesForLLM, 
  validateLLMResponse,
  extractActionKeysFromKnowledge 
} from "@/lib/creator-assistant/prompt";
import { validateChatInput, sanitizeText } from "@/lib/creator-assistant/validation";
import { 
  resolveActions, 
  getDefaultActions, 
  getEscalationActions 
} from "@/lib/creator-assistant/actions";
import { FALLBACK_RESPONSE, STREAMING_CONFIG } from "@/lib/creator-assistant/config";
import type { UserContext, ChatMessage, SSEMetaEvent } from "@/lib/creator-assistant/types";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * POST /api/ask-gifteria
 * Stream AI responses based on approved knowledge
 */
export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(
          encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
        );
      };

      try {
        // Parse and validate input
        const body = await req.json();
        const validation = validateChatInput(body);
        
        if (!validation.success) {
          send("error", { error: validation.error || "Input tidak valid" });
          controller.close();
          return;
        }
        
        const { message, conversationId } = validation.data!;
        
        // Handle null conversationId (optional parameter)
        const validConversationId = conversationId || null;
        const sanitizedMessage = sanitizeText(message);
        
        // Get user context from Supabase
        const userContext = await getUserContext();
        
        // Verify conversation ownership if conversationId provided
        let conversation;
        if (validConversationId) {
          conversation = await verifyConversationOwnership(
            validConversationId, 
            userContext
          );
          
          if (!conversation) {
            send("error", { error: "Conversation tidak ditemukan atau tidak diizinkan" });
            controller.close();
            return;
          }
        } else {
          // Create new conversation
          conversation = await prisma.creatorAssistantConversation.create({
            data: {
              userId: userContext.userId || null,
              anonymousSessionHash: userContext.userId 
                ? null 
                : generateSessionHash(req),
              status: "OPEN",
            },
          });
        }
        
        // Save user message
        const userMessage = await prisma.creatorAssistantMessage.create({
          data: {
            conversationId: conversation.id,
            role: "USER",
            content: sanitizedMessage,
          },
        });
        
        // Retrieve approved knowledge
        const retrievalResult = await retrieveKnowledge(sanitizedMessage);
        
        // Check if knowledge is sufficient
        if (!isSufficientKnowledge(retrievalResult, sanitizedMessage)) {
          // Send fallback response without calling LLM
          const escalationActions = getEscalationActions();
          const resolvedActions = resolveActions(escalationActions, userContext);
          
          const meta: SSEMetaEvent = {
            conversationId: conversation.id,
            sources: [],
            actions: resolvedActions.map((a) => a.key),
          };
          
          send("meta", meta);
          send("delta", { delta: FALLBACK_RESPONSE.content });
          
          // Save assistant message
          await prisma.creatorAssistantMessage.create({
            data: {
              conversationId: conversation.id,
              role: "ASSISTANT",
              content: FALLBACK_RESPONSE.content,
              answerStatus: FALLBACK_RESPONSE.answerStatus,
              sourceArticleIds: [],
              actionKeys: escalationActions,
            },
          });
          
          send("done", { 
            messageId: userMessage.id, 
            answerStatus: FALLBACK_RESPONSE.answerStatus 
          });
          controller.close();
          return;
        }
        
        // Get conversation history
        const historyMessages = await prisma.creatorAssistantMessage.findMany({
          where: {
            conversationId: conversation.id,
            id: { not: userMessage.id }, // Exclude current message
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        });
        
        const conversationHistory: ChatMessage[] = historyMessages
          .reverse()
          .map((msg) => ({
            role: msg.role === "USER" ? "user" as const : "assistant" as const,
            content: msg.content,
          }));
        
        // Build system prompt with guardrails
        const systemPrompt = buildSystemPrompt(
          retrievalResult.results,
          userContext,
          conversationHistory
        );
        
        const llmMessages = buildMessagesForLLM(systemPrompt, sanitizedMessage);
        
        // Extract action keys from knowledge
        const knowledgeActionKeys = extractActionKeysFromKnowledge(
          retrievalResult.results
        );
        const defaultActionKeys = getDefaultActions(userContext);
        const combinedActionKeys = Array.from(
          new Set([...knowledgeActionKeys, ...defaultActionKeys])
        );
        
        // Send metadata
        const sources = getSourcesSummary(retrievalResult.results);
        const resolvedActions = resolveActions(combinedActionKeys, userContext);
        
        const meta: SSEMetaEvent = {
          conversationId: conversation.id,
          sources,
          actions: resolvedActions.map((a) => a.key),
        };
        
        send("meta", meta);
        
        // Stream from OpenRouter using Ask Gifteria client
        let fullResponse = "";
        const startTime = Date.now();
        
        try {
          // Build messages with proper roles
          const messagesForLLM = llmMessages.map(msg => ({
            role: msg.role as "system" | "user" | "assistant",
            content: msg.content
          }));
          
          for await (const delta of streamOpenRouterForAskGifteria(messagesForLLM, {
            timeoutMs: STREAMING_CONFIG.TIMEOUT_MS,
            signal: req.signal,
          })) {
            // Filter out thinking process tags and content
            let cleanDelta = delta;
            
            // Remove thinking tags and their content
            cleanDelta = cleanDelta.replace(/<thinking>[\s\S]*?<\/thinking>/gi, '');
            cleanDelta = cleanDelta.replace(/Here's a thinking process:[\s\S]*?(?=\n\n|$)/gi, '');
            cleanDelta = cleanDelta.replace(/\*\*Thinking Process:\*\*[\s\S]*?(?=\n\n|$)/gi, '');
            
            // Skip if delta is empty after cleaning
            if (!cleanDelta.trim()) continue;
            
            fullResponse += cleanDelta;
            send("delta", { delta: cleanDelta });
          }
          
          const latency = Date.now() - startTime;
          
          // Validate LLM response
          const responseValidation = validateLLMResponse(fullResponse);
          
          if (!responseValidation.isValid) {
            console.warn("LLM response validation failed:", responseValidation.reason);
            
            // Fallback to safe response
            send("delta", { delta: "\n\n" + FALLBACK_RESPONSE.content });
            fullResponse = FALLBACK_RESPONSE.content;
          }
          
          // Save assistant message
          const assistantMessage = await prisma.creatorAssistantMessage.create({
            data: {
              conversationId: conversation.id,
              role: "ASSISTANT",
              content: fullResponse,
              answerStatus: responseValidation.isValid ? "ANSWERED" : "ESCALATE",
              sourceArticleIds: sources.map((s) => s.id),
              actionKeys: combinedActionKeys,
              groundingScore: retrievalResult.highestScore,
            },
          });
          
          // Log metrics (safe logging without PII)
          console.log(JSON.stringify({
            tag: "ask_gifteria",
            conversationId: conversation.id,
            messageId: assistantMessage.id,
            hasUser: !!userContext.userId,
            articlesUsed: sources.length,
            highestScore: retrievalResult.highestScore,
            latencyMs: latency,
            responseLength: fullResponse.length,
            answerStatus: assistantMessage.answerStatus,
          }));
          
          send("done", { 
            messageId: assistantMessage.id, 
            answerStatus: assistantMessage.answerStatus 
          });
          
        } catch (err: any) {
          console.error("OpenRouter streaming error:", {
            message: err?.message,
            stack: err?.stack,
            name: err?.name
          });
          
          // Send safe error message
          send("error", { 
            error: "Ask Gifteria sedang mengalami kendala. Silakan coba kembali atau hubungi Operations." 
          });
          
          // Save error state
          await prisma.creatorAssistantMessage.create({
            data: {
              conversationId: conversation.id,
              role: "ASSISTANT",
              content: FALLBACK_RESPONSE.content,
              answerStatus: "ESCALATE",
              sourceArticleIds: [],
              actionKeys: getEscalationActions(),
            },
          });
        }
        
      } catch (err: any) {
        console.error("Ask Gifteria API error:", err);
        send("error", { 
          error: "Terjadi kesalahan. Silakan coba lagi." 
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-store, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

/**
 * Get user context from Supabase session
 */
async function getUserContext(): Promise<UserContext> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return {
        isAuthenticated: false,
        hasCreatorProfile: false,
      };
    }
    
    // Get creator profile and status
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        email: true,
        creatorStatus: true,
        creatorProfile: {
          select: { id: true },
        },
      },
    });
    
    return {
      isAuthenticated: true,
      userId: user.id,
      userEmail: dbUser?.email,
      hasCreatorProfile: !!dbUser?.creatorProfile,
      creatorStatus: dbUser?.creatorStatus,
    };
  } catch (err) {
    console.error("Failed to get user context:", err);
    return {
      isAuthenticated: false,
      hasCreatorProfile: false,
    };
  }
}

/**
 * Verify conversation ownership
 */
async function verifyConversationOwnership(
  conversationId: string,
  userContext: UserContext
) {
  try {
    const conversation = await prisma.creatorAssistantConversation.findUnique({
      where: { id: conversationId },
    });
    
    if (!conversation) return null;
    
    // Check ownership
    if (userContext.userId) {
      // Authenticated user must own the conversation
      if (conversation.userId !== userContext.userId) {
        return null;
      }
    } else {
      // Anonymous user - verify by session hash
      // In production, use secure session tokens
      if (conversation.userId) {
        // This conversation belongs to an authenticated user
        return null;
      }
    }
    
    return conversation;
  } catch (err) {
    console.error("Failed to verify conversation ownership:", err);
    return null;
  }
}

/**
 * Generate anonymous session hash
 * In production, use a more secure session identifier
 */
function generateSessionHash(req: NextRequest): string {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const ua = req.headers.get("user-agent") || "unknown";
  const timestamp = Math.floor(Date.now() / (1000 * 60 * 60)); // Hour bucket
  
  // Simple hash - in production use crypto.createHash
  const hash = Buffer.from(`${ip}-${ua}-${timestamp}`).toString("base64");
  return hash.slice(0, 32);
}
