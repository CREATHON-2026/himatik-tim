"use client";

import { useState } from "react";
import { ChevronDown, FileText, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SSEMetaEvent } from "@/lib/creator-assistant/types";

interface AnswerSourcesProps {
  sources: SSEMetaEvent["sources"];
}

export function AnswerSources({ sources }: AnswerSourcesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="px-4 pb-3">
      <div className="max-w-[85%] sm:max-w-[75%]">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex items-center gap-2 text-xs text-[#78716C] hover:text-[#6355D9] transition-colors",
            "border-b border-dashed border-[#E7E5E4] pb-1"
          )}
        >
          <Shield className="size-3" />
          <span className="font-medium">
            Sumber resmi ({sources.length} artikel)
          </span>
          <ChevronDown
            className={cn(
              "size-3 transition-transform",
              isExpanded && "rotate-180"
            )}
          />
        </button>

        {isExpanded && (
          <div className="mt-2 space-y-2">
            {sources.map((source) => (
              <div
                key={source.id}
                className="flex items-start gap-2 p-2 rounded-lg bg-[#FAFAF9] border border-[#E7E5E4]"
              >
                <FileText className="size-3.5 text-[#78716C] shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#111827] truncate">
                    {source.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-[#78716C]">
                      {source.category}
                    </span>
                    <span className="text-[10px] text-[#A8A29E]">•</span>
                    <span className="text-[10px] text-[#78716C]">
                      v{source.version}
                    </span>
                    {source.riskLevel !== "GENERAL" && (
                      <>
                        <span className="text-[10px] text-[#A8A29E]">•</span>
                        <span
                          className={cn(
                            "text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase",
                            source.riskLevel === "POLICY"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                          )}
                        >
                          {source.riskLevel === "POLICY" ? "Policy" : "Legal"}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
