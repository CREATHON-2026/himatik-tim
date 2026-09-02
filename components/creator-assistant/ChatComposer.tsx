"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatComposerProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatComposer({
  onSendMessage,
  disabled,
  placeholder = "Ketik pertanyaan Anda di sini...",
}: ChatComposerProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || disabled) return;

    onSendMessage(trimmed);
    setMessage("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-[#E7E5E4] bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "resize-none min-h-[44px] max-h-32 pr-12",
                "focus-visible:ring-[#6355D9] focus-visible:border-[#6355D9]"
              )}
              aria-label="Ketik pertanyaan Anda"
            />

            <div className="absolute right-2 bottom-2">
              <Button
                size="icon-sm"
                onClick={handleSend}
                disabled={!message.trim() || disabled}
                aria-label="Kirim pesan"
              >
                {disabled ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-[#A8A29E] mt-2 text-center">
          <span className="font-medium">Enter</span> untuk mengirim •{" "}
          <span className="font-medium">Shift + Enter</span> untuk baris baru
        </p>
      </div>
    </div>
  );
}
