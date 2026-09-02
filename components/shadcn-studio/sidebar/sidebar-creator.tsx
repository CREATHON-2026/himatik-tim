"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import {
  LayoutGrid,
  Gift,
  ClipboardList,
  Wallet,
  Store,
  MessageSquare,
  Bot,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowUpRight,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface NavItemConfig {
  title: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
  disabled?: boolean;
  badgeText?: string;
  badgeCount?: number;
}

interface NavSectionConfig {
  label: string;
  items: NavItemConfig[];
}

interface SidebarCreatorProps {
  storeName?: string;
  userEmail?: string;
  className?: string;
}

export function SidebarCreator({
  storeName = "Studio Flora",
  className,
}: SidebarCreatorProps) {
  const pathname = usePathname();
  const { state, toggleSidebar, isMobile } = useSidebar();
  const systemReduceMotion = useReducedMotion();
  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const shouldReduceMotion = isMounted ? !!systemReduceMotion : false;

  const isCollapsed = state === "collapsed" && !isMobile;

  // Centralized Navigation Sections aligned with ringkasan-page.png
  const navigationSections = React.useMemo<NavSectionConfig[]>(
    () => [
      {
        label: "UTAMA",
        items: [
          { title: "Ringkasan", href: "/dashboard/creator", icon: LayoutGrid, exact: true },
          { title: "Produk Saya", href: "/dashboard/creator/products", icon: Gift },
          {
            title: "Pesanan Masuk",
            href: "/dashboard/creator/orders",
            icon: ClipboardList,
          },
        ],
      },
      {
        label: "KEUANGAN",
        items: [
          { title: "Saldo & Penarikan", href: "/dashboard/creator/payout", icon: Wallet },
        ],
      },
      {
        label: "TOKO & PENGATURAN",
        items: [
          { title: "Profil Toko & Etalase", href: "/dashboard/creator/profile", icon: Store },
          {
            title: "Pesan / Chat",
            href: "/dashboard/messages",
            icon: MessageSquare,
            badgeText: "BETA",
          },
        ],
      },
      {
        label: "BANTUAN",
        items: [
          {
            title: "Tanya Gifteria",
            href: "/dashboard/creator/ask-gifteria",
            icon: Bot,
          },
        ],
      },
    ],
    []
  );

  const textRevealVariants: Variants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -6 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.2,
        delay: shouldReduceMotion ? 0 : 0.05,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -6,
      transition: { duration: 0.08, ease: "easeIn" },
    },
  };

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "border-none bg-transparent select-none transition-all duration-300 ml-3 my-3 overflow-visible",
        className
      )}
    >
      {/* SIDEBAR CONTAINER */}
      <motion.div
        animate={{ width: isCollapsed ? 68 : 252 }}
        transition={
          shouldReduceMotion
            ? { duration: 0.1 }
            : { type: "spring", stiffness: 350, damping: 30 }
        }
        className={cn(
          "flex flex-col justify-between h-[calc(100vh-1.5rem)] sticky top-3 rounded-2xl overflow-visible",
          "bg-white border border-[#E7E5E4] shadow-xs text-[#111827]",
          isCollapsed ? "p-2 items-center" : "p-3.5"
        )}
      >
        {/* FLOATING COLLAPSE/EXPAND BUTTON */}
        <motion.button
          type="button"
          onClick={toggleSidebar}
          whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
          className={cn(
            "absolute top-5 z-50 size-7 rounded-full cursor-pointer",
            isCollapsed ? "left-[calc(100%+6px)]" : "-right-3.5",
            "bg-white text-[#78716C] hover:text-[#6355D9] hover:border-[#6355D9]",
            "border border-[#E7E5E4] shadow-xs",
            "flex items-center justify-center transition-colors"
          )}
          title={isCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isCollapsed ? "open" : "close"}
              initial={{ opacity: 0, rotate: isCollapsed ? -45 : 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: isCollapsed ? 45 : -45 }}
              transition={{ duration: 0.15 }}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="size-3.5" />
              ) : (
                <PanelLeftClose className="size-3.5" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* TOP SECTION: BRAND HEADER & TOKO AKTIF PILL */}
        <SidebarHeader className="p-0 space-y-3 w-full">
          {/* Brand Header: Gifteria Seller Studio */}
          <div
            className={cn(
              "flex items-center gap-2.5 pt-1",
              isCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <div className="size-10 rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE]/70 flex items-center justify-center shrink-0 shadow-2xs">
              <Gift className="size-5 text-[#6355D9]" />
            </div>

            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  variants={textRevealVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="min-w-0 flex flex-col overflow-hidden"
                >
                  <span className="font-serif text-lg font-normal tracking-tight text-[#111827] leading-tight truncate">
                    Gifteria
                  </span>
                  <span className="text-[10px] font-semibold text-[#6355D9] leading-none mt-0.5">
                    Seller Studio
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Store Status Box (Toko Aktif - Online) */}
          <div
            className={cn(
              "bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-2.5 flex items-center gap-2.5 shadow-2xs",
              isCollapsed ? "justify-center p-2" : "justify-start"
            )}
          >
            <div className="size-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <Store className="size-3.5 text-emerald-600" />
            </div>

            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  variants={textRevealVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="min-w-0 flex-1 overflow-hidden"
                >
                  <span className="font-semibold text-xs text-[#111827] block leading-tight">
                    Toko Aktif
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-[10px] text-emerald-600 font-medium leading-none">
                      Online
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SidebarHeader>

        {/* MIDDLE SECTION: NAVIGATION MENU GROUPS */}
        <SidebarContent className="p-0 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden space-y-3.5 w-full my-3 flex-1">
          {navigationSections.map((section) => (
            <SidebarGroup key={section.label} className="p-0">
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    variants={textRevealVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <SidebarGroupLabel className="text-[10px] font-semibold tracking-wider text-[#A8A29E] uppercase px-2 h-4 text-left">
                      {section.label}
                    </SidebarGroupLabel>
                  </motion.div>
                )}
              </AnimatePresence>
              <SidebarGroupContent className="mt-1">
                <SidebarMenu className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.exact
                      ? pathname === item.href
                      : item.href !== "#" && pathname.startsWith(item.href);

                    return (
                      <SidebarMenuItem key={item.title}>
                        {item.disabled ? (
                          <div
                            className={cn(
                              "w-full flex items-center gap-2.5 rounded-xl text-xs font-medium opacity-60 cursor-not-allowed",
                              isCollapsed ? "justify-center p-2.5" : "px-3 py-2.5"
                            )}
                          >
                            <Icon className="size-4 shrink-0 text-[#78716C]" />
                            {!isCollapsed && (
                              <span className="truncate flex-1 text-left text-[#78716C]">{item.title}</span>
                            )}
                            {!isCollapsed && item.badgeText && (
                              <span className="text-[9px] font-bold tracking-wider text-[#6355D9] bg-[#EDE9FE] px-1.5 py-0.5 rounded-md uppercase">
                                {item.badgeText}
                              </span>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            prefetch={false}
                            className={cn(
                              "w-full flex items-center gap-2.5 rounded-xl text-xs font-medium transition-all duration-150 relative cursor-pointer outline-none select-none",
                              isCollapsed ? "justify-center p-2.5" : "px-3 py-2.5",
                              isActive
                                ? "bg-[#F5F3FF] text-[#6355D9] font-semibold border border-[#DDD6FE]/80 shadow-2xs"
                                : "text-[#44403C] hover:bg-[#F5F5F4] hover:text-[#111827]"
                            )}
                          >
                            <Icon
                              className={cn(
                                "size-4 shrink-0 transition-colors",
                                isActive ? "text-[#6355D9]" : "text-[#78716C]"
                              )}
                            />

                            <AnimatePresence>
                              {!isCollapsed && (
                                <motion.span
                                  variants={textRevealVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  className="truncate flex-1 text-left"
                                >
                                  {item.title}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </Link>
                        )}
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* BOTTOM SECTION: FOOTER & USER PROFILE PILL */}
        <SidebarFooter className="p-0 pt-2 space-y-2 w-full">
          {/* Direct Link to Public Catalog */}
          <Link
            href="/katalog"
            className={cn(
              "flex items-center gap-2 rounded-xl text-xs font-medium transition-colors border border-[#E7E5E4] bg-white",
              "text-[#44403C] hover:text-[#6355D9] hover:bg-[#F5F3FF] hover:border-[#DDD6FE]",
              isCollapsed ? "justify-center p-2" : "px-3 py-2 justify-between"
            )}
            title="Lihat Marketplace"
          >
            <div className="flex items-center gap-2 truncate">
              <Store className="size-3.5 text-[#78716C]" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    variants={textRevealVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="truncate text-[11px]"
                  >
                    Lihat Marketplace
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {!isCollapsed && <ArrowUpRight className="size-3 text-[#A8A29E]" />}
          </Link>

          {/* User Profile Soft-Pill (Studio Flora) */}
          <div
            className={cn(
              "bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-2 flex items-center justify-between shadow-2xs cursor-pointer hover:bg-[#F5F5F4] transition",
              isCollapsed ? "justify-center p-1.5" : "px-2.5 py-2"
            )}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="size-7 rounded-full bg-gradient-to-br from-amber-200 to-rose-200 border border-white flex items-center justify-center shrink-0 shadow-2xs overflow-hidden relative">
                <Image
                  src="/aset/bglogin.png"
                  alt={storeName}
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>

              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    variants={textRevealVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="min-w-0 flex-1 overflow-hidden text-left"
                  >
                    <span className="font-semibold text-xs text-[#111827] truncate block leading-tight">
                      {storeName}
                    </span>
                    <span className="text-[10px] text-[#78716C] leading-none block mt-0.5">
                      Lihat Profil
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!isCollapsed && <ChevronDown className="size-3.5 text-[#A8A29E] shrink-0 ml-1" />}
          </div>

          {/* Copyright Watermark */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                variants={textRevealVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center pt-1"
              >
                <span className="text-[10px] text-[#A8A29E] font-normal">
                  © 2026 Gifteria. All rights reserved.
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </SidebarFooter>
      </motion.div>
    </Sidebar>
  );
}
