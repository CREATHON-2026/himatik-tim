"use client";

/**
 * Order Brief Header
 * Shows title, status badge, and action buttons
 */

import React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompletenessIndicator } from "./CompletenessIndicator";
import type { BriefCompleteness } from "@/lib/order-brief/types";

interface OrderBriefHeaderProps {
  title: string;
  status: "DRAFT" | "AWAITING_REVIEW" | "AGREED";
  completeness?: BriefCompleteness;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function OrderBriefHeader({
  title,
  status,
  completeness,
  onRefresh,
  isRefreshing = false,
}: OrderBriefHeaderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Memperbarui..." : "Perbarui"}
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <StatusBadge status={status} />
        {completeness && (
          <span className="text-xs text-gray-500">
            {completeness.filledFields}/{completeness.totalRequiredFields}{" "}
            field terisi
          </span>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<
    string,
    { color: string; label: string; variant: "default" | "secondary" | "outline" }
  > = {
    DRAFT: {
      color: "bg-amber-100 text-amber-800 border-amber-200",
      label: "Draft",
      variant: "outline",
    },
    AWAITING_REVIEW: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      label: "Menunggu Review",
      variant: "outline",
    },
    AGREED: {
      color: "bg-green-100 text-green-800 border-green-200",
      label: "Disepakati",
      variant: "outline",
    },
  };

  const config = variants[status] || variants.DRAFT;

  return (
    <Badge variant={config.variant} className={config.color}>
      {config.label}
    </Badge>
  );
}
