"use client";

import React from "react";
import Image from "next/image";
import { Star, CheckCircle, Camera, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CardReviewComposerSkeuoProps {
  userName: string;
  rating: number;
  hoverRating: number | null;
  onRatingChange: (rating: number) => void;
  onHoverRatingChange: (rating: number | null) => void;
  comment: string;
  onCommentChange: (comment: string) => void;
  imagePreviews: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  className?: string;
}

export function CardReviewComposerSkeuo({
  userName,
  rating,
  hoverRating,
  onRatingChange,
  onHoverRatingChange,
  comment,
  onCommentChange,
  imagePreviews,
  onImageUpload,
  onRemoveImage,
  onSubmit,
  onCancel,
  isSubmitting = false,
  className = "",
}: CardReviewComposerSkeuoProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={`relative w-full rounded-[32px] sm:rounded-[38px] p-2 sm:p-2.5 border border-[#E2D5C3] bg-linear-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#EAE0CE] shadow-[0_22px_45px_-12px_rgba(62,82,55,0.12),0_4px_12px_rgba(0,0,0,0.03),inset_0_2.5px_0_rgba(255,255,255,1),inset_0_-3px_5px_rgba(216,199,176,0.6)] ${className}`}
    >
      {/* INNER DEBOSSED GROOVE FRAME WITH INSET CAVITY SHADOW */}
      <div className="w-full h-full rounded-art-nouveau sm:rounded-[30px] border border-[#DECDB8]/90 bg-[#FAF5EC]/85 p-4 sm:p-6 shadow-[inset_0_2.5px_6px_rgba(62,82,55,0.08),inset_0_-1.5px_2px_rgba(255,255,255,0.95)] flex flex-col gap-4">
        {/* 1. TOP HEADER: USER IDENTITY & STATUS */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-linear-to-b from-[#4A6342] to-[#3E5237] text-white flex items-center justify-center font-bold text-xs shadow-[0_2px_6px_rgba(62,82,55,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] border border-[#566B4D]/40">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-sm sm:text-base font-bold text-[#3E5237]">
                Tulis Ulasan Anda
              </span>
              <span className="text-[11px] text-[#78865C] font-sans">
                Mengulas sebagai <strong className="text-[#3E5237] font-semibold">{userName}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#566B4D] font-bold bg-[#FAF6F0] px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#566B4D]/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_2px_rgba(62,82,55,0.05)]">
              <CheckCircle className="w-3.5 h-3.5 text-[#566B4D]" /> Akun Terverifikasi
            </span>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-7 h-7 rounded-full bg-[#FAF6F0] hover:bg-[#F3ECE0] border border-[#D8C7B0]/50 shadow-xs flex items-center justify-center text-[#78865C] hover:text-[#3E5237] transition-all cursor-pointer"
                title="Tutup Form"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 2. SUNKEN STAR RATING SELECTOR */}
        <div className="flex items-center gap-2.5 select-none bg-[#F3EBE0]/80 p-2 sm:p-2.5 px-3.5 rounded-[16px] border border-[#D8C7B0]/60 w-fit shadow-[inset_0_1.5px_3px_rgba(62,82,55,0.08),inset_0_-1px_1px_rgba(255,255,255,0.85)]">
          <span className="text-xs font-bold text-[#3E5237]">Rating:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = (hoverRating !== null ? hoverRating : rating) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => onRatingChange(star)}
                  onMouseEnter={() => onHoverRatingChange(star)}
                  onMouseLeave={() => onHoverRatingChange(null)}
                  className="cursor-pointer p-0.5 transition-transform hover:scale-125 active:scale-95"
                  aria-label={`Beri ${star} bintang`}
                >
                  <Star
                    className={`w-5 h-5 transition-colors ${
                      isFilled
                        ? "fill-amber-500 text-amber-500 drop-shadow-[0_1px_2px_rgba(245,158,11,0.3)]"
                        : "text-neutral-300 hover:text-amber-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <span className="text-xs font-heading font-bold text-[#3E5237] min-w-18 pl-1">
            {rating === 5 && "Sangat Puas"}
            {rating === 4 && "Puas"}
            {rating === 3 && "Cukup"}
            {rating === 2 && "Kurang"}
            {rating === 1 && "Kecewa"}
          </span>
        </div>

        {/* 3. SUNKEN TEXTAREA (DEBOSSED WELL) */}
        <div className="flex flex-col gap-1.5">
          <textarea
            rows={3}
            placeholder="Ceritakan tentang kesegaran bunga mawar, keindahan wrapping, ketepatan waktu pengiriman..."
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            className="w-full rounded-[18px] sm:rounded-[20px] border border-[#D8C7B0]/70 bg-[#F3EBE0]/85 p-3.5 sm:p-4 text-xs sm:text-sm text-[#3E5237] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#78865C]/40 resize-none shadow-[inset_0_2px_5px_rgba(62,82,55,0.12),inset_0_-1px_1.5px_rgba(255,255,255,0.9)] font-sans"
            maxLength={1000}
            required
          />
          <div className="flex justify-between items-center text-[10px] text-[#78865C] px-1 font-sans">
            <span>Minimal 3 karakter</span>
            <span>{comment.length}/1000 karakter</span>
          </div>
        </div>

        {/* 4. INLINE ACTION ROW: PHOTO PICKER (LEFT) & SUBMIT BUTTON (RIGHT) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#DECDB8]/70">
          {/* Sisi Kiri: 4 Photo Upload Slots */}
          <div className="flex items-center gap-2 flex-wrap">
            {imagePreviews.map((img, idx) => (
              <div
                key={idx}
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-[14px] overflow-hidden border border-[#D8C7B0]/60 shadow-[0_2px_6px_rgba(62,82,55,0.08)] group shrink-0"
              >
                <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => onRemoveImage(idx)}
                  className="absolute top-1 right-1 w-4.5 h-4.5 bg-black/75 text-white rounded-full flex items-center justify-center hover:bg-black cursor-pointer shadow-xs"
                  title="Hapus foto"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}

            {imagePreviews.length < 4 && (
              <label className="w-14 h-14 sm:w-16 sm:h-16 rounded-[14px] border-2 border-dashed border-[#D8C7B0]/80 hover:border-[#3E5237] bg-[#F3EBE0]/75 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all text-[#78865C] hover:text-[#3E5237] shadow-[inset_0_1px_3px_rgba(62,82,55,0.06),inset_0_-1px_1px_rgba(255,255,255,0.8)] shrink-0 active:scale-95">
                <Camera className="w-4 h-4" />
                <span className="text-[9px] font-bold">Foto</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  onChange={onImageUpload}
                  className="hidden"
                />
              </label>
            )}

            <span className="text-[10px] text-[#78865C] font-sans pl-1 hidden sm:inline">
              Maks. 4 foto produk (JPG/PNG)
            </span>
          </div>

          {/* Sisi Kanan: Action Buttons (Batal & Kirim Ulasan) */}
          <div className="flex items-center gap-2 justify-end shrink-0">
            {onCancel && (
              <Button
                type="button"
                variant="skeuo-paper-secondary"
                size="sm"
                onClick={onCancel}
                disabled={isSubmitting}
                className="cursor-pointer text-xs font-bold px-4 h-9.5 rounded-xl"
              >
                Batal
              </Button>
            )}
            <Button
              type="submit"
              variant="skeuo-forest"
              size="sm"
              disabled={isSubmitting}
              className="cursor-pointer text-xs font-bold px-5 h-9.5 rounded-xl shadow-[0_4px_12px_rgba(62,82,55,0.25),inset_0_1px_0_rgba(255,255,255,0.3)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <span>Kirim Ulasan Produk</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
