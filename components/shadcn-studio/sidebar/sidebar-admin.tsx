"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  ClipboardList,
  Package,
  Store,
  Users,
  Coins,
  Tag,
  PenTool,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarAdminProps {
  userEmail?: string;
  onLogout?: () => void;
  isLoggingOut?: boolean;
  className?: string;
}

// Delicate gold leaf/branch ornament for active button
const GoldLeafOrnament = () => (
  <svg
    className="pointer-events-none absolute top-1/2 right-1.5 size-7 -translate-y-1/2 opacity-90 select-none"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 22C10 20 18 14 22 6"
      stroke="#E9D7BE"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M22 6C22.5 8.5 20.5 10.5 18 10C19.5 8.5 21 7 22 6Z"
      fill="#E9D7BE"
      opacity="0.85"
    />
    <path
      d="M17 11C18 13 16.5 15 14.5 14.5C15.5 13.5 16.5 12 17 11Z"
      fill="#E9D7BE"
      opacity="0.85"
    />
    <path
      d="M12 15C13 16.5 12 18.5 10.5 18C11 17 11.5 16 12 15Z"
      fill="#E9D7BE"
      opacity="0.85"
    />
    <path
      d="M20 7.5C21 6 23 5.5 23.5 6C23 7 21 8.5 20 7.5Z"
      fill="#E9D7BE"
      opacity="0.85"
    />
  </svg>
);

export function SidebarAdmin({
  userEmail = "",
  onLogout,
  isLoggingOut = false,
  className,
}: SidebarAdminProps) {
  const pathname = usePathname();

  // All 10 menu items from the mockup
  const menuItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
      disabled: false,
    },
    {
      label: "Pesanan",
      href: "/admin/orders",
      icon: ClipboardList,
      disabled: false,
    },
    { label: "Produk", href: "/admin/products", icon: Package, disabled: true },
    {
      label: "Kreator (Toko)",
      href: "/admin/creators",
      icon: Store,
      disabled: true,
    },
    { label: "Pelanggan", href: "/admin/users", icon: Users, disabled: false }, // Pelanggan maps to User Management (active!)
    { label: "Finance", href: "/admin/finance", icon: Coins, disabled: false },
    { label: "Promosi", href: "/admin/promotions", icon: Tag, disabled: true },
    { label: "Konten", href: "/admin/content", icon: PenTool, disabled: true },
    {
      label: "Laporan",
      href: "/admin/reports",
      icon: BarChart3,
      disabled: true,
    },
    {
      label: "Pengaturan",
      href: "/admin/settings",
      icon: Settings,
      disabled: true,
    },
  ];

  return (
    <aside
      className={cn(
        "paper-texture sticky top-5 flex h-[calc(100vh-2.5rem)] w-64 shrink-0 scrollbar-thin flex-col justify-between overflow-y-auto rounded-[24px] border border-[#B89A57]/20 bg-[#FAF4EC] p-5 shadow-[0_4px_20px_rgba(184,154,87,0.04)] select-none",
        className
      )}
    >
      {/* Top Brand Logo & Menu Items */}
      <div className="space-y-6">
        {/* Brand Logo Section */}
        <div className="flex flex-col items-center border-b border-[#B89A57]/15 pb-4">
          <div className="relative h-14 w-32">
            <Image
              src="/logo/brand-logo-gold.webp"
              alt="Bicket Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="mt-1 font-mono text-[9px] tracking-widest text-[#B89A57]/80 uppercase">
            Every bucket, carries a story
          </div>
          {/* Floral graphic separator */}
          <div className="mt-1 text-[10px] text-[#B89A57]/60 select-none">
            ❀
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (item.disabled) {
              return (
                <div
                  key={item.label}
                  className="flex cursor-not-allowed items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-medium text-[#566B4D]/50 select-none"
                >
                  <Icon className="size-4.5 shrink-0 text-[#566B4D]/35" />
                  <span>{item.label}</span>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3.5 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out select-none",
                  isActive
                    ? "border border-[#B89A57]/45 bg-gradient-to-r from-[#6A7F60] to-[#495A40] pr-10 font-semibold text-white shadow-[0_4px_12px_rgba(73,90,64,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)]"
                    : "text-[#566B4D] hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-[0_2px_8px_rgba(184,154,87,0.06)] active:translate-y-0 active:shadow-none"
                )}
              >
                <Icon
                  className={cn(
                    "size-4.5 shrink-0",
                    isActive ? "text-white" : "text-[#566B4D]"
                  )}
                />
                <span>{item.label}</span>
                {isActive && <GoldLeafOrnament />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Makassar Florist Card & Minimal Profile info */}
      <div className="space-y-4 border-t border-[#B89A57]/15 pt-4">
        {/* Minimal Profile / Logout footer */}
        <div className="flex items-center justify-between px-1 pt-1 text-xs text-[#566B4D]">
          <span
            className="max-w-[130px] truncate font-mono text-[9px] opacity-75"
            title={userEmail}
          >
            {userEmail}
          </span>
          {onLogout && (
            <button
              onClick={onLogout}
              disabled={isLoggingOut}
              className="flex cursor-pointer items-center gap-1 font-bold text-[#E06D53] transition-colors hover:text-rose-700"
            >
              <LogOut className="size-3 shrink-0" />
              <span>{isLoggingOut ? "..." : "Logout"}</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
