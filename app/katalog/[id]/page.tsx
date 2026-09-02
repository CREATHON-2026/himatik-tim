"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ShieldCheck,
  Heart,
  Share2,
  Package,
  Search,
  ShoppingBag,
  User,
  Home,
  ChevronRight,
  Gift,
} from "lucide-react";
import { toast } from "sonner";

import { getProductDetail } from "@/features/products/api";
import { ImageGallery } from "@/features/products/components/ImageGallery";
import { ProductHeaderInfo } from "@/features/products/components/ProductHeaderInfo";
import { ProductPurchaseCard } from "@/features/products/components/ProductPurchaseCard";
import { CreatorInfoCard } from "@/features/products/components/CreatorInfoCard";
import { ProductTabsSection } from "@/features/products/components/ProductTabsSection";
import { ProductDetailSkeleton } from "@/features/products/components/ProductDetailSkeleton";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BuyerProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const productId = resolvedParams.id;

  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"deskripsi" | "spesifikasi" | "ulasan">("deskripsi");

  // Fetch product detail using TanStack Query
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["public-product-detail", productId],
    queryFn: () => getProductDetail(productId),
  });

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Tautan produk berhasil disalin!");
    }
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      !isWishlisted ? "Ditambahkan ke daftar favorit!" : "Dihapus dari daftar favorit!"
    );
  };

  const handleAddToCart = (qty: number) => {
    if (!product) return;
    try {
      const stored = localStorage.getItem("gifteria_cart");
      const currentCart = stored ? JSON.parse(stored) : [];
      const existingIdx = currentCart.findIndex(
        (i: { productId: string; quantity: number }) => i.productId === product.id
      );

      if (existingIdx > -1) {
        currentCart[existingIdx].quantity += qty;
      } else {
        currentCart.push({
          id: `cart-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: Number(product.price),
          imageUrl: product.imageUrl || "/aset/produk-soft-lilac.jpg",
          shopName: product.creator?.shopName || "Gifteria Studio",
          category: product.category,
          quantity: qty,
        });
      }

      localStorage.setItem("gifteria_cart", JSON.stringify(currentCart));
      toast.success(`${qty}x "${product.name}" berhasil ditambahkan ke keranjang belanja!`);
    } catch {
      toast.success(`${qty}x "${product.name}" ditambahkan ke keranjang!`);
    }
  };

  const handleBuyNow = (qty: number) => {
    if (!product) return;
    router.push(`/checkout?productId=${product.id}&qty=${qty}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] p-6 md:p-10">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="size-16 rounded-full bg-[#EDE9FE] flex items-center justify-center text-[#6355D9]">
          <Package className="size-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#111827]">
          Karya Kriya Tidak Ditemukan
        </h2>
        <p className="text-sm text-[#78716C] max-w-sm">
          Produk ini mungkin telah diarsipkan atau belum dipublikasikan oleh kreator sanggar.
        </p>
        <Link
          href="/katalog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6355D9] text-white text-xs font-semibold hover:bg-[#5145C6] transition shadow-xs"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111827] antialiased pb-16 selection:bg-[#6355D9]/20 selection:text-[#6355D9]">
      {/* ─── 1. TOP MARKETPLACE NAVBAR (Aligned with Gifteria Design) ─── */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E7E5E4] bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Left: Brand Logo */}
          <Link href="/katalog" className="flex items-center gap-2.5 shrink-0">
            <div className="size-9 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] text-[#6355D9] flex items-center justify-center shadow-2xs">
              <Gift className="size-5" />
            </div>
            <span className="font-serif tracking-tight text-2xl font-bold text-[#111827]">
              Gifteria
            </span>
          </Link>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-[#78716C] hover:text-[#111827] transition">
              Beranda
            </Link>
            <Link href="/katalog" className="text-[#6355D9] font-semibold transition">
              Koleksi
            </Link>
            <Link href="/katalog?category=hadiah" className="text-[#78716C] hover:text-[#111827] transition">
              Hadiah
            </Link>
            <Link href="/katalog?category=hampers" className="text-[#78716C] hover:text-[#111827] transition">
              Hampers
            </Link>
          </nav>

          {/* Right: Search Bar & Utilities */}
          <div className="flex items-center gap-3">
            {/* Search Input Pill */}
            <div className="relative hidden sm:block w-48 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#A8A29E]" />
              <input
                type="text"
                placeholder="Cari produk, hampers, hadiah..."
                className="w-full pl-9 pr-4 py-1.5 rounded-full border border-[#E7E5E4] bg-[#FAFAF9] text-xs text-[#111827] placeholder:text-[#A8A29E] outline-none focus:border-[#6355D9] focus:bg-white transition"
              />
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full border transition cursor-pointer ${
                isWishlisted
                  ? "bg-rose-50 border-rose-200 text-rose-500"
                  : "bg-white border-[#E7E5E4] text-[#78716C] hover:text-[#111827]"
              }`}
              title="Daftar Favorit"
            >
              <Heart className={`size-4.5 ${isWishlisted ? "fill-rose-500" : ""}`} />
            </button>

            {/* Orders / Pesanan Saya Button */}
            <Link
              href="/orders"
              className="relative p-2 rounded-full border border-[#E7E5E4] bg-white text-[#78716C] hover:text-[#6355D9] hover:border-[#DDD6FE] hover:bg-[#FAF8FF] transition cursor-pointer"
              title="Pesanan Saya"
            >
              <ShoppingBag className="size-4.5" />
              <span className="absolute -top-1 -right-1 size-4 rounded-full bg-[#6355D9] text-white text-[10px] font-bold flex items-center justify-center">
                1
              </span>
            </Link>

            {/* Orders / Profile Link */}
            <Link
              href="/orders"
              className="p-2 rounded-full border border-[#E7E5E4] bg-[#FAFAF9] text-[#78716C] hover:text-[#6355D9] hover:border-[#DDD6FE] hover:bg-[#FAF8FF] transition"
              title="Pesanan Saya"
            >
              <User className="size-4.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ─── 2. MAIN CONTENT CONTAINER ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Breadcrumbs & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#78716C]">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-[#111827] flex items-center gap-1">
              <Home className="size-3.5" />
              <span>Beranda</span>
            </Link>
            <ChevronRight className="size-3 text-[#A8A29E]" />
            <Link href="/katalog" className="hover:text-[#111827]">
              {product.category || "Gift Box & Hampers"}
            </Link>
            <ChevronRight className="size-3 text-[#A8A29E]" />
            <span className="font-semibold text-[#111827] truncate max-w-xs">
              {product.name}
            </span>
          </div>

          {/* Action Buttons: Bagikan & Simpan */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#E7E5E4] bg-white text-[#44403C] hover:bg-[#FAFAF9] hover:border-[#DDD6FE] transition text-xs font-medium shadow-2xs cursor-pointer"
            >
              <Share2 className="size-3.5 text-[#6355D9]" />
              <span>Bagikan</span>
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition text-xs font-medium shadow-2xs cursor-pointer ${
                isWishlisted
                  ? "bg-rose-50 border-rose-200 text-rose-500"
                  : "bg-white border-[#E7E5E4] text-[#44403C] hover:bg-[#FAFAF9]"
              }`}
            >
              <Heart className={`size-3.5 ${isWishlisted ? "fill-rose-500 text-rose-500" : "text-[#78716C]"}`} />
              <span>Simpan</span>
            </button>
          </div>
        </div>

        {/* ─── 3. TOP TWO-COLUMN SHOWCASE AREA ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Gallery (7 Cols) */}
          <div className="lg:col-span-7">
            <ImageGallery
              imageUrl={product.imageUrl || null}
              gallery={product.gallery || []}
              averageRating={product.averageRating || 4.9}
            />
          </div>

          {/* Right Column: Stacked 3 Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Card 1: Header Info & Badges */}
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs">
              <ProductHeaderInfo
                name={product.name}
                category={product.category}
                averageRating={product.averageRating || 4.9}
                reviewCount={product.reviewCount || 12}
                tags={product.tags || []}
                onReviewsClick={() => setActiveTab("ulasan")}
              />
            </div>

            {/* Card 2: Price, Stepper & Action Buttons */}
            <ProductPurchaseCard
              price={Number(product.price)}
              stock={product.stock}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />

            {/* Card 3: Creator / Store Profile Card */}
            {product.creator && (
              <CreatorInfoCard creator={product.creator} />
            )}
          </div>
        </div>

        {/* ─── 4. MIDDLE SECTION: TABS & QUICK SPEC PILLARS ─── */}
        <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs">
          <ProductTabsSection
            product={{
              ...product,
              price: String(product.price),
              reviews: product.reviews || [],
              averageRating: product.averageRating || 4.9,
              reviewCount: product.reviewCount || 12,
            }}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* ─── 5. BOTTOM SECTION: TRUST & VALUE PROPOSITION BANNER ─── */}
        <div className="rounded-3xl border border-[#DDD6FE]/80 bg-gradient-to-r from-[#FAF8FF] via-white to-[#FAF8FF] p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-around gap-4 text-center select-none">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#111827]">
            <ShieldCheck className="size-4.5 text-[#6355D9]" />
            <span>100% Produk Original</span>
          </div>

          <span className="hidden sm:inline text-[#E7E5E4]">|</span>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#111827]">
            <ShieldCheck className="size-4.5 text-[#6355D9]" />
            <span>Garansi Kepuasan</span>
          </div>

          <span className="hidden sm:inline text-[#E7E5E4]">|</span>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#111827]">
            <Gift className="size-4.5 text-[#6355D9]" />
            <span>Pengemasan Premium</span>
          </div>
        </div>
      </main>
    </div>
  );
}
