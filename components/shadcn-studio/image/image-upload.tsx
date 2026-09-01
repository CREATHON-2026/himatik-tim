"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { UploadCloudIcon, XIcon, RefreshCwIcon } from "lucide-react";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type UploadState = "idle" | "drag-over" | "preview" | "uploading" | "error";

interface ImageUploadProps {
  /** URL gambar existing — untuk edit mode (isi dari server) */
  value?: string | null;
  /** Dipanggil saat file berubah (sebelum upload ke server) */
  onChange?: (file: File | null) => void;
  /** Handler upload ke server — return URL hasil upload */
  onUpload?: (file: File) => Promise<string>;
  disabled?: boolean;
  isLoading?: boolean;
  error?: string | null;
  accept?: string;
  /** Default: 1 MB */
  maxSizeMB?: number;
  aspectRatio?: "square" | "landscape" | "free";
  placeholder?: string;
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ASPECT_CLASSES = {
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  free: "min-h-32",
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

function ImageUpload({
  value,
  onChange,
  onUpload,
  disabled = false,
  isLoading = false,
  error: externalError,
  accept = "image/jpeg,image/png",
  maxSizeMB = 1,
  aspectRatio = "square",
  placeholder = "Klik atau seret gambar ke sini",
  className,
}: ImageUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [filePreview, setFilePreview] = React.useState<string | null>(null);
  const [prevValue, setPrevValue] = React.useState(value);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [localUploading, setLocalUploading] = React.useState(false);
  const [internalError, setInternalError] = React.useState<string | null>(null);

  // Sync state if value prop changes externally
  if (value !== prevValue) {
    setPrevValue(value);
    setFilePreview(null);
  }

  const preview = filePreview ?? value ?? null;
  const error = externalError ?? internalError;
  const isDisabled = disabled || isLoading || localUploading;

  const state: UploadState = (isLoading || localUploading)
    ? "uploading"
    : isDragOver
    ? "drag-over"
    : error
    ? "error"
    : preview
    ? "preview"
    : "idle";

  // ── Validation ─────────────────────────────────────────────────────────────
  function validate(file: File): string | null {
    const allowedTypes = accept.split(",").map((t) => t.trim());
    if (!allowedTypes.includes(file.type)) {
      return "Format file harus JPG atau PNG";
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `Ukuran file tidak boleh lebih dari ${maxSizeMB} MB`;
    }
    return null;
  }

  // ── File handling ──────────────────────────────────────────────────────────
  async function handleFile(file: File) {
    setInternalError(null);
    setIsDragOver(false);
    const validationError = validate(file);
    if (validationError) {
      setInternalError(validationError);
      return;
    }

    const url = URL.createObjectURL(file);
    setFilePreview(url);
    onChange?.(file);

    if (onUpload) {
      setLocalUploading(true);
      try {
        await onUpload(file);
      } catch {
        setInternalError("Gagal mengupload gambar. Coba lagi.");
      } finally {
        setLocalUploading(false);
      }
    }
  }

  function handleRemove() {
    if (filePreview && filePreview.startsWith("blob:")) {
      URL.revokeObjectURL(filePreview);
    }
    setFilePreview(null);
    setInternalError(null);
    setIsDragOver(false);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  // ── Drag & Drop ────────────────────────────────────────────────────────────
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    if (!isDisabled) setIsDragOver(true);
  }

  function onDragLeave() {
    setIsDragOver(false);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    if (isDisabled) return;
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  // ── Zone class logic ───────────────────────────────────────────────────────
  const zoneClass = cn(
    // Base
    "group relative w-full rounded-2xl border-2 transition-all duration-200 ease-out cursor-pointer overflow-hidden select-none",
    ASPECT_CLASSES[aspectRatio],
    // Interactive hover & active transforms (scale 105 & -translate-y-1 on hover, press down on active)
    !isDisabled && [
      "hover:scale-105 hover:-translate-y-1 hover:shadow-md",
      "active:scale-98 active:translate-y-0.5 active:shadow-sm",
    ],
    // State: idle / error
    (state === "idle" || state === "error") && [
      "border-dashed border-border bg-card/30",
      !isDisabled && "hover:bg-card/60 hover:border-primary/60",
    ],
    // State: drag-over
    state === "drag-over" && [
      "border-solid border-primary bg-primary/5 shadow-soft ring-2 ring-primary/20",
      "scale-105 -translate-y-1",
    ],
    // State: preview / uploading
    (state === "preview" || state === "uploading") && [
      "border-solid border-border/50",
    ],
    // Error border
    error && "border-destructive",
    // Disabled
    isDisabled && "opacity-50 cursor-not-allowed",
    // Focus ring (keyboard navigation)
    "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
    className
  );

  return (
    <div className="w-full space-y-1.5">
      {/* Upload zone */}
      <div
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-label={preview ? "Ganti gambar" : placeholder}
        aria-disabled={isDisabled}
        className={zoneClass}
        onClick={() => !isDisabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !isDisabled) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {/* ── Idle / Error state ── */}
        <AnimatePresence mode="wait">
          {(state === "idle" || state === "error" || state === "drag-over") && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center"
            >
              <UploadCloudIcon
                className={cn(
                  "size-8 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5",
                  state === "drag-over"
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary/80"
                )}
              />
              <p className="text-small text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                {state === "drag-over" ? "Lepaskan untuk upload" : placeholder}
              </p>
              <p className="text-muted text-xs">
                JPG, PNG · maks {maxSizeMB} MB
              </p>
            </motion.div>
          )}

          {/* ── Preview state ── */}
          {(state === "preview" || state === "uploading") && preview && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0 }}
              className="absolute inset-0 overflow-hidden"
            >
              <Image
                src={preview}
                alt="Preview gambar"
                fill
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1"
                sizes="(max-width: 768px) 100vw, 400px"
              />

              {/* Loading overlay */}
              <AnimatePresence>
                {state === "uploading" && (
                  <motion.div
                    key="loading-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center bg-card/70"
                  >
                    <Spinner className="size-6 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons (preview mode only) */}
              {state === "preview" && (
                <div className="absolute inset-0 flex items-end justify-end gap-2 p-2 opacity-0 transition-opacity duration-150 hover:opacity-100 bg-gradient-to-t from-foreground/20 to-transparent">
                  {/* Ganti */}
                  <button
                    type="button"
                    aria-label="Ganti gambar"
                    onClick={(e) => {
                      e.stopPropagation();
                      inputRef.current?.click();
                    }}
                    className="flex items-center gap-1 rounded-lg bg-card/90 px-2.5 py-1.5 text-xs font-medium text-foreground shadow-soft transition-colors hover:bg-card"
                  >
                    <RefreshCwIcon className="size-3" aria-hidden />
                    Ganti
                  </button>

                  {/* Hapus */}
                  <button
                    type="button"
                    aria-label="Hapus gambar"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove();
                    }}
                    className="flex items-center gap-1 rounded-lg bg-destructive/10 px-2.5 py-1.5 text-xs font-medium text-destructive shadow-soft transition-colors hover:bg-destructive/20"
                  >
                    <XIcon className="size-3" aria-hidden />
                    Hapus
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error message — animated, below zone */}
      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            role="alert"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="text-xs font-medium text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
        disabled={isDisabled}
        onChange={onInputChange}
      />
    </div>
  );
}

export { ImageUpload };
export type { ImageUploadProps };
