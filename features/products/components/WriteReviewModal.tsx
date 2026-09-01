"use client";

import React, { useState } from "react";
import { Star, MessageSquarePlus, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { ProductReview } from "@/features/products/types";

interface WriteReviewModalProps {
  productId: string;
  productName: string;
  onReviewCreated: (newReview: ProductReview) => void;
  triggerButton?: React.ReactNode;
}

export function WriteReviewModal({
  productId,
  productName,
  onReviewCreated,
  triggerButton,
}: WriteReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [buyerName, setBuyerName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!buyerName.trim()) {
      toast.error("Silakan masukkan nama Anda");
      return;
    }

    if (comment.trim().length < 3) {
      toast.error("Ulasan minimal 3 karakter");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName: buyerName.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Gagal mengirim ulasan");
      }

      toast.success("Terima kasih! Ulasan Anda berhasil ditambahkan.");
      onReviewCreated(json.data);

      // Reset form & close
      setBuyerName("");
      setComment("");
      setRating(5);
      setOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat mengirim ulasan";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {triggerButton ? (
        <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
          {triggerButton}
        </div>
      ) : (
        <Button
          type="button"
          variant="skeuo-forest"
          size="sm"
          onClick={() => setOpen(true)}
          className="h-8.5 px-3.5 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
        >
          <MessageSquarePlus className="w-3.5 h-3.5 mr-1" />
          <span>Tulis Ulasan</span>
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent variant="skeuo" className="sm:max-w-[480px] p-6">
        <DialogHeader className="text-left space-y-1">
          <div className="flex items-center gap-1.5 text-[#566B4D]">
            <Sparkles className="w-4 h-4 text-[#B89A57]" />
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#78865C]">
              Ulasan Pembeli
            </span>
          </div>
          <DialogTitle className="font-heading text-xl text-[#3E5237] font-bold">
            Tulis Pengalaman Anda
          </DialogTitle>
          <DialogDescription className="text-xs text-[#78865C] font-sans">
            Bagikan ulasan Anda tentang <strong>{productName}</strong> untuk membantu pembeli lain.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2 font-sans select-none">
          {/* 1. Star Rating Selector */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-bold text-[#3E5237]">Rating Kepuasan</Label>
            <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-[#FAF6F0] border border-[#78865C]/20 w-fit">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating !== null ? hoverRating : rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="cursor-pointer p-1 transition-transform hover:scale-120 active:scale-95"
                    aria-label={`Beri bintang ${star}`}
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        isFilled
                          ? "fill-amber-500 text-amber-500"
                          : "text-neutral-300 hover:text-amber-300"
                      }`}
                    />
                  </button>
                );
              })}
              <span className="ml-2 font-heading font-bold text-sm text-[#3E5237] min-w-[50px]">
                {rating === 5 && "Sangat Puas"}
                {rating === 4 && "Puas"}
                {rating === 3 && "Cukup"}
                {rating === 2 && "Kurang"}
                {rating === 1 && "Kecewa"}
              </span>
            </div>
          </div>

          {/* 2. Buyer Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="buyer-name" className="text-xs font-bold text-[#3E5237]">
              Nama Anda
            </Label>
            <Input
              id="buyer-name"
              placeholder="Contoh: Rina Kartika"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="bg-[#FAF6F0] border-[#78865C]/25 text-xs text-[#3E5237] placeholder:text-neutral-400 h-9"
              maxLength={100}
              required
            />
          </div>

          {/* 3. Review Comment */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="review-comment" className="text-xs font-bold text-[#3E5237]">
              Cerita & Komentar
            </Label>
            <textarea
              id="review-comment"
              rows={3}
              placeholder="Ceritakan tentang kesegaran bunga, keindahan wrapping, dan kecepatan pengiriman..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-lg border border-[#78865C]/25 bg-[#FAF6F0] p-3 text-xs text-[#3E5237] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#78865C]/40 resize-none"
              maxLength={1000}
              required
            />
            <span className="text-[10px] text-right text-[#78865C]/70">
              {comment.length}/1000 karakter
            </span>
          </div>

          {/* 4. Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#78865C]/15">
            <Button
              type="button"
              variant="skeuo-paper-secondary"
              size="sm"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="skeuo-forest"
              size="sm"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <span>Kirim Ulasan</span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
}
