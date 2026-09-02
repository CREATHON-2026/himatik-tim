"use client";

/**
 * Order Brief Field Component
 * Displays individual field with state, evidence, and edit capability
 */

import React, { useState } from "react";
import { MessageSquare, AlertCircle, CheckCircle2, HelpCircle, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FieldStateBadge } from "./FieldStateBadge";
import { EvidencePopover } from "./EvidencePopover";
import type { FieldWithEvidence } from "@/lib/order-brief/types";

interface OrderBriefFieldProps {
  label: string;
  fieldPath: string;
  field: FieldWithEvidence;
  onEdit?: (fieldPath: string, value: unknown) => void;
  formatValue?: (value: unknown) => string | null;
  readOnly?: boolean;
}

export function OrderBriefField({
  label,
  fieldPath,
  field,
  onEdit,
  formatValue,
  readOnly = false,
}: OrderBriefFieldProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Don't render if field is missing and has no value
  if (field.state === "MISSING" && !field.value) {
    return null;
  }

  const displayValue = formatValue
    ? formatValue(field.value)
    : field.value
    ? String(field.value)
    : field.rawText || "Belum disepakati";

  const hasEvidence = field.evidenceMessageIds.length > 0;
  const canEdit = !readOnly && onEdit;

  return (
    <div className="space-y-2">
      {/* Label and State */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-700">{label}</label>
          <FieldStateBadge state={field.state} />
        </div>

        {canEdit && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 className="w-3 h-3 mr-1" />
            Edit
          </Button>
        )}
      </div>

      {/* Value Display */}
      <div
        className={cn(
          "px-3 py-2 rounded-md text-sm border",
          field.state === "EXPLICIT" || field.state === "HUMAN_CONFIRMED"
            ? "bg-green-50 border-green-200 text-green-900"
            : field.state === "INFERRED_NEEDS_CONFIRMATION"
            ? "bg-amber-50 border-amber-200 text-amber-900"
            : field.state === "CONFLICT"
            ? "bg-red-50 border-red-200 text-red-900"
            : "bg-gray-50 border-gray-200 text-gray-600"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="flex-1">{displayValue}</span>

          {hasEvidence && (
            <EvidencePopover
              evidenceIds={field.evidenceMessageIds}
              evidenceQuotes={field.evidenceQuotes}
            />
          )}
        </div>

        {/* Source indicator */}
        {field.lastEditedBy && (
          <div className="flex items-center gap-1 mt-2 pt-2 border-t border-current/20">
            <CheckCircle2 className="w-3 h-3" />
            <span className="text-xs">
              Dikonfirmasi oleh {field.lastEditedBy.toLowerCase()}
            </span>
          </div>
        )}
      </div>

      {/* Notes */}
      {field.notes && (
        <p className="text-xs text-gray-500 italic">{field.notes}</p>
      )}
    </div>
  );
}
