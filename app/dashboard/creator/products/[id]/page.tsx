"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Sparkles, Flower2, Archive } from "lucide-react";

import { useCreatorProduct } from "@/features/products/hooks/useCreatorProduct";
import * as productApi from "@/features/products/api";
import { sanitizeHtml } from "@/lib/sanitizer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ProductFormCard,
  type ProductFormData,
} from "@/components/shadcn-studio/form/product-form-card";

import { ProductMediaGallery } from "@/features/products/components/product-media-gallery";
import { ProductDetailInfo } from "@/features/products/components/product-detail-info";
import { ProductPerformanceCard } from "@/features/products/components/product-performance-card";
import { ProductQuickActions } from "@/features/products/components/product-quick-actions";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const productId = resolvedParams.id;

  const {
    product,
    isLoading,
    updateProduct,
    deleteProduct,
    uploadImage,
    isUpdating,
    isUploadingImage,
  } = useCreatorProduct(productId);

  const [isEditing, setIsEditing] = React.useState(false);

  // Duplication mutation
  const duplicateMutation = useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: (newProduct) => {
      toast.success("Produk berhasil diduplikasi!");
      router.push(`/dashboard/creator/products/${newProduct.id}`);
    },
    onError: (err) => {
      const message = err instanceof Error ? err.message : "Gagal menduplikasi";
      toast.error(message);
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-muted-foreground text-sm font-medium">
          Memuat detail produk...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="bg-destructive/10 text-destructive flex h-14 w-14 items-center justify-center rounded-full">
          <Archive className="size-6" />
        </div>
        <h2 className="font-heading text-foreground text-lg font-bold">
          Produk Tidak Ditemukan
        </h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          Produk yang Anda cari tidak ada atau Anda tidak memiliki akses ke
          produk tersebut.
        </p>
        <Button
          onClick={() => router.push("/dashboard/creator/products")}
          variant="outline"
          className="rounded-full"
        >
          <ArrowLeft className="mr-2 size-4" /> Kembali ke Daftar
        </Button>
      </div>
    );
  }

  // Handle Edit submission
  const handleEditSubmit = async (data: ProductFormData) => {
    try {
      await updateProduct(data);
      setIsEditing(false);
      toast.success("Produk berhasil diperbarui!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal memperbarui produk";
      toast.error(message);
    }
  };

  // Handle Image upload
  const handleUploadImage = async (file: File) => {
    try {
      const res = await uploadImage(file);
      return res.imageUrl;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal mengunggah gambar";
      toast.error(message);
      throw err;
    }
  };

  // Handle toggle active status
  const handleToggleActive = async (active: boolean) => {
    try {
      // ponytail: simplify status update using spread operator
      await updateProduct({
        ...product,
        price: Number(product.price),
        imageUrl: product.imageUrl || "",
        isActive: active,
      });
      toast.success(
        active
          ? "Produk berhasil diaktifkan!"
          : "Produk dinonaktifkan (Draft)!",
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal mengubah visibilitas";
      toast.error(message);
    }
  };

  // Handle duplicate action
  const handleDuplicate = () => {
    // ponytail: simplify duplicate mapping with object spread
    duplicateMutation.mutate({
      ...product,
      name: `${product.name} (Copy)`,
      price: Number(product.price),
      imageUrl: product.imageUrl || "",
      sku: product.sku ? `${product.sku}-copy` : null,
      isActive: false, // Clone starts as draft
    });
  };

  // Handle quick stock update
  const handleSaveStock = async (newStock: number) => {
    try {
      // ponytail: simplify stock update using spread operator
      await updateProduct({
        ...product,
        price: Number(product.price),
        imageUrl: product.imageUrl || "",
        stock: newStock,
      });
      toast.success("Stok berhasil diperbarui!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal menyimpan stok";
      toast.error(message);
      throw err;
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (
      confirm("Apakah Anda yakin ingin menghapus produk ini secara permanen?")
    ) {
      try {
        await deleteProduct();
        toast.success("Produk berhasil dihapus!");
        router.push("/dashboard/creator/products");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Gagal menghapus produk";
        toast.error(message);
      }
    }
  };

  // Conditionally render full-page edit form
  if (isEditing) {
    return (
      <div className="px-6 pt-2 pb-8 md:px-8">
        <ProductFormCard
          isEdit={true}
          initialData={{
            ...product,
            price: Number(product.price),
          }}
          onSubmit={handleEditSubmit}
          onUploadImage={handleUploadImage}
          isLoading={isUpdating}
          isUploadingImage={isUploadingImage}
          submitLabel="Simpan Perubahan"
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl space-y-6 px-6 pb-8 md:px-8">
      {/* Back to list navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/dashboard/creator/products")}
          className="text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Kembali ke Daftar Produk
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Kolom Kiri & Tengah: Visual & Detail Utama (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="skeuo-flat border-border/30 rounded-2xl border bg-white p-2 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Media Gallery */}
              <ProductMediaGallery
                imageUrl={product.imageUrl}
                gallery={product.gallery}
                productName={product.name}
                isActive={product.isActive}
                stock={product.stock}
              />

              {/* Main Info */}
              <ProductDetailInfo
                product={product}
                onEditClick={() => setIsEditing(true)}
              />
            </div>
          </Card>

          {/* Full Rich Text Description */}
          <Card className="skeuo-flat border-border/30 relative mb-2 overflow-hidden rounded-2xl border bg-white p-5 pt-4 shadow-xs">
            {/* Background Watermark Leaf (Native Image) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/bio-asset.webp"
              alt=""
              className="pointer-events-none absolute -right-24 -bottom-24 z-0 size-88 object-contain opacity-22 mix-blend-multiply select-none"
            />

            <div className="relative z-10 space-y-4">
              <h2 className="border-border/10 text-foreground scroll-m-20 border-b pb-1.5 text-base font-bold tracking-tight">
                Deskripsi Lengkap
              </h2>
              <div
                className="text-muted-foreground rich-content space-y-2 text-xs leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(
                    product.description || "Tidak ada deskripsi lengkap.",
                  ),
                }}
              />

              {/* Custom Notes / Care guide */}
              <div className="border-border/10 mt-4 grid grid-cols-1 gap-4 border-t pt-5 md:grid-cols-2">
                <div className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#E8DFC9] bg-[#FAF7F0] text-[#7A6B4E]">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-foreground text-xs font-bold">
                      Perawatan
                    </h4>
                    <p className="text-muted-foreground mt-1 text-[10px] leading-relaxed">
                      Simpan di tempat sejuk, hindari sinar matahari langsung,
                      dan ganti air bersih setiap 2 hari.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#E8DFC9] bg-[#FAF7F0] text-[#7A6B4E]">
                    <Flower2 className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-foreground text-xs font-bold">
                      Catatan
                    </h4>
                    <p className="text-muted-foreground mt-1 text-[10px] leading-relaxed">
                      Warna bunga dapat sedikit berbeda sesuai ketersediaan,
                      namun kualitas dan estetika tetap terjaga.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Delivery Details */}
          <Card className="skeuo-flat border-border/30 relative overflow-hidden rounded-2xl border bg-white p-5 shadow-xs">
            {/* Background Watermark Leaf (Native Image) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/bio-asset.webp"
              alt=""
              className="pointer-events-none absolute -top-20 -right-20 z-0 size-72 rotate-180 object-contain opacity-16 mix-blend-multiply select-none"
            />

            <div className="relative z-10 space-y-4">
              <h2 className="border-border/10 text-foreground scroll-m-20 border-b pb-1.5 text-base font-bold tracking-tight">
                Informasi Pengiriman
              </h2>
              <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
                <div className="border-border/10 flex justify-between border-b pb-2">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1" />
                    Area Layanan
                  </span>
                  <span className="text-foreground font-semibold">
                    Makassar & Sekitarnya
                  </span>
                </div>
                <div className="border-border/10 flex justify-between border-b pb-2">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1" />
                    Estimasi Pengiriman
                  </span>
                  <span className="text-foreground font-semibold">
                    1 - 3 Jam
                  </span>
                </div>
                <div className="border-border/10 flex justify-between border-b pb-2">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1" />
                    Pengemasan
                  </span>
                  <span className="text-foreground font-semibold">
                    Paper Wrap Premium
                  </span>
                </div>
                <div className="border-border/10 flex justify-between border-b pb-2">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1" />
                    Opsi Pengiriman
                  </span>
                  <span className="text-foreground font-semibold">
                    Instant, Same Day, Regular
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Kolom Kanan: Performa & Kontrol (1/3 width) */}
        <div className="space-y-4">
          {/* Performance Card */}
          <ProductPerformanceCard price={product.price} />

          {/* Quick Actions Card */}
          <ProductQuickActions
            isActive={product.isActive}
            stock={product.stock}
            isDuplicating={duplicateMutation.isPending}
            onToggleActive={handleToggleActive}
            onEditClick={() => setIsEditing(true)}
            onDuplicateClick={handleDuplicate}
            onDeleteClick={handleDelete}
            onSaveStock={handleSaveStock}
          />
        </div>
      </div>
    </div>
  );
}
