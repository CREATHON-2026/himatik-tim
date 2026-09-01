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
  Sparkles,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowUpRight,
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
  SidebarMenuButton,
  SidebarMenuBadge,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useCreatorProfile } from "@/features/creator-profile/hooks/useCreatorProfile";
import { useCreatorOrders } from "@/features/orders/hooks/useCreatorOrders";

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
  userEmail?: string;
  onLogout?: () => void;
  isLoggingOut?: boolean;
  className?: string;
}

export function SidebarCreator({
  userEmail = "",
  className,
}: SidebarCreatorProps) {
  const pathname = usePathname();
  const { profile } = useCreatorProfile();
  const { orders } = useCreatorOrders();
  const { state, toggleSidebar, isMobile } = useSidebar();
  const systemReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  const shouldReduceMotion = isMounted ? !!systemReduceMotion : false;

  const isCollapsed = state === "collapsed" && !isMobile;

  // Calculate pending / actionable orders count
  const pendingOrdersCount = React.useMemo(() => {
    if (!orders || orders.length === 0) return 0;
    return orders.filter(
      (o) =>
        o.status === "PAID" ||
        o.status === "PROCESSING" ||
        o.status === "PENDING"
    ).length;
  }, [orders]);

  const shopName =
    profile?.shopName ||
    (userEmail ? userEmail.split("@")[0] : "Creathon Studio");

  // Centralized Declarative Navigation Structure
  const navigationSections = React.useMemo<NavSectionConfig[]>(
    () => [
      {
        label: "Utama",
        items: [
          { title: "Ringkasan", href: "/dashboard/creator", icon: LayoutGrid, exact: true },
          { title: "Produk Saya", href: "/dashboard/creator/products", icon: Gift },
          {
            title: "Pesanan Masuk",
            href: "/dashboard/creator/orders",
            icon: ClipboardList,
            badgeCount: pendingOrdersCount,
          },
        ],
      },
      {
        label: "Keuangan",
        items: [
          { title: "Saldo & Penarikan", href: "/dashboard/creator/payout", icon: Wallet },
        ],
      },
      {
        label: "Toko & Pengaturan",
        items: [
          { title: "Profil Toko & Etalase", href: "/dashboard/creator/profile", icon: Store },
          {
            title: "Pesan / Chat Pembeli",
            href: "#",
            icon: MessageSquare,
            disabled: true,
            badgeText: "Soon",
          },
        ],
      },
    ],
    [pendingOrdersCount]
  );

  // Motion animation variants for text fade/reveal
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
      {/* SIDEBAR CONTAINER WITH STAGED SPRING ANIMATION (w-16 = 64px, w-60 = 240px) */}
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
        {/* FLOATING EXPAND / COLLAPSE BUTTON */}
        <motion.button
          type="button"
          onClick={toggleSidebar}
          whileHover={
            shouldReduceMotion
              ? {}
              : { scale: 1.1 }
          }
          whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={cn(
            "absolute top-5 z-50 size-7.5 rounded-full cursor-pointer",
            isCollapsed ? "left-[calc(100%+6px)]" : "-right-3.5",
            "bg-white text-[#78716C] hover:text-[#6355D9] hover:border-[#6355D9]",
            "border border-[#E7E5E4] shadow-md",
            "flex items-center justify-center transition-colors"
          )}
          title={isCollapsed ? "Buka Sidebar (Ctrl+B)" : "Tutup Sidebar (Ctrl+B)"}
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

        {/* TOP SECTION: BRAND HEADER & PROFILE CAPSULE */}
        <SidebarHeader className="p-0 space-y-3 w-full">
          {/* Brand Header */}
          <div
            className={cn(
              "flex items-center gap-2.5 pt-1",
              isCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <div className="size-9 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="size-4.5 text-[#6355D9]" />
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
                  <span className="font-serif text-base font-extrabold tracking-tight text-[#111827] leading-tight truncate">
                    CREATHON
                  </span>
                  <span className="text-[9px] font-bold tracking-[0.2em] text-[#6355D9] uppercase leading-none mt-0.5">
                    Creator Studio
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Creator Profile Soft-Box */}
          <div
            className={cn(
              "bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl p-2 flex items-center gap-2.5 shadow-xs",
              isCollapsed ? "justify-center p-1.5" : "justify-start"
            )}
          >
            <div className="size-8 rounded-lg bg-white border border-[#E7E5E4] flex items-center justify-center shrink-0 shadow-xs overflow-hidden relative">
              {profile?.photoUrl ? (
                <Image
                  src={profile.photoUrl}
                  alt={shopName}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              ) : (
                <Store className="size-4 text-[#6355D9]" />
              )}
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
                  <span className="font-semibold text-xs text-[#111827] truncate block leading-tight">
                    {shopName}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-[10px] text-[#78716C] font-medium leading-none">
                      Toko Aktif
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Separator className="h-px bg-[#E7E5E4]" />
        </SidebarHeader>

        {/* MIDDLE SECTION: DATA-DRIVEN SHADCN SIDEBAR MENU GROUPS */}
        <SidebarContent className="p-0 overflow-y-auto no-scrollbar space-y-3 w-full my-2">
          {navigationSections.map((section, sectionIdx) => (
            <React.Fragment key={section.label}>
              {sectionIdx > 0 && (
                <Separator className="h-px w-full bg-[#E7E5E4] my-2" />
              )}
              <SidebarGroup className="p-0">
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      variants={textRevealVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <SidebarGroupLabel className="text-[10px] font-bold tracking-wider text-[#A8A29E] uppercase px-2 h-4 text-left">
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
                          <SidebarMenuButton
                            render={item.disabled ? undefined : <Link href={item.href} />}
                            disabled={item.disabled}
                            isActive={isActive}
                            tooltip={isCollapsed ? item.title : undefined}
                            className={cn(
                              "w-full flex items-center gap-2.5 rounded-xl text-xs font-medium transition-all duration-150 relative cursor-pointer",
                              isCollapsed ? "justify-center p-2.5" : "px-3 py-2.5",
                              isActive
                                ? "bg-[#F5F3FF] text-[#6355D9] font-semibold border border-[#DDD6FE] shadow-2xs"
                                : "text-[#44403C] hover:bg-[#F5F5F4] hover:text-[#111827]",
                              item.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
                            )}
                          >
                            <Icon
                              className={cn(
                                "size-4.5 shrink-0 transition-colors",
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

                            {!isCollapsed && item.badgeCount !== undefined && item.badgeCount > 0 && (
                              <SidebarMenuBadge className="bg-[#6355D9] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {item.badgeCount}
                              </SidebarMenuBadge>
                            )}

                            {!isCollapsed && item.badgeText && (
                              <span className="text-[9px] font-semibold tracking-wider text-[#78716C] bg-[#F5F5F4] border border-[#E7E5E4] px-1.5 py-0.5 rounded-md uppercase">
                                {item.badgeText}
                              </span>
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </React.Fragment>
          ))}
        </SidebarContent>

        {/* BOTTOM SECTION: FOOTER & MARKETPLACE LINK */}
        <SidebarFooter className="p-0 pt-2 space-y-2 w-full">
          <Separator className="h-px bg-[#E7E5E4]" />

          {/* Direct Link to Public Catalog */}
          <Link
            href="/katalog"
            className={cn(
              "flex items-center gap-2 rounded-xl text-xs font-medium transition-colors border border-transparent",
              "text-[#44403C] hover:text-[#6355D9] hover:bg-[#F5F3FF] hover:border-[#DDD6FE]",
              isCollapsed ? "justify-center p-2" : "px-3 py-2 justify-between"
            )}
            title="Lihat Marketplace Publik"
          >
            <div className="flex items-center gap-2 truncate">
              <Store className="size-4 text-[#78716C]" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    variants={textRevealVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="truncate"
                  >
                    Lihat Marketplace
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {!isCollapsed && <ArrowUpRight className="size-3.5 text-[#A8A29E]" />}
          </Link>

          {/* Copyright & Watermark */}
          <AnimatePresence>
            {!isCollapsed ? (
              <motion.div
                variants={textRevealVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center pt-1"
              >
                <span className="text-[10px] text-[#A8A29E] font-medium tracking-wide">
                  © 2026 Creathon Creative
                </span>
              </motion.div>
            ) : (
              <div className="flex justify-center pt-1">
                <span className="size-2 rounded-full bg-[#DDD6FE]" />
              </div>
            )}
          </AnimatePresence>
        </SidebarFooter>
      </motion.div>
    </Sidebar>
  );
}
