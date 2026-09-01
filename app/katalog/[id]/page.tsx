"use client";

import * as React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Truck,
  Heart,
  Share2,
  Package,
} from "lucide-react";
import { toast } from "sonner";

import { getProductDetail } from "@/features/products/api";
import { ImageGallery } from "@/features/products/components/ImageGallery";
import { ProductHeaderInfo } from "@/features/products/components/ProductHeaderInfo";
import { ProductPurchaseCard } from "@/features/products/components/ProductPurchaseCard";
import { CreatorInfoCard } from "@/features/products/components/CreatorInfoCard";
import { ProductTabsSection } from "@/features/products/components/ProductTabsSection";
import { ProductBreadcrumbBar } from "@/features/products/components/ProductBreadcrumbBar";
import { ProductDetailSkeleton } from "@/features/products/components/ProductDetailSkeleton";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BuyerProductDetailPage({ params }: ProductDetailPageProps) {
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
    toast.success(`${qty}x "${product?.name}" berhasil ditambahkan ke keranjang!`);
  };

  const handleBuyNow = (qty: number) => {
    if (!product) return;
    const phone = product.creator?.whatsapp || "6281234567890";
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `Halo ${product.creator?.shopName || "Kreator Creathon"}, saya ingin memesan ${qty}x "${product.name}" seharga Rp${(Number(product.price) * qty).toLocaleString("id-ID")} melalui katalog Creathon.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
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
          <ArrowLeft className="size-4" /> Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111827] antialiased pb-16 selection:bg-[#6355D9]/20 selection:text-[#6355D9]">
      {/* ─── Top Navbar ─── */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E7E5E4] bg-white/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/katalog"
              className="p-2 rounded-full border border-[#E7E5E4] bg-[#F5F5F4] hover:bg-white text-[#78716C] hover:text-[#111827] transition"
              aria-label="Kembali ke Katalog"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[#111827]">
              <span className="p-1.5 rounded-xl bg-[#EDE9FE] border border-[#DDD6FE] text-[#6355D9]">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="font-serif tracking-tight text-xl">
                Creathon<span className="text-[#6355D9]">.</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full border border-[#E7E5E4] bg-white text-[#78716C] hover:text-[#111827] transition shadow-2xs cursor-pointer"
              title="Bagikan Tautan Produk"
            >
              <Share2 className="size-4" />
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full border transition shadow-2xs cursor-pointer ${
                isWishlisted
                  ? "bg-rose-50 border-rose-200 text-rose-500"
                  : "bg-white border-[#E7E5E4] text-[#78716C] hover:text-rose-500"
              }`}
              title="Simpan ke Favorit"
            >
              <Heart className={`size-4 ${isWishlisted ? "fill-rose-500" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main Content Container ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
        {/* Breadcrumb Navigation */}
        <ProductBreadcrumbBar
          category={product.category}
          productName={product.name}
        />

        {/* ─── Top Two-Column Showcase Area ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E7E5E4] p-4 sm:p-6 shadow-xs">
            <ImageGallery
              imageUrl={product.imageUrl || null}
              gallery={product.gallery || []}
              averageRating={product.averageRating || 4.9}
            />
          </div>

          {/* Right Column: Info & Purchase Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header Info */}
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-4">
              <ProductHeaderInfo
                name={product.name}
                category={product.category}
                averageRating={product.averageRating || 4.9}
                reviewCount={product.reviewCount || 12}
                tags={product.tags || []}
                onReviewsClick={() => setActiveTab("ulasan")}
              />

              <div className="pt-2 border-t border-[#F5F5F4] flex items-center gap-4 text-xs text-[#78716C]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="size-4 text-[#6355D9]" /> Karya 100% Autentik
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="size-4 text-[#6355D9]" /> Pengiriman Cepat & Aman
                </span>
              </div>
            </div>

            {/* Purchase Control Card */}
            <ProductPurchaseCard
              price={Number(product.price)}
              stock={product.stock}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* ─── Middle Section: Creator Sanggar Profile ─── */}
        {product.creator && (
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs">
            <CreatorInfoCard creator={product.creator} />
          </div>
        )}

        {/* ─── Bottom Section: Detail Tabs ─── */}
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
      </main>
    </div>
  );
}
