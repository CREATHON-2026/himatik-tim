"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle, LogIn, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductReview } from "@/features/products/types";
import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";
import { CardReviewComposerSkeuo } from "@/components/shadcn-studio/card/card-review-composer-skeuo";
import { AnimatePresence, motion } from "framer-motion";

interface ReviewSectionProps {
  productId?: string;
  productName?: string;
  reviews: ProductReview[];
  averageRating: number;
  reviewCount: number;
  onViewAll?: () => void;
  limit?: number;
}

export function ReviewSection({
  productId = "",
  reviews: initialReviews,
  averageRating: initialAverageRating,
  limit,
}: ReviewSectionProps) {
  const { user, isAuthenticated } = useAuth();
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(initialReviews);
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "lowest">("newest");
  const [isWritingReview, setIsWritingReview] = useState(false);

  // Inline form state
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Recalculate dynamic rating aggregates
  const totalCount = reviewsList.length;
  const computedAverage =
    totalCount > 0
      ? Number(
          (
            reviewsList.reduce((sum, r) => sum + r.rating, 0) / totalCount
          ).toFixed(1)
        )
      : initialAverageRating;

  // Auto-detected logged in user name
  const rawUserName = user?.email
    ? user.email.split("@")[0].replace(/[._-]/g, " ")
    : "Pengguna Bicket";
  const userName = rawUserName
    .split(" ")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const handleToggleWriteReview = () => {
    setIsWritingReview((prev) => !prev);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 4 - imagePreviews.length;
    if (remainingSlots <= 0) {
      toast.error("Maksimal 4 foto ulasan");
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      if (file.size > 3 * 1024 * 1024) {
        toast.error(`Ukuran file "${file.name}" melebihi batas 3MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreviews((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmitReview = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!comment.trim() || comment.trim().length < 3) {
      toast.error("Silakan tulis ulasan minimal 3 karakter");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment: comment.trim(),
          images: imagePreviews,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Gagal mengirim ulasan");
      }

      toast.success("Terima kasih! Ulasan Anda berhasil ditambahkan.");

      const newReview: ProductReview = {
        id: json.data?.id || `rev-${Date.now()}`,
        productId,
        buyerName: json.data?.buyerName || userName,
        rating,
        comment: comment.trim(),
        images: imagePreviews.length > 0 ? imagePreviews : undefined,
        createdAt: new Date().toISOString(),
      };

      setReviewsList((prev) => [newReview, ...prev]);

      // Reset form & close
      setComment("");
      setRating(5);
      setImagePreviews([]);
      setIsWritingReview(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat mengirim ulasan";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sortedReviews = [...reviewsList].sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    // Default newest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const starsBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviewsList.filter((r) => r.rating === star).length;
    const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
    return { star, count, percentage };
  });

  return (
    <div className="flex flex-col gap-6 bg-[#FAF4EC] p-5 sm:p-7 rounded-art-nouveau border border-[#78865C]/25 shadow-sm paper-texture paper-skeuo">
      {/* 1. Header Row with Title, Sort & Write Review Button */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 select-none pb-1">
        <h4 className="font-heading text-lg sm:text-xl font-bold text-[#3E5237]">
          Ulasan Pembeli ({totalCount})
        </h4>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Filter Sort Pills */}
          <div className="flex items-center gap-1 bg-[#FAF6F0] p-1 rounded-xl border border-[#78865C]/20 text-xs">
            <button
              onClick={() => setSortBy("newest")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                sortBy === "newest"
                  ? "bg-[#3E5237] text-white shadow-xs"
                  : "text-[#78865C] hover:text-[#3E5237]"
              }`}
            >
              Terbaru
            </button>
            <button
              onClick={() => setSortBy("highest")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                sortBy === "highest"
                  ? "bg-[#3E5237] text-white shadow-xs"
                  : "text-[#78865C] hover:text-[#3E5237]"
              }`}
            >
              Tertinggi
            </button>
          </div>

          {/* Toggle Write Review Button */}
          <Button
            type="button"
            variant="skeuo-forest"
            size="sm"
            onClick={handleToggleWriteReview}
            className="h-8.5 px-3.5 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 mr-1" />
            <span>{isWritingReview ? "Tutup Form" : "Tulis Ulasan"}</span>
          </Button>
        </div>
      </div>

      {/* 2. Summary Aggregate Stats */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center border-b border-[#78865C]/15 pb-6 select-none">
        {/* Big Score Box */}
        <div className="flex flex-col items-center justify-center p-4.5 rounded-2xl bg-[#FAF6F0] border border-[#78865C]/15 min-w-38 shadow-inner">
          <div className="text-4xl sm:text-5xl font-heading text-[#3E5237] font-bold leading-none">
            {computedAverage.toFixed(1)}
          </div>
          <div className="flex gap-0.5 mt-2 text-amber-500">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={`w-4 h-4 ${
                  idx < Math.round(computedAverage)
                    ? "fill-amber-500 text-amber-500"
                    : "text-neutral-300"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-[#78865C] font-semibold mt-1.5 font-sans">
            Berdasarkan {totalCount} ulasan
          </span>
        </div>

        {/* Breakdown Progress Bars */}
        <div className="flex-1 flex flex-col gap-2 w-full">
          {starsBreakdown.map(({ star, percentage }) => (
            <div key={star} className="flex items-center gap-2.5 text-xs">
              <span className="w-3 text-[#3E5237] font-bold text-right">{star}</span>
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
              <div className="flex-1 h-2.5 bg-[#FAF6F0] border border-[#78865C]/15 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-linear-to-r from-[#78865C] to-[#566B4D] rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-9 text-right text-[11px] text-[#78865C] font-sans font-semibold">
                {percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. EXPANDABLE INLINE REVIEW COMPOSER CARD (STUDIO SKEUO DESIGN) */}
      <AnimatePresence>
        {isWritingReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-[28px] bg-linear-to-b from-[#FAF8F4] via-[#F5EEE4] to-[#EAE0D0] border border-[#D8C7B0]/75 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#566B4D]/10 flex items-center justify-center text-[#566B4D] shrink-0 border border-[#566B4D]/20">
                    <LogIn className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <h5 className="font-heading font-bold text-[#3E5237] text-sm">
                      Punya pengalaman dengan produk ini?
                    </h5>
                    <p className="text-xs text-[#78865C] font-sans">
                      Silakan masuk ke akun Anda untuk memberikan ulasan dan rating terverifikasi.
                    </p>
                  </div>
                </div>
                <Link href={`/login?redirect=/market/products/${productId}`}>
                  <Button
                    variant="skeuo-forest"
                    size="sm"
                    className="cursor-pointer text-xs font-bold whitespace-nowrap px-4"
                  >
                    Masuk untuk Mengulas
                  </Button>
                </Link>
              </div>
            ) : (
              <CardReviewComposerSkeuo
                userName={userName}
                rating={rating}
                hoverRating={hoverRating}
                onRatingChange={setRating}
                onHoverRatingChange={setHoverRating}
                comment={comment}
                onCommentChange={setComment}
                imagePreviews={imagePreviews}
                onImageUpload={handleImageUpload}
                onRemoveImage={handleRemoveImage}
                onSubmit={() => handleSubmitReview()}
                onCancel={() => setIsWritingReview(false)}
                isSubmitting={isSubmitting}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Review List Cards */}
      {sortedReviews.length === 0 ? (
        <div className="py-8 text-center flex flex-col items-center justify-center gap-2">
          <span className="text-[#78865C] font-heading text-base">
            Belum ada ulasan untuk produk ini
          </span>
          <p className="text-xs text-[#78865C]/80 font-sans">
            Jadilah yang pertama membagikan ulasan kepuasan untuk karya ini!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sortedReviews.slice(0, limit || sortedReviews.length).map((review) => {
            let dateStr = "Baru saja";
            try {
              dateStr = formatDistanceToNow(new Date(review.createdAt), {
                addSuffix: true,
                locale: localeId,
              });
            } catch {
              // Fallback
            }

            return (
              <div
                key={review.id}
                className="bg-[#FAF6F0] border border-[#78865C]/15 rounded-[18px] p-4.5 shadow-2xs flex flex-col gap-2.5 transition-all"
              >
                {/* User Identity Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-linear-to-b from-[#566B4D] to-[#3E5237] text-white flex items-center justify-center font-bold text-xs shadow-[0_2px_4px_rgba(62,82,55,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] border border-[#566B4D]/30 shrink-0">
                      {(review.buyerName || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h5 className="font-sans font-bold text-[#3E5237] text-sm leading-none truncate">
                          {review.buyerName}
                        </h5>
                        <span className="flex items-center gap-1 text-[10px] text-[#566B4D] font-bold bg-[#566B4D]/10 px-1.5 py-0.5 rounded-full">
                          <CheckCircle className="w-2.5 h-2.5" /> Pembeli Terverifikasi
                        </span>
                      </div>
                      <span className="text-[10px] text-[#78865C]/75 font-sans">
                        {dateStr}
                      </span>
                    </div>
                  </div>

                  {/* Stars Rating */}
                  <div className="flex items-center gap-0.5 text-amber-500 shrink-0">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${
                          idx < review.rating
                            ? "fill-amber-500 text-amber-500"
                            : "text-neutral-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Body Text */}
                <p className="text-xs sm:text-sm font-sans text-neutral-700 leading-relaxed pl-12">
                  {review.comment}
                </p>

                {/* Review Photo Attachments */}
                {review.images && review.images.length > 0 && (
                  <div className="flex items-center gap-2 pl-12 pt-1 flex-wrap">
                    {review.images.map((imgUrl, imgIdx) => (
                      <div
                        key={imgIdx}
                        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#78865C]/20 shadow-xs"
                      >
                        <Image
                          src={imgUrl}
                          alt={`Foto ulasan ${review.buyerName} ${imgIdx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
