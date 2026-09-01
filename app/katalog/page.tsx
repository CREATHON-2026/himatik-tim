"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  Sparkles,
  Search,
  ShieldCheck,
  Heart,
  ArrowUpDown,
  Tag,
  Gift,
  Store,
  ChevronRight,
} from "lucide-react";
import { getPublicProducts } from "@/features/products/api";

const CATEGORIES = [
  { id: "ALL", label: "Semua Karya", icon: Gift },
  { id: "FLORAL", label: "Buket & Floral", icon: Sparkles },
  { id: "HAMPERS", label: "Hampers & Gift Box", icon: Gift },
  { id: "CUSTOM_ART", label: "Custom Art & Kriya", icon: Tag },
  { id: "SOUVENIR", label: "Souvenir & Cendera Mata", icon: Store },
  { id: "ACCESSORIES", label: "Aksesoris Etnik", icon: Sparkles },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Paling Baru" },
  { value: "price_asc", label: "Harga Terendah" },
  { value: "price_desc", label: "Harga Tertinggi" },
];

const formatRupiah = (price: number | string) => {
  const num = typeof price === "string" ? Number(price) : price;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
};

export default function KatalogPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("ALL");
  const [selectedSort, setSelectedSort] = React.useState("newest");
  const [likedProducts, setLikedProducts] = React.useState<Record<string, boolean>>({});

  // Fetch public products from real database
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["public-products", selectedCategory, selectedSort],
    queryFn: () =>
      getPublicProducts({
        category: selectedCategory,
        sort: selectedSort,
      }),
  });

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Client-side search filtering
  const filteredProducts = React.useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111827] antialiased selection:bg-[#6355D9]/20 selection:text-[#6355D9]">
      {/* ─── Top Navbar ─── */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E7E5E4] bg-white/85 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-[#111827] group">
            <span className="p-1.5 rounded-xl bg-[#EDE9FE] border border-[#DDD6FE] text-[#6355D9] group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-serif tracking-tight text-xl">
              Creathon<span className="text-[#6355D9]">.</span>
            </span>
          </Link>

          {/* Search Bar on Desktop Navbar */}
          <div className="hidden md:flex items-center flex-1 max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari hampers, buket bunga, lukisan custom..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#F5F5F4] border border-[#E7E5E4] focus:border-[#6355D9] focus:bg-white text-xs text-[#111827] placeholder:text-[#A8A29E] outline-none transition-all shadow-2xs focus:ring-2 focus:ring-[#6355D9]/15"
            />
            <Search className="w-4 h-4 text-[#A8A29E] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* User & Creator Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-[#78716C] hover:text-[#111827] transition"
            >
              Masuk
            </Link>
            <Link
              href="/register?role=CREATOR"
              className="px-4 py-1.5 rounded-full bg-[#6355D9] hover:bg-[#5145C6] text-white font-semibold text-xs transition shadow-xs hover:shadow-sm active:scale-98"
            >
              Buka Toko Mitra
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Editorial Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-[#DDD6FE]/70 bg-linear-to-br from-[#EDE9FE]/60 via-[#FAF5FF]/80 to-[#FAF4EC]/70 p-6 sm:p-10 shadow-xs">
          <div className="max-w-2xl space-y-3.5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#DDD6FE] text-[#6355D9] text-xs font-semibold shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5" /> Jaminan Karya Autentik & Artisan Terkurasi
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] leading-[1.15]">
              Eksplorasi Hadiah & Karya Kriya Autentik
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed max-w-xl">
              Temukan buket bunga eksklusif, hampers perayaan, dan kerajinan kriya yang dibuat
              langsung dengan sentuhan personal oleh para kreator kriya terbaik se-Indonesia.
            </p>
          </div>

          {/* Soft Editorial Decorative Circle */}
          <div className="pointer-events-none absolute -right-12 -bottom-12 w-96 h-96 bg-[#8B7CF6]/15 blur-3xl rounded-full" />
        </div>

        {/* ─── Search Bar (Mobile View) ─── */}
        <div className="flex md:hidden items-center w-full relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari hadiah, hampers, buket..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-[#E7E5E4] focus:border-[#6355D9] text-xs text-[#111827] placeholder:text-[#A8A29E] outline-none shadow-2xs"
          />
          <Search className="w-4 h-4 text-[#A8A29E] absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* ─── Filter Pills & Sort Bar ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5E4] pb-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#6355D9] text-white shadow-xs"
                      : "bg-white border border-[#E7E5E4] text-[#78716C] hover:border-[#6355D9]/40 hover:text-[#111827]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <span className="text-xs text-[#78716C] font-medium flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Urutkan:
            </span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-white border border-[#E7E5E4] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#111827] outline-none focus:border-[#6355D9] cursor-pointer shadow-2xs"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ─── Product Catalog Grid ─── */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-[#E7E5E4] p-3 space-y-3 animate-pulse shadow-xs"
              >
                <div className="aspect-square w-full rounded-xl bg-[#F5F5F4]" />
                <div className="h-4 bg-[#F5F5F4] rounded-md w-3/4" />
                <div className="h-3 bg-[#F5F5F4] rounded-md w-1/2" />
                <div className="h-5 bg-[#F5F5F4] rounded-md w-1/3 pt-2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 space-y-3 bg-white rounded-3xl border border-red-200 p-8">
            <p className="text-red-600 font-semibold text-sm">Gagal memuat katalog produk.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#6355D9] text-white text-xs font-semibold rounded-full"
            >
              Coba Muat Ulang
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-[#E7E5E4] p-8">
            <div className="size-14 mx-auto rounded-full bg-[#EDE9FE] flex items-center justify-center text-[#6355D9]">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#111827]">
              Tidak Ada Karya yang Ditemukan
            </h3>
            <p className="text-xs text-[#78716C] max-w-sm mx-auto">
              Belum ada produk untuk kategori atau kata kunci ini. Silakan coba pilih kategori lain
              atau hapus filter pencarian Anda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isLiked = !!likedProducts[product.id];
              return (
                <Link
                  key={product.id}
                  href={`/katalog/${product.id}`}
                  className="group block bg-white rounded-2xl border border-[#E7E5E4] p-3 hover:border-[#6355D9]/40 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                >
                  {/* Photo Thumbnail */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#F5F5F4]">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="size-full flex items-center justify-center bg-linear-to-br from-[#EDE9FE] to-[#FAF5FF] text-[#6355D9]">
                        <Gift className="w-8 h-8 opacity-40" />
                      </div>
                    )}

                    {/* Stock status badge */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-xs text-[#6355D9] border border-[#DDD6FE] shadow-2xs">
                        {product.stock > 0 ? "Ready Stock" : "Pre-Order"}
                      </span>
                    </div>

                    {/* Heart Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleLike(product.id, e)}
                      className={`absolute top-2.5 right-2.5 z-10 size-8 rounded-full flex items-center justify-center backdrop-blur-xs transition-all ${
                        isLiked
                          ? "bg-rose-50 text-rose-500 border border-rose-200"
                          : "bg-white/80 text-[#78716C] hover:text-rose-500 border border-white/40"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500" : ""}`} />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="pt-3 pb-1 space-y-2">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8A29E]">
                        {product.category}
                      </span>
                      <h3 className="font-semibold text-sm text-[#111827] group-hover:text-[#6355D9] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[#F5F5F4]">
                      <div>
                        <span className="text-[10px] text-[#78716C] block">Harga</span>
                        <span className="font-bold text-sm text-[#6355D9]">
                          {formatRupiah(product.price)}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6355D9] group-hover:translate-x-0.5 transition-transform">
                        Detail <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
