"use client";

import { useState, useRef, useCallback } from "react";
import type { SSEMetaEvent, SSEDoneEvent, MessageAnswerStatus } from "../types";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: SSEMetaEvent["sources"];
  actions?: string[];
  answerStatus?: MessageAnswerStatus;
  timestamp: Date;
}

export interface StreamState {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: string | null;
  conversationId: string | null;
}

export function useAskGifteriaStream() {
  const [state, setState] = useState<StreamState>({
    messages: [],
    isStreaming: false,
    error: null,
    conversationId: null,
  });

  const currentStreamRef = useRef<string>("");
  const eventSourceRef = useRef<EventSource | null>(null);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message.trim(),
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isStreaming: true,
      error: null,
    }));

    currentStreamRef.current = "";

    try {
      const response = await fetch("/api/ask-gifteria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
          conversationId: state.conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim pesan");
      }

      if (!response.body) {
        throw new Error("Response body tidak tersedia");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      let metaData: SSEMetaEvent | null = null;
      let assistantMessageId = `assistant-${Date.now()}`;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(":")) continue;

          if (trimmed.startsWith("event:")) {
            continue; // Event type handled by next line
          }

          if (trimmed.startsWith("data:")) {
            const data = trimmed.slice(5).trim();

            try {
              const parsed = JSON.parse(data);

              // Determine event type from previous line or context
              if (parsed.conversationId && parsed.sources !== undefined) {
                // Meta event
                metaData = parsed as SSEMetaEvent;
                setState((prev) => ({
                  ...prev,
                  conversationId: parsed.conversationId,
                }));
              } else if (parsed.delta !== undefined) {
                // Delta event - append to stream
                currentStreamRef.current += parsed.delta;

                setState((prev) => {
                  const messages = [...prev.messages];
                  const lastMessage = messages[messages.length - 1];

                  if (lastMessage?.role === "assistant") {
                    // Update existing assistant message
                    messages[messages.length - 1] = {
                      ...lastMessage,
                      content: currentStreamRef.current,
                    };
                  } else {
                    // Create new assistant message
                    messages.push({
                      id: assistantMessageId,
                      role: "assistant",
                      content: currentStreamRef.current,
                      sources: metaData?.sources || [],
                      actions: metaData?.actions || [],
                      timestamp: new Date(),
                    });
                  }

                  return { ...prev, messages };
                });
              } else if (parsed.messageId) {
                // Done event
                const doneData = parsed as SSEDoneEvent;

                setState((prev) => {
                  const messages = [...prev.messages];
                  const lastMessage = messages[messages.length - 1];

                  if (lastMessage?.role === "assistant") {
                    messages[messages.length - 1] = {
                      ...lastMessage,
                      answerStatus: doneData.answerStatus,
                    };
                  }

                  return {
                    ...prev,
                    messages,
                    isStreaming: false,
                  };
                });
              } else if (parsed.error) {
                // Error event
                setState((prev) => ({
                  ...prev,
                  error: parsed.error,
                  isStreaming: false,
                }));
              }
            } catch (err) {
              console.error("Failed to parse SSE data:", err);
            }
          }
        }
      }
    } catch (err: any) {
      console.error("Stream error:", err);
      setState((prev) => ({
        ...prev,
        error: err.message || "Terjadi kesalahan saat mengirim pesan",
        isStreaming: false,
      }));
    }
  }, [state.conversationId]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const resetConversation = useCallback(() => {
    setState({
      messages: [],
      isStreaming: false,
      error: null,
      conversationId: null,
    });
  }, []);

  return {
    messages: state.messages,
    isStreaming: state.isStreaming,
    error: state.error,
    conversationId: state.conversationId,
    sendMessage,
    clearError,
    resetConversation,
  };
}
