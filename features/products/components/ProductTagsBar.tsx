"use client";

import React from "react";
import { Sparkles, Flower2, Award, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductTagsBarProps {
  tags?: string[];
  className?: string;
}

const DEFAULT_FALLBACK_TAGS = [
  { label: "Handmade", icon: Sparkles },
  { label: "Bunga Segar", icon: Flower2 },
  { label: "Premium Quality", icon: Award },
];

export function ProductTagsBar({ tags = [], className = "" }: ProductTagsBarProps) {
  // If tags from database exist and are not empty, display them
  const hasDbTags = tags && tags.length > 0;

  return (
    <div className={`flex flex-wrap items-center gap-2 select-none ${className}`}>
      {hasDbTags ? (
        tags.map((tag, idx) => (
          <Badge
            key={`db-tag-${idx}`}
            variant="outline"
            className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold bg-[#FAF6F0] border-[#78865C]/25 text-[#3E5237] rounded-full shadow-xs hover:bg-[#FAF4EC] transition-colors"
          >
            <Tag className="w-3 h-3 text-[#78865C]" />
            <span>{tag}</span>
          </Badge>
        ))
      ) : (
        DEFAULT_FALLBACK_TAGS.map(({ label, icon: Icon }, idx) => (
          <Badge
            key={`fallback-tag-${idx}`}
            variant="outline"
            className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold bg-[#FAF6F0] border-[#78865C]/25 text-[#3E5237] rounded-full shadow-xs hover:bg-[#FAF4EC] transition-colors"
          >
            <Icon className="w-3 h-3 text-[#78865C]" />
            <span>{label}</span>
          </Badge>
        ))
      )}
    </div>
  );
}
