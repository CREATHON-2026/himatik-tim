"use client";

/**
 * Completeness Indicator
 * Visual progress indicator for brief completeness
 */

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { BriefCompleteness } from "@/lib/order-brief/types";

interface CompletenessIndicatorProps {
  completeness: BriefCompleteness;
  showDetails?: boolean;
}

export function CompletenessIndicator({
  completeness,
  showDetails = true,
}: CompletenessIndicatorProps) {
  const { percentage, filledFields, totalRequiredFields } = completeness;

  const color =
    percentage >= 80
      ? "text-green-600 bg-green-100 border-green-200"
      : percentage >= 50
      ? "text-amber-600 bg-amber-100 border-amber-200"
      : "text-red-600 bg-red-100 border-red-200";

  const progressColor =
    percentage >= 80
      ? "bg-green-500"
      : percentage >= 50
      ? "bg-amber-500"
      : "bg-red-500";

  if (!showDetails) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={cn("h-2 rounded-full transition-all", progressColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }

  return (
    <Card className={cn("p-4 border", color)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold text-sm">
            Kelengkapan: {percentage}%
          </span>
        </div>
        <span className="text-xs">
          {filledFields}/{totalRequiredFields} field
        </span>
      </div>

      <div className="w-full bg-white rounded-full h-2">
        <div
          className={cn("h-2 rounded-full transition-all", progressColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {percentage < 100 && (
        <p className="text-xs mt-2 opacity-80">
          {percentage >= 80
            ? "Hampir lengkap! Tinggal beberapa detail lagi."
            : percentage >= 50
            ? "Sebagian besar informasi sudah tersedia."
            : "Masih banyak informasi yang perlu dilengkapi."}
        </p>
      )}
    </Card>
  );
}
