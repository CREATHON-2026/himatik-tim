"use client";

/**
 * Clarification Questions Card
 * Shows AI-generated questions that need answers
 */

import React from "react";
import { HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ClarificationQuestion } from "@/lib/order-brief/types";

interface ClarificationQuestionsProps {
  questions: ClarificationQuestion[];
}

export function ClarificationQuestions({
  questions,
}: ClarificationQuestionsProps) {
  if (questions.length === 0) return null;

  // Sort by priority
  const sortedQuestions = [...questions].sort((a, b) => a.priority - b.priority);

  return (
    <Card className="p-4 bg-blue-50 border-blue-200">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-blue-100 shrink-0">
          <HelpCircle className="w-5 h-5 text-blue-600" />
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-sm text-blue-900">
              Pertanyaan Klarifikasi
            </h3>
            <p className="text-xs text-blue-700 mt-1">
              AI mendeteksi beberapa hal yang perlu dikonfirmasi:
            </p>
          </div>

          <ul className="space-y-2">
            {sortedQuestions.map((q, idx) => (
              <li
                key={q.fieldKey + idx}
                className="flex items-start gap-2 text-sm"
              >
                <Badge
                  variant="outline"
                  className="shrink-0 bg-blue-100 text-blue-700 border-blue-200 mt-0.5"
                >
                  {q.priority}
                </Badge>
                <span className="text-blue-900">{q.question}</span>
              </li>
            ))}
          </ul>

          <p className="text-xs text-blue-600 pt-2 border-t border-blue-200">
            Diskusikan di chat untuk melengkapi informasi ini
          </p>
        </div>
      </div>
    </Card>
  );
}
