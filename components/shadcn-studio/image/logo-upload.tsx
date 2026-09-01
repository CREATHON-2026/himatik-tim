"use client";

import * as React from "react";
import { ImageUpload } from "./image-upload";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoUploadProps {
  value?: string | null;
  onChange?: (file: File | null) => void;
  onUpload?: (file: File) => Promise<string>;
  disabled?: boolean;
  isLoading?: boolean;
  error?: string | null;
  maxSizeMB?: number;
  className?: string;
}

export function LogoUpload({
  value,
  onChange,
  onUpload,
  disabled = false,
  isLoading = false,
  error,
  maxSizeMB = 2,
  className,
}: LogoUploadProps) {
  return (
    <div className="relative group size-32">
      <ImageUpload
        value={value}
        onChange={onChange}
        onUpload={onUpload}
        disabled={disabled}
        isLoading={isLoading}
        error={error}
        maxSizeMB={maxSizeMB}
        aspectRatio="square"
        placeholder="Logo"
        className={cn("rounded-full border-dashed", className)}
      />
      {/* Floating camera badge overlay */}
      <div className="absolute bottom-1 right-1 bg-card border border-[#B89A57]/30 p-2 rounded-full shadow-md pointer-events-none group-hover:scale-115 transition-transform duration-200 z-10">
        <Camera className="size-3.5 text-muted-foreground" />
      </div>
    </div>
  );
}
