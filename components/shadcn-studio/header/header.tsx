"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SearchInput } from "@/components/ui/search-input";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  ClipboardList,
  Heart,
  Bell,
  ShoppingCart,
  ChevronDown,
  Search,
} from "lucide-react";

export function Header() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Hide header on login, register, dashboard, admin, landing-page, and root homepage
  const hideHeaderRoutes = ["/login", "/register", "/dashboard", "/admin", "/landing-page"];
  const shouldHide =
    pathname === "/" ||
    hideHeaderRoutes.some((route) => pathname?.startsWith(route));

  const [keyword, setKeyword] = useState("");

  // Sync keyword input value with URL parameter ?keyword=
  useEffect(() => {
    const currentKeyword = searchParams.get("keyword") || "";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setKeyword(currentKeyword);
  }, [searchParams]);

  // Close mobile search on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileSearchOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    if (keyword.trim()) {
      params.set("keyword", keyword.trim());
    } else {
      params.delete("keyword");
    }
    params.delete("page");
    router.push(`/market?${params.toString()}`);
    setIsMobileSearchOpen(false);
  };

  const handleClearSearch = () => {
    setKeyword("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("keyword");
    params.delete("page");
    router.push(`/market?${params.toString()}`);
  };

  const isActiveTab = (path: string) => {
    return pathname === path;
  };

  const handleAccountClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role === "CREATOR") {
      router.push("/dashboard");
    } else if (user.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/profile");
    }
  };

  if (shouldHide) return null;

  return (
    <header className="sticky top-0 z-50 flex w-full flex-col bg-[#FAF4EC]/60 backdrop-blur-md select-none transition-all">
      <div className="flex w-full items-center justify-between px-4 sm:px-6">
        
        {/* LEFT: Logo Brand Image with Responsive Scaling */}
        <Link href="/" className="group flex items-center gap-2 shrink-0">
          <div className="flex flex-col text-left">
            <div className="relative h-11 w-36 sm:h-13 sm:w-44 md:h-14 md:w-48 transition-all">
              <Image
                src="/logo/brand-logo-text.webp"
                alt="Bicket - Every bouquet, carries a story"
                fill
                sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 208px"
                className="object-contain object-left scale-120 sm:scale-130 md:scale-135 origin-left"
                priority
              />
            </div>
          </div>
        </Link>

        {/* MIDDLE-LEFT: Desktop Navigation Tabs (Hidden on Mobile/Tablet) */}
        <nav className="hidden items-center gap-2 pl-4 lg:flex">
          {isActiveTab("/market") ? (
            <Button
              variant="skeuo-peach-secondary"
              className="flex h-8.5 gap-1.5 px-3.5 text-xs font-bold select-none"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Market</span>
            </Button>
          ) : (
            <Link href="/market">
              <Button
                variant="skeuo-paper-secondary"
                className="flex h-8.5 gap-1.5 px-3.5 text-xs font-bold text-[#3E5237]/80 hover:text-[#3E5237]"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Market</span>
              </Button>
            </Link>
          )}

          {pathname === "/orders" || pathname?.startsWith("/orders/") ? (
            <Button
              variant="skeuo-peach-secondary"
              className="flex h-8.5 gap-1.5 px-3.5 text-xs font-bold select-none"
            >
              <ClipboardList className="h-4 w-4" />
              <span>Pesanan</span>
            </Button>
          ) : (
            <Link href="/orders">
              <Button
                variant="skeuo-paper-secondary"
                className="flex h-8.5 gap-1.5 px-3.5 text-xs font-bold text-[#3E5237]/80 hover:text-[#3E5237]"
              >
                <ClipboardList className="h-4 w-4" />
                <span>Pesanan</span>
              </Button>
            </Link>
          )}

          <Button
            variant="skeuo-paper-secondary"
            disabled
            className="flex h-8.5 cursor-not-allowed gap-1.5 px-3.5 text-xs font-bold opacity-60 text-[#3E5237]/50"
          >
            <Heart className="h-4 w-4" />
            <span>Favorit</span>
          </Button>
        </nav>

        {/* MIDDLE-RIGHT: Desktop Search Input */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex relative mx-4 max-w-sm flex-1 items-center"
        >
          <SearchInput
            variant="skeuo-paper"
            placeholder="Cari bunga, rangkaian, atau momen spesial..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onClear={handleClearSearch}
            className="w-full text-xs"
          />
        </form>

        {/* RIGHT: Actions & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Mobile Search Toggle Button (<768px) */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-2 text-[#3E5237]/85 hover:text-[#3E5237] transition-transform active:scale-95"
            aria-label="Cari Produk"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Shopping Cart Icon with Green Badge */}
          <button className="relative p-2 text-[#3E5237]/85 transition-all hover:scale-105 hover:text-[#3E5237] active:scale-95">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#566B4D] text-[8px] font-bold text-white shadow-xs">
              2
            </span>
          </button>

          {/* Bell notification icon with Red Dot (Hidden on small mobile) */}
          <button className="hidden sm:block relative p-2 text-[#3E5237]/85 transition-all hover:scale-105 hover:text-[#3E5237] active:scale-95">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-[#D79C9A] ring-1 ring-white" />
          </button>

          {/* Account Profile / Login Button State */}
          <div className="flex items-center gap-2 border-l border-[#78865C]/25 pl-2 sm:pl-3">
            {authLoading ? (
              <div className="h-8 w-20 animate-pulse rounded-full bg-[#E9D7BE]/50" />
            ) : isAuthenticated ? (
              <div
                onClick={handleAccountClick}
                className="group flex cursor-pointer items-center gap-1.5 rounded-xl p-1 px-1.5 sm:px-2 transition-all duration-200 hover:bg-[#FAF4EC]/80 active:scale-98 select-none"
                title={
                  user?.role === "CREATOR"
                    ? "Buka Dashboard Creator"
                    : user?.role === "ADMIN"
                    ? "Buka Dashboard Admin"
                    : "Buka Profil Saya"
                }
              >
                <div className="relative flex h-7.5 w-7.5 sm:h-8 sm:w-8 items-center justify-center overflow-hidden rounded-full border border-[#78865C]/35 bg-[#E9D7BE]/30 shadow-xs transition-transform duration-200 group-hover:scale-105">
                  <span className="text-xs font-bold text-[#3E5237] uppercase">
                    {user?.email?.charAt(0) || "U"}
                  </span>
                </div>

                <div className="hidden sm:flex flex-col text-left">
                  <span className="max-w-22 truncate text-xs leading-tight font-bold text-[#3E5237]">
                    {user?.role === "CREATOR"
                      ? "Nadira"
                      : user?.email?.split("@")[0] || "User"}
                  </span>
                  <span className="-mt-0.5 text-[8px] font-bold tracking-wider text-[#78865C] uppercase">
                    {user?.role || "BUYER"}
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-[#78865C] transition-transform group-hover:translate-y-0.5" />
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant="skeuo-forest-secondary"
                  className="h-8 px-3 text-xs font-bold"
                >
                  Masuk
                </Button>
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* MOBILE SEARCH BAR OVERLAY (<768px) */}
      {isMobileSearchOpen && (
        <div className="md:hidden w-full px-4 pb-3 pt-1 border-t border-[#D8C4A7]/30 animate-fade-down">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <SearchInput
              variant="skeuo-paper"
              placeholder="Cari bunga, rangkaian, atau momen spesial..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onClear={handleClearSearch}
              className="w-full text-xs"
            />
          </form>
        </div>
      )}
    </header>
  );
}
