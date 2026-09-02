"use client";

import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/lib/creator-assistant/hooks/useAskGifteriaStream";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="size-8 rounded-full bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center shrink-0">
          <Bot className="size-4 text-[#6355D9]" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm",
          isUser
            ? "bg-[#6355D9] text-white"
            : "bg-white border border-[#E7E5E4] text-[#111827]"
        )}
      >
        <div className="whitespace-pre-wrap break-words leading-relaxed">
          {message.content}
        </div>

        {!isUser && message.answerStatus === "ESCALATE" && (
          <div className="mt-2 pt-2 border-t border-[#E7E5E4]/50">
            <p className="text-xs text-[#78716C] italic">
              Untuk informasi lebih lanjut, silakan hubungi tim Operations.
            </p>
          </div>
        )}
      </div>

      {isUser && (
        <div className="size-8 rounded-full bg-gradient-to-br from-[#6355D9] to-[#8B5CF6] flex items-center justify-center shrink-0">
          <User className="size-4 text-white" />
        </div>
      )}
    </div>
  );
}
