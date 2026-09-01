"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  ShoppingBag,
  ClipboardList,
  Heart,
  User,
  Store,
  LogIn,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  // Hide bottom nav on auth screens, dashboard internal, admin internal, landing-page, and root homepage
  const hideRoutes = ["/login", "/register", "/dashboard", "/admin", "/landing-page"];
  const shouldHide =
    pathname === "/" || hideRoutes.some((route) => pathname?.startsWith(route));

  if (shouldHide) return null;

  const isMarketActive = pathname === "/market" || pathname === "/";
  const isOrdersActive =
    pathname === "/orders" ||
    pathname?.startsWith("/orders/") ||
    pathname === "/dashboard/orders";
  const isWishlistActive =
    pathname === "/wishlist" || pathname?.startsWith("/wishlist");
  const isProfileActive =
    pathname === "/profile" ||
    pathname?.startsWith("/profile") ||
    pathname === "/dashboard" ||
    pathname === "/login";

  const handleAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role === "CREATOR") {
      router.push("/dashboard");
    } else if (user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/profile");
    }
  };

  const getOrdersHref = () => {
    if (user?.role === "CREATOR") return "/dashboard/orders";
    if (user?.role === "ADMIN") return "/admin/dashboard";
    return "/orders";
  };

  const getOrdersLabel = () => {
    if (user?.role === "CREATOR") return "Order Masuk";
    if (user?.role === "ADMIN") return "Transaksi";
    return "Pesanan";
  };

  return (
    <nav
      aria-label="Navigasi Bawah Layar"
      className="fixed bottom-3 inset-x-0 z-40 mx-auto max-w-md px-4 lg:hidden pointer-events-none select-none"
    >
      <div className="pointer-events-auto flex items-center justify-around rounded-full border border-[#D8C4A7] bg-[#FAF4EC]/90 p-1.5 shadow-[0_8px_32px_rgba(62,82,55,0.18)] backdrop-blur-xl ring-1 ring-white/60">

        {/* 1. TAB MARKET */}
        <Link
          href="/market"
          className={cn(
            "relative flex flex-1 flex-col items-center justify-center py-1.5 transition-all duration-300 rounded-full",
            isMarketActive
              ? "text-[#3E5237]"
              : "text-[#78865C]/80 hover:text-[#3E5237]"
          )}
        >
          {isMarketActive && (
            <span className="absolute inset-0 rounded-full bg-linear-to-b from-[#FAF4EC] to-[#E9D7BE] border border-[#D8C4A7]/80 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_2px_6px_rgba(62,82,55,0.12)] -z-10" />
          )}
          <ShoppingBag
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              isMarketActive && "scale-110 text-[#3E5237]"
            )}
          />
          <span
            className={cn(
              "mt-0.5 text-[10px] font-bold tracking-tight",
              isMarketActive ? "text-[#3E5237]" : "text-[#78865C]"
            )}
          >
            Market
          </span>
        </Link>

        {/* 2. TAB PESANAN / ORDER MASUK */}
        <Link
          href={getOrdersHref()}
          className={cn(
            "relative flex flex-1 flex-col items-center justify-center py-1.5 transition-all duration-300 rounded-full",
            isOrdersActive
              ? "text-[#3E5237]"
              : "text-[#78865C]/80 hover:text-[#3E5237]"
          )}
        >
          {isOrdersActive && (
            <span className="absolute inset-0 rounded-full bg-linear-to-b from-[#FAF4EC] to-[#E9D7BE] border border-[#D8C4A7]/80 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_2px_6px_rgba(62,82,55,0.12)] -z-10" />
          )}
          <ClipboardList
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              isOrdersActive && "scale-110 text-[#3E5237]"
            )}
          />
          <span
            className={cn(
              "mt-0.5 text-[10px] font-bold tracking-tight truncate max-w-16",
              isOrdersActive ? "text-[#3E5237]" : "text-[#78865C]"
            )}
          >
            {getOrdersLabel()}
          </span>
        </Link>

        {/* 3. TAB FAVORIT */}
        <button
          onClick={() => {}}
          className={cn(
            "relative flex flex-1 flex-col items-center justify-center py-1.5 transition-all duration-300 rounded-full opacity-60 cursor-not-allowed",
            isWishlistActive
              ? "text-[#3E5237]"
              : "text-[#78865C]/80"
          )}
          title="Favorit (Segera Hadir)"
        >
          <Heart className="h-5 w-5" />
          <span className="mt-0.5 text-[10px] font-bold tracking-tight text-[#78865C]">
            Favorit
          </span>
        </button>

        {/* 4. TAB AKUN / TOKO / MASUK */}
        <button
          onClick={handleAccountClick}
          className={cn(
            "relative flex flex-1 flex-col items-center justify-center py-1.5 transition-all duration-300 rounded-full cursor-pointer",
            isProfileActive
              ? "text-[#3E5237]"
              : "text-[#78865C]/80 hover:text-[#3E5237]"
          )}
        >
          {isProfileActive && (
            <span className="absolute inset-0 rounded-full bg-linear-to-b from-[#FAF4EC] to-[#E9D7BE] border border-[#D8C4A7]/80 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_2px_6px_rgba(62,82,55,0.12)] -z-10" />
          )}
          {isLoading ? (
            <div className="h-5 w-5 animate-pulse rounded-full bg-[#78865C]/20" />
          ) : !isAuthenticated ? (
            <LogIn
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                isProfileActive && "scale-110 text-[#3E5237]"
              )}
            />
          ) : user?.role === "CREATOR" ? (
            <Store
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                isProfileActive && "scale-110 text-[#3E5237]"
              )}
            />
          ) : user?.role === "ADMIN" ? (
            <ShieldCheck
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                isProfileActive && "scale-110 text-[#3E5237]"
              )}
            />
          ) : (
            <User
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                isProfileActive && "scale-110 text-[#3E5237]"
              )}
            />
          )}
          <span
            className={cn(
              "mt-0.5 text-[10px] font-bold tracking-tight truncate max-w-16",
              isProfileActive ? "text-[#3E5237]" : "text-[#78865C]"
            )}
          >
            {!isAuthenticated
              ? "Masuk"
              : user?.role === "CREATOR"
              ? "Toko Saya"
              : user?.role === "ADMIN"
              ? "Admin"
              : "Akun"}
          </span>
        </button>

      </div>
    </nav>
  );
}
