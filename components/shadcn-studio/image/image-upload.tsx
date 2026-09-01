"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  onRemove?: () => void;
  onUpload?: (file: File) => Promise<string>;
  disabled?: boolean;
  aspectRatio?: "square" | "video" | "wide";
  label?: string;
  placeholder?: string;
  helperText?: string;
  isLoading?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  onUpload,
  disabled = false,
  label = "Unggah Foto",
  placeholder = "Klik untuk memilih foto produk gift",
  helperText = "Format JPG, PNG, atau WebP (Maks. 5MB)",
  isLoading = false,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isInternalUploading, setIsInternalUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsInternalUploading(true);
      if (onUpload) {
        const uploadedUrl = await onUpload(file);
        onChange?.(uploadedUrl);
      } else {
        const previewUrl = URL.createObjectURL(file);
        onChange?.(previewUrl);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsInternalUploading(false);
    }
  };

  const isBusy = isLoading || isInternalUploading;

  return (
    <div className="w-full space-y-2">
      {label && <label className="text-xs font-semibold text-[#111827]">{label}</label>}

      {value ? (
        <div className="relative group overflow-hidden rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] aspect-square max-w-xs flex items-center justify-center">
          <Image
            src={value}
            alt="Preview produk"
            fill
            unoptimized={value.startsWith("data:") || value.startsWith("blob:") || value.startsWith("http")}
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onRemove}
              disabled={disabled || isBusy}
              className="rounded-full h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !disabled && !isBusy && fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center border-2 border-dashed border-[#E7E5E4] hover:border-[#6355D9] bg-[#FAFAF9] hover:bg-[#F5F3FF]/30 transition-all rounded-2xl p-6 cursor-pointer text-center group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled || isBusy}
          />
          {isBusy ? (
            <Loader2 className="h-8 w-8 text-[#6355D9] animate-spin" />
          ) : (
            <div className="rounded-xl bg-[#EDE9FE] p-3 text-[#6355D9] group-hover:scale-110 transition duration-300">
              <Upload className="h-5 w-5" />
            </div>
          )}
          <p className="mt-3 text-xs font-semibold text-[#111827]">{placeholder}</p>
          <p className="mt-1 text-[11px] text-[#78716C]">{helperText}</p>
        </div>
      )}
    </div>
  );
}
