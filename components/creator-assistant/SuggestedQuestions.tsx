"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUGGESTED_QUESTIONS } from "@/lib/creator-assistant/config";

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void;
  disabled?: boolean;
}

export function SuggestedQuestions({
  onSelectQuestion,
  disabled,
}: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="size-16 rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center mb-4">
        <MessageCircle className="size-8 text-[#6355D9]" />
      </div>

      <h3 className="text-lg font-semibold text-[#111827] mb-2">
        Tanya Gifteria
      </h3>

      <p className="text-sm text-[#78716C] text-center mb-6 max-w-md">
        Tanyakan tentang pendaftaran creator, produk yang dapat dijual, dan
        proses onboarding.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl">
        {SUGGESTED_QUESTIONS.map((question) => (
          <Button
            key={question}
            variant="outline"
            size="sm"
            onClick={() => onSelectQuestion(question)}
            disabled={disabled}
            className="justify-start text-left h-auto py-3 px-4 whitespace-normal"
          >
            <MessageCircle className="size-4 shrink-0 mr-2" />
            <span className="flex-1">{question}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
