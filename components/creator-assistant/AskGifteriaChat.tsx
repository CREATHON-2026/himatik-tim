"use client";

import { useEffect, useRef } from "react";
import { AlertCircle, Shield } from "lucide-react";
import { useAskGifteriaStream } from "@/lib/creator-assistant/hooks/useAskGifteriaStream";
import { ChatMessage } from "./ChatMessage";
import { AnswerSources } from "./AnswerSources";
import { AssistantActions } from "./AssistantActions";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { ChatComposer } from "./ChatComposer";

export function AskGifteriaChat() {
  const {
    messages,
    isStreaming,
    error,
    sendMessage,
    clearError,
  } = useAskGifteriaStream();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        200;

      // Only auto-scroll if user is near the bottom
      if (isNearBottom || isStreaming) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, isStreaming]);

  const handleSendMessage = (message: string) => {
    clearError();
    sendMessage(message);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-h-[900px]">
      {/* Header */}
      <div className="border-b border-[#E7E5E4] bg-white px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-serif font-semibold text-[#111827]">
            Tanya Gifteria
          </h1>
          <p className="text-sm text-[#78716C] mt-1">
            Tanyakan tentang pendaftaran creator, produk, dan proses onboarding
          </p>

          <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-[#F5F3FF] border border-[#DDD6FE]/50">
            <Shield className="size-4 text-[#6355D9] shrink-0" />
            <p className="text-xs text-[#6355D9]">
              Berdasarkan informasi resmi Gifteria
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto bg-[#FAFAF9]"
        role="log"
        aria-live="polite"
        aria-label="Riwayat percakapan"
      >
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <SuggestedQuestions
              onSelectQuestion={handleSendMessage}
              disabled={isStreaming}
            />
          ) : (
            <div className="py-4 space-y-1">
              {messages.map((message, index) => {
                const isLastAssistant =
                  message.role === "assistant" &&
                  index === messages.length - 1;

                return (
                  <div key={message.id}>
                    <ChatMessage message={message} />

                    {message.role === "assistant" && message.sources && (
                      <AnswerSources sources={message.sources} />
                    )}

                    {isLastAssistant && message.actions && (
                      <AssistantActions actionKeys={message.actions} />
                    )}
                  </div>
                );
              })}

              {/* Streaming indicator */}
              {isStreaming && (
                <div className="flex gap-3 px-4 py-3">
                  <div className="size-8 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center shrink-0">
                    <div className="flex gap-1">
                      <div className="size-1.5 rounded-full bg-[#6355D9] animate-bounce [animation-delay:-0.3s]" />
                      <div className="size-1.5 rounded-full bg-[#6355D9] animate-bounce [animation-delay:-0.15s]" />
                      <div className="size-1.5 rounded-full bg-[#6355D9] animate-bounce" />
                    </div>
                  </div>
                  <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm bg-white border border-[#E7E5E4] text-[#78716C]">
                    <p className="text-xs">Sedang menyusun jawaban...</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="border-t border-red-200 bg-red-50 px-6 py-3">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <AlertCircle className="size-4 text-red-600 shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Composer */}
      <ChatComposer
        onSendMessage={handleSendMessage}
        disabled={isStreaming}
      />
    </div>
  );
}
