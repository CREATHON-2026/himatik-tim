"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ImageUpload } from "@/components/shadcn-studio/image/image-upload";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Plus,
  Image as ImageIcon,
  Sparkles,
  Check,
  Loader2,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";
import { RichEditorProduct } from "@/components/shadcn-studio/rich-text-editor/rich-editor-product";
import { cn } from "@/lib/utils";
import { z } from "zod";
import {
  ProductFormSchema,
  type ProductFormData,
} from "@/features/products/schema";
import {
  VALID_CATEGORIES,
  CONTROLLED_OCCASION_TAGS,
  getCategoryMeta,
} from "@/features/products/constants";
import { generateProductSku } from "@/features/products/utils/sku";
import type { Product } from "@/features/products/types";

export type ProductFormInput = z.input<typeof ProductFormSchema>;
export type { ProductFormData };

interface ProductFormCardProps {
  isEdit?: boolean;
  initialData?: Product | null;
  onSubmit?: (data: ProductFormData) => Promise<unknown>;
  onUploadImage?: (file: File) => Promise<string>;
  isLoading?: boolean;
  isUploadingImage?: boolean;
  submitLabel?: string;
  className?: string;
  onCancel?: () => void;
}

export function ProductFormCard({
  isEdit = false,
  initialData,
  onSubmit,
  onUploadImage,
  isLoading = false,
  isUploadingImage = false,
  submitLabel,
  className,
  onCancel,
}: ProductFormCardProps) {
  // Setup react-hook-form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ProductFormInput>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      description: initialData?.description || "",
      price: initialData?.price ? Number(initialData.price) : undefined,
      imageUrl: initialData?.imageUrl || "",
      gallery: initialData?.gallery || [],
      stock: initialData?.stock || 0,
      weight: initialData?.weight || null,
      sku: initialData?.sku || "",
      type: initialData?.type || "READY",
      shippingOptions: initialData?.shippingOptions || [],
      tags: initialData?.tags || [],
      showStock: initialData?.showStock ?? true,
      isActive: initialData?.isActive ?? true,
    },
  });

  // Watch fields for real-time preview & gallery swap
  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedName = watch("name");
  const watchedCategory = watch("category");
  const watchedPrice = watch("price");
  const watchedStock = watch("stock");
  const watchedImageUrl = watch("imageUrl");
  const watchedGallery = watch("gallery") || [];
  const watchedType = watch("type");
  const watchedShipping = watch("shippingOptions") || [];
  const watchedTags = watch("tags") || [];
  const watchedDescription = watch("description") || "";

  // Local state for tags input string
  const [tagInput, setTagInput] = React.useState("");

  // ─── Draft Autosave & BeforeUnload logic ───
  const formValues = watch();

  // Save to localStorage when values change (only in Create mode)
  React.useEffect(() => {
    if (!isEdit) {
      const timer = setTimeout(() => {
        localStorage.setItem(
          "gifteria_product_form_draft",
          JSON.stringify(formValues)
        );
      }, 1000); // Debounce saves by 1s
      return () => clearTimeout(timer);
    }
  }, [formValues, isEdit]);

  // Load draft on mount (only in Create mode)
  React.useEffect(() => {
    if (!isEdit) {
      const saved = localStorage.getItem("gifteria_product_form_draft");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.name || parsed.description || parsed.price) {
            Object.entries(parsed).forEach(([key, val]) => {
              if (val !== undefined && val !== null) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setValue(key as any, val, { shouldValidate: true });
              }
            });
            // Brief visual notification
            setTimeout(() => {
              toast.info("Draft formulir sebelumnya berhasil dipulihkan!");
            }, 500);
          }
        } catch (e) {
          console.error("Gagal memuat draft:", e);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  // Warn user before leaving if form is dirty
  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const saved = localStorage.getItem("gifteria_product_form_draft");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.name || parsed.description || parsed.price) {
            e.preventDefault();
            e.returnValue =
              "Apakah Anda yakin ingin meninggalkan halaman? Data draf akan tetap disimpan.";
            return e.returnValue;
          }
        } catch {}
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const clearDraft = () => {
    localStorage.removeItem("gifteria_product_form_draft");
  };

  const handleCancel = () => {
    clearDraft();
    onCancel?.();
  };

  // Local state for gallery uploading
  const [isUploadingGallery, setIsUploadingGallery] = React.useState(false);
  const galleryInputRef = React.useRef<HTMLInputElement>(null);

  // Built-in File Upload API with Supabase / Base64 fallback
  const uploadFileApi = async (file: File): Promise<string> => {
    if (onUploadImage) {
      return await onUploadImage(file);
    }
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Gagal mengunggah foto");
    }
    const data = await res.json();
    return data.url;
  };

  // Main Image Upload Handler
  const handleMainImageUpload = async (file: File) => {
    try {
      const url = await uploadFileApi(file);
      setValue("imageUrl", url, { shouldValidate: true });
      toast.success("Foto utama berhasil diperbarui!");
      return url;
    } catch (err) {
      toast.error("Gagal mengunggah foto utama");
      throw err;
    }
  };

  // Gallery Multi-upload Handler
  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (watchedGallery.length + files.length > 8) {
      toast.error("Galeri foto tambahan maksimal berisi 8 foto");
      return;
    }

    setIsUploadingGallery(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await uploadFileApi(file);
        uploadedUrls.push(url);
      }
      setValue("gallery", [...watchedGallery, ...uploadedUrls], {
        shouldValidate: true,
      });
      toast.success("Foto galeri berhasil ditambahkan!");
    } catch {
      toast.error("Sebagian foto gagal diunggah");
    } finally {
      setIsUploadingGallery(false);
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  };

  // Remove Gallery Image
  const handleRemoveGalleryImage = (indexToRemove: number) => {
    const nextGallery = watchedGallery.filter(
      (_, idx) => idx !== indexToRemove
    );
    setValue("gallery", nextGallery, { shouldValidate: true });
  };

  // Swap Gallery Image as Main Image
  const handleSetAsMainImage = (indexToSet: number) => {
    const newMain = watchedGallery[indexToSet];
    setValue("imageUrl", newMain, { shouldValidate: true });
    setValue(
      "gallery",
      watchedImageUrl
        ? watchedGallery.map((img, idx) =>
            idx === indexToSet ? watchedImageUrl : img
          )
        : watchedGallery.filter((_, idx) => idx !== indexToSet),
      { shouldValidate: true }
    );
    toast.success("Foto utama ditukar dengan foto galeri!");
  };

  // Shipping Option checkbox helper
  const handleShippingChange = (option: string, checked: boolean) => {
    const next = checked
      ? [...watchedShipping, option]
      : watchedShipping.filter((x) => x !== option);
    setValue("shippingOptions", next, { shouldValidate: true });
  };

  // Tags input: only update input string (NOT tags form state)
  // The actual tags state is only updated on Enter or comma-commit
  const handleTagsInput = (value: string) => {
    // If user typed a comma at the end → commit the pending tag
    if (value.endsWith(",")) {
      const pendingTag = value.slice(0, -1).trim();
      if (pendingTag && !watchedTags.includes(pendingTag) && watchedTags.length < 10) {
        setValue("tags", [...watchedTags, pendingTag], { shouldValidate: true });
      }
      setTagInput("");
    } else {
      setTagInput(value);
    }
  };

  // Enter key commits the pending tag in the input
  const handleTagsKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submit on Enter
      const pendingTag = tagInput.trim();
      if (pendingTag && !watchedTags.includes(pendingTag) && watchedTags.length < 10) {
        setValue("tags", [...watchedTags, pendingTag], { shouldValidate: true });
      }
      setTagInput("");
    }
  };

  // Generate 6-character unique SKU based on current product name
  const handleGenerateSku = () => {
    const newSku = generateProductSku(watchedName);
    setValue("sku", newSku, { shouldValidate: true });
    toast.success(`Kode SKU dibuat: ${newSku}`);
  };

  // Auto-generate SKU when product name is typed if SKU is still empty
  const prevNameRef = React.useRef(watchedName);
  React.useEffect(() => {
    if (
      !isEdit &&
      !initialData?.sku &&
      !getValues("sku") &&
      watchedName &&
      watchedName.trim().length >= 3 &&
      prevNameRef.current !== watchedName
    ) {
      const generated = generateProductSku(watchedName);
      setValue("sku", generated, { shouldValidate: false });
    }
    prevNameRef.current = watchedName;
  }, [watchedName, isEdit, initialData, setValue, getValues]);

  const formatRupiah = (val?: number) =>
    val && !isNaN(val) ? `Rp${val.toLocaleString("id-ID")}` : "Rp0";

  const onFormSubmit = async (data: ProductFormInput) => {
    try {
      const parsed = ProductFormSchema.parse(data);
      if (onSubmit) {
        await onSubmit(parsed);
        clearDraft();
      }
    } catch (err) {
      console.error("[ProductFormCard Submit] Parse error:", err);
    }
  };

  const onFormError = (formErrors: typeof errors) => {
    console.warn("[ProductFormCard Submit Errors]:", formErrors);

    // Find the first error field and scroll to it
    const errorFields = Object.keys(formErrors);
    if (errorFields.length > 0) {
      const firstErrorField = errorFields[0];
      const element =
        document.getElementById(firstErrorField) ||
        document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        // Focus the input if possible
        if (
          element instanceof HTMLInputElement ||
          element instanceof HTMLTextAreaElement ||
          element instanceof HTMLSelectElement
        ) {
          element.focus({ preventScroll: true });
        }
      } else {
        // Fallback: search for first error message element
        const firstErrorEl = document.querySelector(".text-destructive");
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }

    toast.error(
      "Gagal memublikasikan produk. Harap periksa kembali kolom yang bertanda merah."
    );
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* ─── Back Action Header ─── */}
      <div className="border-border/20 flex items-center gap-4 border-b pb-4">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="border-border/40 hover:bg-card h-10 w-10 rounded-full border"
            aria-label="Kembali ke daftar produk"
          >
            <ArrowLeft className="text-foreground size-4" />
          </Button>
        )}
        <div>
          <h1 className="font-heading text-foreground text-xl leading-tight font-bold sm:text-2xl">
            {isEdit ? "Edit Produk Baru" : "Tambah Produk Baru"}
          </h1>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Lengkapi informasi produk dengan detail untuk menarik pelanggan.
          </p>
        </div>
      </div>

      {/* ─── 2-Column Workspace Grid ─── */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Form Sections (2/3 width) */}
        <form
          onSubmit={handleSubmit(onFormSubmit, onFormError)}
          onKeyDown={(e) => {
            // Only Shift+Enter submits the form; bare Enter is reserved for tag input & rich text
            if (e.key === "Enter" && !e.shiftKey) {
              const target = e.target as HTMLElement;
              // Allow Enter in textarea and contenteditable rich editor fields
              const isEditable =
                target.tagName === "TEXTAREA" ||
                target.isContentEditable ||
                target.getAttribute("contenteditable") === "true";

              if (!isEditable) {
                e.preventDefault();
              }
            }
          }}
          className="space-y-6 lg:col-span-2"
        >
          {/* Section 1: Informasi Utama */}
          <Card className="skeuo-flat paper-texture rounded-2xl border border-[#B89A57]/20">
            <CardHeader className="border-border/10 border-b pb-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-[#F5E6D3] bg-[#FDF8F3] p-2.5 text-[#B89A57] shadow-xs">
                  <ShoppingBag className="size-5" />
                </div>
                <div>
                  <CardTitle className="font-heading text-foreground text-lg font-bold">
                    1. Informasi Utama
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-4">
              {/* Nama Produk */}
              <div className="space-y-1.5">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="name"
                    className="text-foreground/80 text-sm font-semibold"
                  >
                    Nama Produk <span className="text-destructive">*</span>
                  </Label>
                  <span className="text-muted-foreground block text-[11px]">
                    Gunakan nama yang jelas dan mudah ditemukan pelanggan.
                  </span>
                </div>
                <div className="relative">
                  <Input
                    id="name"
                    placeholder="Contoh: Peach Romance Bouquet"
                    maxLength={100}
                    {...register("name")}
                    className="h-11 pr-16"
                  />
                  <span className="text-muted-foreground/60 absolute top-1/2 right-3.5 -translate-y-1/2 text-xs font-semibold select-none">
                    {watchedName?.length || 0}/100
                  </span>
                </div>
                {errors.name && (
                  <p className="text-destructive mt-1 text-xs">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Kategori */}
              <div className="space-y-1.5">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="category"
                    className="text-foreground/80 text-sm font-semibold"
                  >
                    Kategori Produk <span className="text-destructive">*</span>
                  </Label>
                  <span className="text-muted-foreground block text-[11px]">
                    Pilih kategori yang paling sesuai.
                  </span>
                </div>
                <div className="relative">
                  <select
                    id="category"
                    {...register("category")}
                    className="bg-card border-border/30 focus:ring-primary/20 h-11 w-full cursor-pointer appearance-none rounded-xl border px-3.5 pr-10 text-sm transition-shadow outline-none focus:ring-2"
                  >
                    <option value="" disabled>
                      -- Pilih Kategori Produk (Wajib) --
                    </option>
                    {VALID_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-[#B89A57]" />
                </div>
                {errors.category && (
                  <p className="text-destructive mt-1 text-xs">
                    {errors.category.message}
                  </p>
                )}

                {/* Dynamic Category Contextual Guide Card */}
                {getCategoryMeta(watchedCategory) && (
                  <div className="mt-2 rounded-xl border border-[#78865C]/25 bg-[#FAF6F0] p-3 text-xs shadow-xs space-y-1 select-none">
                    <div className="flex items-center gap-1.5 font-bold text-[#3E5237]">
                      <span>💡</span>
                      <span>Panduan Kategori: {getCategoryMeta(watchedCategory)?.name}</span>
                    </div>
                    <p className="text-[11px] text-[#78865C] leading-relaxed font-sans">
                      {getCategoryMeta(watchedCategory)?.description}
                    </p>
                    <div className="pt-0.5 text-[10.5px] text-[#3E5237]/90 font-sans">
                      <strong className="font-semibold">Contoh Produk: </strong>
                      <span className="italic opacity-90">{getCategoryMeta(watchedCategory)?.examples}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Deskripsi */}
              <div className="space-y-1.5">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="description"
                    className="text-foreground/80 text-sm font-semibold"
                  >
                    Deskripsi Produk <span className="text-destructive">*</span>
                  </Label>
                  <span className="text-muted-foreground block text-[11px]">
                    Jelaskan detail tentang produk, bahan, ukuran, dan keunikan
                    produk Anda.
                  </span>
                </div>

                <RichEditorProduct
                  value={watchedDescription}
                  onChange={(html) =>
                    setValue("description", html, { shouldValidate: true })
                  }
                />
                {errors.description && (
                  <p className="text-destructive mt-1 text-xs">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Media Produk */}
          <Card className="skeuo-flat paper-texture rounded-2xl border border-[#B89A57]/20">
            <CardHeader className="border-border/10 border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-lg p-1.5 text-xs font-bold">
                  2
                </span>
                <div>
                  <CardTitle className="font-heading text-base font-bold">
                    Media Produk
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Foto produk terbaik untuk menampilkan keindahan produk Anda
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Main Image */}
                <div id="imageUrl" className="space-y-1.5">
                  <Label className="text-foreground/80 text-xs font-semibold">
                    Foto Utama <span className="text-destructive">*</span>
                  </Label>
                  <ImageUpload
                    value={watchedImageUrl}
                    aspectRatio="square"
                    placeholder="Klik untuk upload foto utama"
                    onUpload={handleMainImageUpload}
                    onChange={(url) => setValue("imageUrl", url, { shouldValidate: true })}
                    onRemove={() => setValue("imageUrl", "", { shouldValidate: true })}
                    isLoading={isUploadingImage}
                  />
                  {errors.imageUrl && (
                    <p className="text-destructive mt-1 text-xs">
                      {errors.imageUrl.message}
                    </p>
                  )}
                </div>

                {/* Gallery Images */}
                <div className="space-y-1.5">
                  <Label className="text-foreground/80 text-xs font-semibold">
                    Galeri Foto (Opsional, Maks 8)
                  </Label>

                  {/* Grid Galeri */}
                  <div className="grid grid-cols-3 gap-2">
                    {watchedGallery.map((url, idx) => (
                      <div
                        key={idx}
                        className="border-border group bg-card relative aspect-square overflow-hidden rounded-xl border"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt="Gallery item"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end gap-1 bg-black/40 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => handleSetAsMainImage(idx)}
                            className="bg-card hover:bg-card/95 text-foreground rounded-md py-0.5 text-center text-[8px] font-bold transition-colors"
                          >
                            Utama
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md py-0.5 text-center text-[8px] font-bold transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Tambah/Upload Galeri Card */}
                    {watchedGallery.length < 8 && (
                      <div
                        onClick={() =>
                          !isUploadingGallery &&
                          galleryInputRef.current?.click()
                        }
                        className="border-border/80 hover:border-primary/60 hover:bg-card/30 relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all active:scale-95"
                      >
                        {isUploadingGallery ? (
                          <Loader2 className="text-primary size-4 animate-spin" />
                        ) : (
                          <>
                            <Plus className="text-muted-foreground size-4" />
                            <span className="text-muted-foreground mt-1 text-[9px] font-medium">
                              Upload
                            </span>
                          </>
                        )}
                        <input
                          ref={galleryInputRef}
                          type="file"
                          multiple
                          accept="image/jpeg,image/png"
                          className="sr-only"
                          onChange={handleGalleryUpload}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Harga & Stok */}
          <Card className="skeuo-flat paper-texture rounded-2xl border border-[#B89A57]/20">
            <CardHeader className="border-border/10 border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-lg p-1.5 text-xs font-bold">
                  3
                </span>
                <div>
                  <CardTitle className="font-heading text-base font-bold">
                    Informasi Harga & Stok
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Atur harga jual, kuantitas stok, dan kode SKU produk
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
              {/* Harga */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="price"
                  className="text-foreground/80 text-xs font-semibold"
                >
                  Harga Produk <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  startIcon={
                    <span className="text-xs font-bold text-[#78865C] select-none">
                      Rp
                    </span>
                  }
                  {...register("price", { valueAsNumber: true })}
                  className="h-11 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                {errors.price && (
                  <p className="text-destructive mt-1 text-xs">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Stok */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="stock"
                  className="text-foreground/80 text-xs font-semibold"
                >
                  Stok Tersedia <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  endIcon={
                    <span className="text-xs font-semibold text-[#78865C] select-none">
                      pcs
                    </span>
                  }
                  {...register("stock", { valueAsNumber: true })}
                  className="h-11 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                {errors.stock && (
                  <p className="text-destructive mt-1 text-xs">
                    {errors.stock.message}
                  </p>
                )}
              </div>

              {/* Berat */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="weight"
                  className="text-foreground/80 text-xs font-semibold"
                >
                  Berat (Opsional)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Contoh: 500"
                  endIcon={
                    <span className="text-xs font-semibold text-[#78865C] select-none">
                      gram
                    </span>
                  }
                  {...register("weight", { valueAsNumber: true })}
                  className="h-11 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                {errors.weight && (
                  <p className="text-destructive mt-1 text-xs">
                    {errors.weight.message}
                  </p>
                )}
              </div>

              {/* SKU */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="sku"
                    className="text-foreground/80 text-xs font-semibold"
                  >
                    SKU / Kode Produk (Opsional)
                  </Label>
                  <span className="text-muted-foreground text-[10px]">
                    Maks. 6 karakter
                  </span>
                </div>
                <div className="relative flex items-center">
                  <Input
                    id="sku"
                    maxLength={6}
                    placeholder="Contoh: BKWH28"
                    {...register("sku", {
                      onChange: (e) => {
                        e.target.value = e.target.value.toUpperCase().slice(0, 6);
                      },
                    })}
                    className="h-11 pl-3.5 pr-20 uppercase font-mono tracking-wide"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateSku}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-[10.5px] font-bold transition-all cursor-pointer select-none active:scale-95"
                    title="Buat kode SKU 6-karakter otomatis"
                  >
                    <Sparkles className="size-3" />
                    <span>Acak</span>
                  </button>
                </div>
                <span className="text-muted-foreground block text-[10px] leading-normal">
                  Format otomatis 6 karakter (4 huruf + 2 angka). Contoh: <strong className="font-mono text-foreground/80">BKWH28</strong>
                </span>
                {errors.sku && (
                  <p className="text-destructive mt-1 text-xs">
                    {errors.sku.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Pengiriman & Ketersediaan */}
          <Card className="skeuo-flat paper-texture rounded-2xl border border-[#B89A57]/20">
            <CardHeader className="border-border/10 border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-lg p-1.5 text-xs font-bold">
                  4
                </span>
                <div>
                  <CardTitle className="font-heading text-base font-bold">
                    Pengiriman & Ketersediaan
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Atur opsi pengiriman, jenis produk, dan label pencarian
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {/* Tipe Produk (READY/PREORDER) */}
              <div className="space-y-2">
                <Label className="text-foreground/80 text-xs font-semibold">
                  Tipe Produk
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Card Ready */}
                  <div
                    onClick={() =>
                      setValue("type", "READY", { shouldValidate: true })
                    }
                    className={cn(
                      "hover:bg-card/45 relative cursor-pointer rounded-xl border p-4 transition-all select-none",
                      watchedType === "READY"
                        ? "border-primary bg-primary/5 ring-primary/20 ring-1"
                        : "border-border/40 bg-card/20"
                    )}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-bold">
                        Produk Siap Kirim
                      </span>
                      <div
                        className={cn(
                          "flex size-4 items-center justify-center rounded-full border",
                          watchedType === "READY"
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border"
                        )}
                      >
                        {watchedType === "READY" && (
                          <Check className="size-2.5 stroke-[3px]" />
                        )}
                      </div>
                    </div>
                    <span className="text-muted-foreground block text-[10px] leading-normal">
                      Produk tersedia dan dapat langsung dikirim hari ini.
                    </span>
                  </div>

                  {/* Card Preorder */}
                  <div
                    onClick={() =>
                      setValue("type", "PREORDER", { shouldValidate: true })
                    }
                    className={cn(
                      "hover:bg-card/45 relative cursor-pointer rounded-xl border p-4 transition-all select-none",
                      watchedType === "PREORDER"
                        ? "border-primary bg-primary/5 ring-primary/20 ring-1"
                        : "border-border/40 bg-card/20"
                    )}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-bold">
                        Produk Pre-Order
                      </span>
                      <div
                        className={cn(
                          "flex size-4 items-center justify-center rounded-full border",
                          watchedType === "PREORDER"
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border"
                        )}
                      >
                        {watchedType === "PREORDER" && (
                          <Check className="size-2.5 stroke-[3px]" />
                        )}
                      </div>
                    </div>
                    <span className="text-muted-foreground block text-[10px] leading-normal">
                      Produk dirangkai setelah ada pesanan masuk.
                    </span>
                  </div>
                </div>
              </div>

              {/* Opsi Pengiriman */}
              <div id="shippingOptions" className="space-y-2">
                <Label className="text-foreground/80 text-xs font-semibold">
                  Opsi Pengiriman <span className="text-destructive">*</span>
                </Label>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                  {[
                    {
                      id: "PICKUP",
                      label: "Pickup di Toko",
                      desc: "Diambil langsung ke toko Anda",
                    },
                    {
                      id: "INSTANT",
                      label: "Pengiriman Instan",
                      desc: "Same Day menggunakan kurir online",
                    },
                    {
                      id: "REGULER",
                      label: "Pengiriman Reguler",
                      desc: "Kirim standar 1-3 hari kerja",
                    },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={cn(
                        "border-border/30 flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors select-none",
                        watchedShipping.includes(opt.id)
                          ? "bg-primary/5 border-primary/20"
                          : "bg-card/25"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={watchedShipping.includes(opt.id)}
                        onChange={(e) =>
                          handleShippingChange(opt.id, e.target.checked)
                        }
                        className="border-border text-primary focus:ring-primary mt-0.5 size-4 rounded"
                      />
                      <div className="min-w-0">
                        <span className="block text-xs leading-none font-bold">
                          {opt.label}
                        </span>
                        <span className="text-muted-foreground mt-1 block text-[9px] leading-normal">
                          {opt.desc}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.shippingOptions && (
                  <p className="text-destructive mt-1 text-xs">
                    {errors.shippingOptions.message}
                  </p>
                )}
              </div>

              {/* Tags / Label */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="tags-input"
                  className="text-foreground/80 text-xs font-semibold"
                >
                  Tags
                </Label>
                <Input
                  id="tags-input"
                  placeholder="Ketik tag lalu tekan Enter atau pisahkan dengan koma..."
                  value={tagInput}
                  onChange={(e) => handleTagsInput(e.target.value)}
                  onKeyDown={handleTagsKeyDown}
                  className="h-11"
                  autoComplete="off"
                />
                <span className="text-muted-foreground mt-1 block text-[10px] leading-normal">
                  Tekan <kbd className="bg-muted border border-border/50 rounded px-1 text-[9px] font-mono">Enter</kbd> atau ketik koma untuk menambah tag. Maksimal 10 tags.
                </span>

                {/* Controlled Tag Suggestions */}
                <div className="pt-1 flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-foreground/75">
                    Saran Cepat Tag / Momen:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {CONTROLLED_OCCASION_TAGS.map((suggestedTag) => {
                      const isAdded = watchedTags.includes(suggestedTag);
                      return (
                        <button
                          key={suggestedTag}
                          type="button"
                          disabled={isAdded || watchedTags.length >= 10}
                          onClick={() => {
                            if (!isAdded && watchedTags.length < 10) {
                              setValue("tags", [...watchedTags, suggestedTag], {
                                shouldValidate: true,
                              });
                            }
                          }}
                          className={cn(
                            "px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all border cursor-pointer",
                            isAdded
                              ? "bg-primary/15 text-primary border-primary/30 opacity-60 cursor-default"
                              : "bg-card/40 text-muted-foreground border-border/40 hover:bg-muted/60 hover:text-foreground"
                          )}
                        >
                          {isAdded ? "✓" : "+"} {suggestedTag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Badge Render with Remove Button */}
                {watchedTags.length > 0 && (
                  <div className="bg-card/20 border-border/30 mt-2 flex flex-wrap gap-1.5 rounded-xl border p-2.5">
                    {watchedTags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary/10 text-primary-dark border-primary/20 rounded-full border pl-2.5 pr-1 py-0.5 text-[10px] font-bold flex items-center gap-1 group"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => {
                            setValue(
                              "tags",
                              watchedTags.filter((t) => t !== tag),
                              { shouldValidate: true }
                            );
                          }}
                          className="ml-0.5 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[#78865C] hover:bg-destructive/20 hover:text-destructive transition-colors cursor-pointer"
                          title={`Hapus tag "${tag}"`}
                          aria-label={`Hapus tag ${tag}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Informasi Tambahan */}
          <Card className="skeuo-flat paper-texture rounded-2xl border border-[#B89A57]/20">
            <CardHeader className="border-border/10 border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-lg p-1.5 text-xs font-bold">
                  5
                </span>
                <div>
                  <CardTitle className="font-heading text-base font-bold">
                    Informasi Tambahan
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Atur preferensi visibilitas stok dan status produk toko Anda
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {/* Tampilkan Stok */}
              <div className="border-border/10 flex items-center justify-between border-b pb-3">
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold">
                    Tampilkan Stok
                  </span>
                  <span className="text-muted-foreground block text-[10px] leading-normal">
                    Pembeli dapat melihat jumlah sisa stok Anda di detail
                    produk.
                  </span>
                </div>
                <Controller
                  control={control}
                  name="showStock"
                  render={({ field: { value, onChange } }) => (
                    <Switch checked={value} onCheckedChange={onChange} />
                  )}
                />
              </div>

              {/* Produk Aktif */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold">
                    Aktifkan Produk
                  </span>
                  <span className="text-muted-foreground block text-[10px] leading-normal">
                    Produk akan langsung dipublikasikan dan dapat dipesan oleh
                    pembeli.
                  </span>
                </div>
                <Controller
                  control={control}
                  name="isActive"
                  render={({ field: { value, onChange } }) => (
                    <Switch checked={value} onCheckedChange={onChange} />
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions Button */}
          <div className="flex items-center gap-3 pt-2">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                className="h-12 flex-1 cursor-pointer rounded-full font-bold"
              >
                Batal
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading || isUploadingGallery}
              className="bg-primary text-primary-foreground hover:bg-primary/95 h-12 flex-2 cursor-pointer rounded-full font-bold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                submitLabel || (isEdit ? "Simpan Perubahan" : "Terbitkan Produk")
              )}
            </Button>
          </div>
        </form>

        {/* Right Column: Sticky Product Preview Sidebar (1/3 width) */}
        <div className="space-y-4 lg:sticky lg:top-8 lg:col-span-1 lg:h-fit">
          {/* Preview Widget */}
          <Card className="skeuo-flat bg-card paper-texture overflow-hidden rounded-art-nouveau border border-[#B89A57]/30">
            <CardHeader className="pt-4">
              <span className="text-primary-dark text-xs font-bold tracking-wider uppercase">
                Pratinjau Tampilan
              </span>
            </CardHeader>
            <div className="p-4">
              {/* Product Card Rendering */}
              <div className="bg-card skeuo-flat rounded-3xl p-[1.5px] shadow-xs">
                <div className="bg-card relative overflow-hidden rounded-[22px] border-none shadow-none">
                  {/* Photo area */}
                  <div className="bg-muted/10 border-accent-gold/15 relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-t-[20px] border-b">
                    {watchedImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={watchedImageUrl}
                        alt="Main preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-muted-foreground/45 flex flex-col items-center justify-center gap-1.5">
                        <ImageIcon className="size-8 stroke-[1.5px]" />
                        <span className="text-[10px] font-semibold">
                          Belum ada foto
                        </span>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-2.5 left-2.5 z-20">
                      <span className="rounded-full border border-emerald-200/50 bg-emerald-100/90 px-2.5 py-0.5 text-[9.5px] font-bold text-emerald-800 backdrop-blur-xs select-none">
                        Aktif
                      </span>
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="space-y-1 p-4">
                    <span className="text-muted-foreground text-[10px] font-bold tracking-wide uppercase">
                      {watchedCategory || "Kategori"}
                    </span>
                    <h3 className="font-heading text-foreground truncate text-sm font-bold">
                      {watchedName || "Nama Produk Baru"}
                    </h3>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-accent-gold font-sans text-sm font-extrabold">
                        {formatRupiah(watchedPrice)}
                      </span>
                      <span className="text-muted-foreground text-[10px] font-semibold">
                        Stok: {watchedStock || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tips Card Widget */}
          <Card className="border-border/30 bg-primary/5 space-y-3.5 rounded-2xl border p-4">
            <div className="text-primary flex items-center gap-2 text-sm font-bold">
              <Sparkles className="size-4" />
              <span>Tips Produk Menarik</span>
            </div>

            <div className="space-y-3 text-xs leading-normal">
              <div className="flex gap-2.5">
                <span className="text-primary font-bold">✦</span>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">
                    Foto Berkualitas Tinggi
                  </strong>
                  : Gunakan foto buket dengan cahaya alami agar detail bunga
                  terlihat segar dan premium.
                </p>
              </div>

              <div className="flex gap-2.5">
                <span className="text-primary font-bold">✦</span>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Deskripsi Detail</strong>:
                  Tuliskan jenis bunga, warna wrapping paper, dan request pita
                  yang bisa dipilih oleh pembeli.
                </p>
              </div>

              <div className="flex gap-2.5">
                <span className="text-primary font-bold">✦</span>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Harga Bersaing</strong>:
                  Sesuaikan harga buket kreasi Anda dengan modal bunga serta
                  kerapihan hasil wrapping buket.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
