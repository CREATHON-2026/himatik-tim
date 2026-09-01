"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductFormCard } from "@/components/shadcn-studio/form/product-form-card";
import { toast } from "sonner";
import type { ProductFormData } from "@/features/products/schema";
import type { Product } from "@/features/products/types";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [initialData, setInitialData] = useState<Product | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        setIsFetching(true);
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setInitialData({
            id: data.id,
            creatorId: data.creatorId,
            name: data.title,
            category: data.category,
            description: data.description,
            price: data.price,
            imageUrl: data.images?.[0] || null,
            gallery: data.images?.slice(1) || [],
            stock: data.stock,
            sku: data.sku,
            type: "READY",
            shippingOptions: ["PICKUP", "REGULER"],
            tags: [],
            showStock: true,
            isActive: data.isPublished,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        } else {
          toast.error("Produk tidak ditemukan");
          router.push("/dashboard/creator/products");
        }
      } catch {
        toast.error("Gagal mengambil data produk");
      } finally {
        setIsFetching(false);
      }
    }
    fetchProduct();
  }, [id, router]);

  const handleSubmit = async (data: ProductFormData) => {
    try {
      setIsSaving(true);
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal memperbarui produk");
      }

      toast.success("Produk berhasil diperbarui!");
      router.push("/dashboard/creator/products");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#6355D9] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            render={<Link href="/dashboard/creator/products" />}
            className="h-9 w-9 p-0 rounded-full border border-[#E7E5E4] hover:bg-[#F5F5F4]"
          >
            <ArrowLeft className="h-4 w-4 text-[#292524]" />
          </Button>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#111827]">
              Edit Produk: {initialData?.name}
            </h1>
            <p className="text-xs text-[#78716C]">
              Perbarui harga, stok kerajinan, foto, dan deskripsi kado.
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <ProductFormCard
        isEdit={true}
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={isSaving}
        onCancel={() => router.push("/dashboard/creator/products")}
      />
    </div>
  );
}
