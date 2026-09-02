"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductFormCard } from "@/components/shadcn-studio/form/product-form-card";
import { toast } from "sonner";
import type { ProductFormData } from "@/features/products/schema";

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal membuat produk baru");
      }

      toast.success("Produk gift berhasil dipublikasikan!");
      router.push("/dashboard/creator/products");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-10 max-w-5xl mx-auto">
      {/* Header with Back button */}
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
              Tambah Produk Gift & Kriya Baru
            </h1>
            <p className="text-xs text-[#78716C]">
              Publikasikan karya kerajinan tangan, hampers, atau buket Anda ke marketplace Gifteria.
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <ProductFormCard
        isEdit={false}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onCancel={() => router.push("/dashboard/creator/products")}
      />
    </div>
  );
}
