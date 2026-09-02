"use client";

/**
 * Field State Badge
 * Visual indicator for field state
 */

import React from "react";
import { CheckCircle2, AlertCircle, HelpCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { OrderBriefFieldState } from "@/lib/order-brief/types";

interface FieldStateBadgeProps {
  state: OrderBriefFieldState;
  showLabel?: boolean;
}

export function FieldStateBadge({ state, showLabel = false }: FieldStateBadgeProps) {
  const config = getStateConfig(state);

  return (
    <Badge
      variant="outline"
      className={`${config.color} text-xs gap-1 px-1.5 py-0`}
    >
      <config.icon className="w-3 h-3" />
      {showLabel && <span>{config.label}</span>}
    </Badge>
  );
}

function getStateConfig(state: OrderBriefFieldState) {
  switch (state) {
    case "EXPLICIT":
      return {
        icon: CheckCircle2,
        label: "Disebutkan di chat",
        color: "bg-green-50 text-green-700 border-green-200",
      };
    case "HUMAN_CONFIRMED":
      return {
        icon: CheckCircle2,
        label: "Terkonfirmasi",
        color: "bg-green-50 text-green-700 border-green-200",
      };
    case "INFERRED_NEEDS_CONFIRMATION":
      return {
        icon: AlertCircle,
        label: "Perlu konfirmasi",
        color: "bg-amber-50 text-amber-700 border-amber-200",
      };
    case "CONFLICT":
      return {
        icon: XCircle,
        label: "Ada konflik",
        color: "bg-red-50 text-red-700 border-red-200",
      };
    case "MISSING":
      return {
        icon: HelpCircle,
        label: "Belum diisi",
        color: "bg-gray-50 text-gray-600 border-gray-200",
      };
    case "NOT_APPLICABLE":
      return {
        icon: HelpCircle,
        label: "Tidak relevan",
        color: "bg-gray-50 text-gray-500 border-gray-200",
      };
    default:
      return {
        icon: HelpCircle,
        label: "Unknown",
        color: "bg-gray-50 text-gray-600 border-gray-200",
      };
  }
}
