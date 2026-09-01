"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Gift,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Product } from "@/features/products/types";

export default function CreatorProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Produk berhasil dihapus");
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error("Gagal menghapus produk");
      }
    } catch {
      toast.error("Terjadi kesalahan saat menghapus produk");
    }
  };

  const filteredProducts = products.filter((p) => {
    const productName = p.name || (p as unknown as { title?: string }).title || "";
    const matchQuery = productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory =
      selectedCategory === "ALL" || p.category === selectedCategory;
    return matchQuery && matchCategory;
  });

  return (
    <div className="flex-1 space-y-8 p-6 md:p-10">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E7E5E4] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-xs font-semibold text-[#6355D9]">
              <Gift className="h-3 w-3" /> Katalog Kreator
            </span>
          </div>
          <h1 className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
            Kelola Produk & Karya Gift
          </h1>
          <p className="mt-1 text-sm text-[#78716C]">
            Tambah produk baru, pantau stok kerajinan, dan perbarui rincian
            harga kado Anda.
          </p>
        </div>

        <Button
          render={<Link href="/dashboard/creator/products/new" />}
          className="bg-[#6355D9] text-white hover:bg-[#5145C6] shadow-sm"
        >
          <Plus className="mr-1.5 h-4 w-4" /> Tambah Gift Baru
        </Button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8A29E]" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama produk gift atau kriya..."
            className="pl-10 rounded-xl border-[#E7E5E4] bg-white text-sm focus-visible:ring-[#6355D9]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 px-3.5 rounded-xl border border-[#E7E5E4] bg-white text-xs font-medium text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#6355D9]"
          >
            <option value="ALL">Semua Kategori</option>
            <option value="FLORAL">Buket Bunga & Floral</option>
            <option value="HAMPERS">Hampers & Parcel</option>
            <option value="CUSTOM_ART">Custom Artwork</option>
            <option value="SOUVENIR">Souvenir & Kriya</option>
            <option value="ACCESSORIES">Aksesoris & Kado</option>
          </select>
        </div>
      </div>

      {/* Products Grid or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="rounded-2xl border border-[#E7E5E4] bg-white p-4 space-y-3 animate-pulse"
            >
              <div className="aspect-square w-full rounded-xl bg-[#F5F5F4]" />
              <div className="h-4 w-3/4 rounded bg-[#F5F5F4]" />
              <div className="h-4 w-1/2 rounded bg-[#EDE9FE]" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#E7E5E4] bg-white p-12 text-center">
          <div className="rounded-2xl bg-[#F5F3FF] p-4 text-[#6355D9]">
            <Gift className="h-8 w-8" />
          </div>
          <h3 className="mt-4 font-serif text-lg font-bold text-[#111827]">
            Belum Ada Produk Gift
          </h3>
          <p className="mt-1 max-w-sm text-xs text-[#78716C]">
            Mulai unggah foto kerajinan tangan atau kado pertama Anda agar
            pembeli dapat menemukan karya Anda di katalog Creathon.
          </p>
          <Button
            render={<Link href="/dashboard/creator/products/new" />}
            className="mt-6 bg-[#6355D9] text-white hover:bg-[#5145C6]"
          >
            <Plus className="mr-1.5 h-4 w-4" /> Unggah Gift Pertama
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              role="link"
              tabIndex={0}
              aria-label={`Lihat detail ${product.name}`}
              onClick={() =>
                router.push(`/dashboard/creator/products/${product.id}`)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/dashboard/creator/products/${product.id}`);
                }
              }}
              className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-xs transition-all duration-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6355D9]"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#F5F5F4]">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#A8A29E]">
                      <Gift className="h-12 w-12 stroke-[1.5]" />
                    </div>
                  )}

                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase text-[#6355D9] shadow-xs">
                      {product.category}
                    </span>
                  </div>

                  <div
                    className="absolute top-3 right-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 p-0 shadow-xs hover:bg-white cursor-pointer">
                        <MoreVertical className="h-4 w-4 text-[#292524]" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-36 rounded-xl border-[#E7E5E4]"
                      >
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/dashboard/creator/products/${product.id}/edit`,
                            )
                          }
                          className="cursor-pointer text-xs"
                        >
                          <Edit2 className="mr-2 h-3.5 w-3.5" /> Edit Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(product.id)}
                          className="cursor-pointer text-xs text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-3.5 w-3.5" /> Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h4 className="font-semibold text-sm text-[#111827] line-clamp-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base font-bold text-[#6355D9]">
                      Rp {Number(product.price).toLocaleString("id-ID")}
                    </span>
                    <span className="text-xs text-[#78716C]">
                      Stok:{" "}
                      <strong className="text-[#111827]">
                        {product.stock}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="border-t border-[#E7E5E4]/80 p-3 bg-[#FAFAF9]/50 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] text-[#10B981] font-medium">
                  <CheckCircle2 className="h-3 w-3" /> Siap Dipesan
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                  render={
                    <Link
                      href={`/dashboard/creator/products/${product.id}/edit`}
                    />
                  }
                  className="h-8 px-2.5 text-xs text-[#6355D9] hover:bg-[#EDE9FE] hover:text-[#6355D9]"
                >
                  Edit <Edit2 className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
