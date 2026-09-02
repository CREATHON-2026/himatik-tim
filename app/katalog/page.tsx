"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  ShoppingBag,
  LogOut,
  PackageOpen,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { getPublicProducts } from "@/features/products/api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CATEGORIES = [
  { id: "ALL", label: "Semua Karya", dbCategory: "ALL", icon: Gift },
  { id: "FLORAL", label: "Buket & Floral", dbCategory: "Bouquet & Floral Gifts", icon: Sparkles },
  { id: "HAMPERS", label: "Hampers & Gift Box", dbCategory: "Gift Box & Hampers", icon: Gift },
  { id: "CUSTOM_ART", label: "Custom Art & Kriya", dbCategory: "Personalized & Custom Gifts", icon: Tag },
  { id: "FOOD", label: "Kuliner & Manisan", dbCategory: "Food & Sweet Gifts", icon: Store },
  { id: "HANDMADE", label: "Handmade & Kreatif", dbCategory: "Handmade & Creative Gifts", icon: Sparkles },
  { id: "LIFESTYLE", label: "Aksesoris Etnik", dbCategory: "Lifestyle & Accessories Gifts", icon: Store },
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
  const router = useRouter();
  const { user, isAuthenticated, signOut, isLoading: isAuthLoading } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("ALL");
  const [selectedSort, setSelectedSort] = React.useState("newest");
  const [likedProducts, setLikedProducts] = React.useState<Record<string, boolean>>({});

  // Fetch public products from real database
  const { data: rawProducts = [], isLoading } = useQuery({
    queryKey: ["public-products", selectedCategory, selectedSort],
    queryFn: () =>
      getPublicProducts({
        category: selectedCategory,
        sort: selectedSort,
      }),
  });

  // Fetch buyer orders count for dynamic badge
  const { data: orders = [] } = useQuery({
    queryKey: ["buyer-orders-count", user?.id],
    queryFn: async () => {
      try {
        const res = await fetch("/api/orders");
        const json = await res.json();
        return json.orders || [];
      } catch {
        return [];
      }
    },
    enabled: !!user,
  });

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Client-side instant filter & search & sorting
  const filteredProducts = React.useMemo(() => {
    let list = Array.isArray(rawProducts) ? [...rawProducts] : [];

    // Category filter
    if (selectedCategory !== "ALL") {
      const activeCat = CATEGORIES.find((c) => c.id === selectedCategory);
      const targetDb = activeCat?.dbCategory?.toLowerCase() || "";
      const targetId = selectedCategory.toLowerCase();
      const targetLabel = activeCat?.label?.toLowerCase() || "";

      list = list.filter((p) => {
        const pCat = (p.category || "").toLowerCase();
        return (
          (targetDb && pCat.includes(targetDb)) ||
          (targetDb && targetDb.includes(pCat)) ||
          pCat.includes(targetId) ||
          pCat.includes(targetLabel)
        );
      });
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // Sort order
    if (selectedSort === "price_asc") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (selectedSort === "price_desc") {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (selectedSort === "newest") {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  }, [rawProducts, selectedCategory, searchQuery, selectedSort]);

  // Helper initials for user avatar
  const userInitials = (() => {
    if (!user?.name) return "G";
    const parts = user.name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return user.name.slice(0, 2).toUpperCase();
  })();

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
              Gifteria<span className="text-[#6355D9]">.</span>
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

          {/* User & Creator Actions (Auth-State Aware) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {isAuthLoading ? (
              // Skeleton loading placeholder
              <div className="flex items-center gap-2 animate-pulse">
                <div className="h-8 w-20 bg-stone-200 rounded-full" />
                <div className="h-8 w-8 bg-stone-200 rounded-full" />
              </div>
            ) : isAuthenticated && user ? (
              // ─── LOGGED IN STATE ───
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Wishlist Button */}
                <Link
                  href="/katalog"
                  className="p-2 rounded-full border border-[#E7E5E4] bg-white text-[#78716C] hover:text-[#6355D9] hover:border-[#DDD6FE] hover:bg-[#FAF8FF] transition shadow-2xs"
                  title="Daftar Favorit"
                >
                  <Heart className="size-4" />
                </Link>

                {/* Orders / Pesanan Saya Button */}
                <Link
                  href="/orders"
                  className="relative p-2 rounded-full border border-[#E7E5E4] bg-white text-[#78716C] hover:text-[#6355D9] hover:border-[#DDD6FE] hover:bg-[#FAF8FF] transition shadow-2xs"
                  title="Pesanan Saya"
                >
                  <ShoppingBag className="size-4" />
                  {orders.length > 0 && (
                    <span className="absolute -top-1 -right-1 size-4 rounded-full bg-[#6355D9] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                      {orders.length}
                    </span>
                  )}
                </Link>

                {/* Role-specific Quick Navigation for Creator/Admin */}
                {user.role === "CREATOR" && (
                  <Link
                    href="/dashboard/creator"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDE9FE] border border-[#DDD6FE] text-[#6355D9] font-semibold text-xs hover:bg-[#E0DAFB] transition shadow-2xs"
                  >
                    <LayoutDashboard className="size-3.5" />
                    <span>Dashboard Sanggar</span>
                  </Link>
                )}

                {user.role === "ADMIN" && (
                  <Link
                    href="/dashboard/admin"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDE9FE] border border-[#DDD6FE] text-[#6355D9] font-semibold text-xs hover:bg-[#E0DAFB] transition shadow-2xs"
                  >
                    <ShieldCheck className="size-3.5" />
                    <span>Panel Admin</span>
                  </Link>
                )}

                {/* Customer Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 py-1 pl-1 pr-2.5 rounded-full border border-[#E7E5E4] bg-white hover:bg-[#FAF8FF] hover:border-[#DDD6FE] transition shadow-2xs cursor-pointer select-none group outline-none">
                    {/* Avatar Bubble */}
                    <div className="size-7 rounded-full bg-[#EDE9FE] text-[#6355D9] font-bold text-xs flex items-center justify-center border border-[#DDD6FE] shrink-0">
                      {userInitials}
                    </div>

                    {/* Name & Role */}
                    <div className="hidden sm:flex flex-col text-left leading-tight">
                      <span className="text-xs font-semibold text-[#111827] max-w-[100px] truncate">
                        {user.name}
                      </span>
                      <span className="text-[10px] text-[#78716C]">
                        {user.role === "CREATOR" ? "Kreator" : user.role === "ADMIN" ? "Admin" : "Customer"}
                      </span>
                    </div>

                    <ChevronDown className="size-3.5 text-[#78716C] group-hover:text-[#111827] transition-transform" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="w-56 rounded-2xl border border-[#E7E5E4] bg-white p-1.5 shadow-lg select-none"
                  >
                    {/* Header Info */}
                    <div className="px-3 py-2 border-b border-[#F5F5F4] mb-1">
                      <p className="text-xs font-bold text-[#111827] truncate">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-[#78716C] truncate">
                        {user.email}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#EDE9FE] text-[#6355D9] text-[10px] font-semibold">
                        {user.role === "CREATOR" ? "Mitra Kreator" : user.role === "ADMIN" ? "Administrator" : "Customer"}
                      </span>
                    </div>

                    <DropdownMenuGroup>
                      {/* Pesanan Saya */}
                      <DropdownMenuItem
                        onClick={() => router.push("/orders")}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#44403C] hover:text-[#111827] hover:bg-[#F5F5F4] cursor-pointer transition font-medium"
                      >
                        <PackageOpen className="size-4 text-[#6355D9]" />
                        <span>Pesanan Saya</span>
                      </DropdownMenuItem>

                      {/* Favorit */}
                      <DropdownMenuItem
                        onClick={() => router.push("/katalog")}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#44403C] hover:text-[#111827] hover:bg-[#F5F5F4] cursor-pointer transition font-medium"
                      >
                        <Heart className="size-4 text-[#6355D9]" />
                        <span>Koleksi Favorit</span>
                      </DropdownMenuItem>

                      {/* If Customer, offer Buka Toko Mitra option */}
                      {user.role === "CUSTOMER" && (
                        <DropdownMenuItem
                          onClick={() => router.push("/register?role=CREATOR")}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#6355D9] hover:bg-[#FAF8FF] cursor-pointer transition font-semibold"
                        >
                          <Store className="size-4 text-[#6355D9]" />
                          <span>Buka Toko Mitra</span>
                        </DropdownMenuItem>
                      )}

                      {/* If Creator, link to Creator Dashboard */}
                      {user.role === "CREATOR" && (
                        <DropdownMenuItem
                          onClick={() => router.push("/dashboard/creator")}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#6355D9] hover:bg-[#FAF8FF] cursor-pointer transition font-semibold"
                        >
                          <LayoutDashboard className="size-4 text-[#6355D9]" />
                          <span>Dashboard Sanggar</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="my-1 border-[#F5F5F4]" />

                    {/* Logout Button */}
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 cursor-pointer transition font-medium"
                    >
                      <LogOut className="size-4 text-rose-600" />
                      <span>Keluar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              // ─── GUEST STATE (NOT LOGGED IN) ───
              <div className="flex items-center gap-2 sm:gap-3">
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
            )}
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
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-2xs cursor-pointer ${
                    isActive
                      ? "bg-[#6355D9] text-white shadow-xs"
                      : "bg-white border border-[#E7E5E4] text-[#78716C] hover:border-[#DDD6FE] hover:text-[#111827]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#8B7CF6]"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sort Selector Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <span className="text-xs font-medium text-[#78716C] flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Urutkan:
            </span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-white border border-[#E7E5E4] rounded-full px-3 py-1.5 text-xs font-semibold text-[#111827] outline-none focus:border-[#6355D9] cursor-pointer shadow-2xs"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ─── Product Grid ─── */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl p-4 border border-[#E7E5E4] space-y-3 animate-pulse shadow-xs"
              >
                <div className="w-full aspect-square bg-[#F5F5F4] rounded-2xl" />
                <div className="h-4 bg-[#F5F5F4] rounded-full w-3/4" />
                <div className="h-3 bg-[#F5F5F4] rounded-full w-1/2" />
                <div className="h-5 bg-[#F5F5F4] rounded-full w-2/3 pt-2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E7E5E4] p-8 space-y-4 shadow-xs">
            <div className="w-16 h-16 bg-[#EDE9FE] rounded-full flex items-center justify-center mx-auto text-[#6355D9]">
              <Gift className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#111827]">
              Belum Ada Karya yang Sesuai
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto">
              Kreator kriya kami terus memperbarui koleksi terbaru. Coba ganti kata kunci pencarian
              atau pilih kategori karya lainnya.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isLiked = !!likedProducts[product.id];
              // Safe access creator fields
              const creatorInfo = (product as unknown as { creator?: { shopName?: string; storeName?: string; city?: string } })?.creator;
              const storeName = creatorInfo?.shopName || creatorInfo?.storeName || "Gifteria Studio";
              const cityName = creatorInfo?.city || "Makassar";

              return (
                <Link
                  key={product.id}
                  href={`/katalog/${product.id}`}
                  className="group relative bg-white rounded-3xl border border-[#E7E5E4] hover:border-[#DDD6FE] transition-all duration-300 hover:shadow-md flex flex-col overflow-hidden"
                >
                  {/* Image Container with aspect ratio */}
                  <div className="relative w-full aspect-square bg-[#F5F5F4] overflow-hidden">
                    <Image
                      src={
                        product.imageUrl ||
                        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
                      }
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Like/Wishlist Heart Toggle */}
                    <button
                      onClick={(e) => toggleLike(product.id, e)}
                      aria-label="Simpan ke favorit"
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-xs cursor-pointer ${
                        isLiked
                          ? "bg-rose-50 text-rose-500 fill-rose-500 scale-110"
                          : "bg-white/80 text-[#78716C] hover:text-[#111827] hover:bg-white"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500" : ""}`} />
                    </button>

                    {/* Ready / Preorder Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E7E5E4] text-[10px] font-bold text-[#44403C] shadow-2xs">
                        {product.type === "PREORDER" ? "Pre-order" : "Ready Stock"}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      {/* Creator Shop Name & City */}
                      <div className="flex items-center gap-1.5 text-[11px] text-[#78716C]">
                        <Store className="w-3 h-3 text-[#6355D9]" />
                        <span className="font-medium truncate">{storeName}</span>
                        <span>•</span>
                        <span className="truncate">{cityName}</span>
                      </div>

                      {/* Title */}
                      <h4 className="font-serif font-bold text-sm text-[#111827] line-clamp-2 leading-snug group-hover:text-[#6355D9] transition-colors">
                        {product.name}
                      </h4>
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-2 border-t border-[#F5F5F4] flex items-center justify-between">
                      <div className="font-serif text-base font-bold text-[#111827]">
                        {formatRupiah(product.price)}
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6355D9] group-hover:translate-x-0.5 transition-transform">
                        <span>Detail</span>
                        <ChevronRight className="w-3.5 h-3.5" />
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
