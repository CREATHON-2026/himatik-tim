"use client";

/**
 * Evidence Popover
 * Shows evidence quotes from conversation
 */

import React from "react";
import { MessageSquare } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface EvidencePopoverProps {
  evidenceIds: string[];
  evidenceQuotes: string[];
}

export function EvidencePopover({
  evidenceIds,
  evidenceQuotes,
}: EvidencePopoverProps) {
  if (evidenceIds.length === 0) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs shrink-0"
        >
          <MessageSquare className="w-3 h-3 mr-1" />
          {evidenceIds.length}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-3">
          <div className="space-y-1">
            <h4 className="font-medium text-sm">Sumber dari Percakapan</h4>
            <p className="text-xs text-muted-foreground">
              Field ini diambil dari pesan berikut:
            </p>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {evidenceQuotes.map((quote, idx) => (
              <div
                key={evidenceIds[idx] || idx}
                className="p-2 rounded-md bg-gray-50 border border-gray-200"
              >
                <p className="text-xs text-gray-700 italic">"{quote}"</p>
                <p className="text-[10px] text-gray-500 mt-1">
                  Message ID: {evidenceIds[idx]?.slice(0, 8)}...
                </p>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-gray-500">
            Klik pesan untuk melihat konteks lengkap di chat
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
