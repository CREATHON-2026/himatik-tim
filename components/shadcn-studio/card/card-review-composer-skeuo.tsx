"use client";

import React from "react";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export interface CardReviewComposerSkeuoProps {
  userName?: string;
  rating: number;
  hoverRating: number | null;
  onRatingChange: (r: number) => void;
  onHoverRatingChange: (r: number | null) => void;
  comment: string;
  onCommentChange: (c: string) => void;
  imagePreviews?: string[];
  onImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage?: (idx: number) => void;
  onSubmit: () => void | Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function CardReviewComposerSkeuo({
  userName,
  rating,
  hoverRating,
  onRatingChange,
  onHoverRatingChange,
  comment,
  onCommentChange,
  onSubmit,
  onCancel,
  isSubmitting,
}: CardReviewComposerSkeuoProps) {
  return (
    <div className="rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] p-5 space-y-4">
      {userName && (
        <div className="text-xs text-[#78716C]">
          Menulis sebagai: <strong className="text-[#111827]">{userName}</strong>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#111827]">Beri Penilaian:</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRatingChange(star)}
              onMouseEnter={() => onHoverRatingChange(star)}
              onMouseLeave={() => onHoverRatingChange(null)}
              className="p-1 text-[#F59E0B] hover:scale-110 transition"
            >
              <Star
                className="h-5 w-5"
                fill={(hoverRating ?? rating) >= star ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>
      </div>

      <Textarea
        value={comment}
        onChange={(e) => onCommentChange(e.target.value)}
        placeholder="Tulis ulasan Anda tentang kualitas kado dan pelayanan..."
        className="rounded-xl border-[#E7E5E4] bg-white text-sm focus-visible:ring-[#6355D9]"
      />

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Batal
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={onSubmit}
          disabled={isSubmitting || !comment.trim()}
          className="bg-[#6355D9] text-white hover:bg-[#5145C6]"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Kirim Ulasan"}
        </Button>
      </div>
    </div>
  );
}
