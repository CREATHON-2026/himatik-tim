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
  ShoppingBag,
  LogOut,
  ChevronRight,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
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
  onLogout,
  isLoggingOut = false,
  className,
}: SidebarCreatorProps) {
  const pathname = usePathname();
  const { profile } = useCreatorProfile();
  const { orders } = useCreatorOrders();
  const { state, toggleSidebar, isMobile } = useSidebar();
  const shouldReduceMotion = useReducedMotion();

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
    (userEmail ? userEmail.split("@")[0] : "Maguru Gift Studio");

  // Centralized Declarative Navigation Structure
  const navigationSections = React.useMemo<NavSectionConfig[]>(
    () => [
      {
        label: "UTAMA",
        items: [
          { title: "Ringkasan", href: "/dashboard", icon: LayoutGrid, exact: true },
          { title: "Produk Saya", href: "/dashboard/products", icon: Gift },
          {
            title: "Pesanan Masuk",
            href: "/dashboard/orders",
            icon: ClipboardList,
            badgeCount: pendingOrdersCount,
          },
        ],
      },
      {
        label: "KEUANGAN",
        items: [
          { title: "Saldo & Penarikan", href: "/dashboard/payout", icon: Wallet },
        ],
      },
      {
        label: "TOKO",
        items: [
          { title: "Profil Toko & Etalase", href: "/dashboard/profile", icon: Store },
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
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.2,
        delay: shouldReduceMotion ? 0 : 0.1,
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
        "border-none bg-transparent select-none transition-all duration-300 ml-2 overflow-visible",
        className
      )}
    >
      {/* SIDEBAR CONTAINER WITH STAGED SPRING ANIMATION (w-16 = 64px, w-60 = 240px) */}
      <motion.div
        animate={{ width: isCollapsed ? 64 : 240 }}
        transition={
          shouldReduceMotion
            ? { duration: 0.1 }
            : { type: "spring", stiffness: 350, damping: 30 }
        }
        className={cn(
          "flex flex-col justify-between h-[calc(100vh-2.5rem)] sticky top-5 rounded-art-nouveau overflow-visible",
          "forest-skeuo text-[#FAF4EC]",
          isCollapsed ? "p-2 items-center" : "p-3.5"
        )}
      >
        {/* FLOATING EXPAND / COLLAPSE BUTTON (PRECISELY OUTSIDE THE SIDEBAR ON THE RIGHT EDGE) */}
        <motion.button
          type="button"
          onClick={toggleSidebar}
          whileHover={
            shouldReduceMotion
              ? {}
              : { scale: 1.15, rotate: isCollapsed ? 8 : -8 }
          }
          whileTap={shouldReduceMotion ? {} : { scale: 0.88, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={cn(
            "absolute top-5 z-50 size-8.5 rounded-full cursor-pointer",
            isCollapsed ? "left-[calc(100%+6px)]" : "-right-3.5",
            "bg-linear-to-br from-[#2D422A] via-[#1E2E1C] to-[#141F12] text-[#EAD8B7]",
            "border-2 border-[#C4A66B] shadow-[0_6px_16px_rgba(0,0,0,0.55),inset_0_1.5px_1.5px_rgba(255,255,255,0.35)]",
            "flex items-center justify-center hover:text-white"
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
                <PanelLeftOpen className="size-3.5 text-[#EAD8B7]" />
              ) : (
                <PanelLeftClose className="size-3.5 text-[#EAD8B7]" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* TOP SECTION: BRAND HEADER & PROFILE CAPSULE */}
        <SidebarHeader className="p-0 space-y-2.5 w-full">
          {/* Brand Header */}
          <div
            className={cn(
              "flex items-center gap-2.5 pt-0.5",
              isCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <div className="size-9 rounded-xl bg-[#283C25]/90 border border-[#C4A66B]/50 flex items-center justify-center shrink-0 shadow-sm p-1">
              <Image
                src="/logo/brand-logo-gold.webp"
                alt="Bicket Brand Logo"
                width={28}
                height={28}
                className="size-7 object-contain drop-shadow-sm"
                priority
              />
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
                  <span className="font-heading text-sm font-black tracking-[0.2em] text-[#EAD8B7] uppercase leading-tight truncate">
                    BICKET
                  </span>
                  <span className="text-[8px] font-bold tracking-[0.22em] text-[#C4A66B] uppercase leading-none mt-0.5 opacity-95">
                    CREATOR STUDIO
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Creator Profile Soft-Box */}
          <div
            className={cn(
              "bg-[#253922]/95 border border-[#3E583A]/80 rounded-xl p-1.5 flex items-center gap-2 shadow-[inset_0_1px_2px_rgba(255,255,255,0.06),0_2px_6px_rgba(0,0,0,0.25)]",
              isCollapsed ? "justify-center p-1" : "justify-start"
            )}
          >
            <div className="size-7.5 rounded-lg bg-[#FAF3E0] border border-[#C4A66B]/60 p-0.5 flex items-center justify-center shrink-0 shadow-xs overflow-hidden relative">
              {profile?.photoUrl ? (
                <Image
                  src={profile.photoUrl}
                  alt={shopName}
                  fill
                  sizes="30px"
                  className="object-cover"
                />
              ) : (
                <Sparkles className="size-3.5 text-[#8C6D23]" />
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
                  <span className="font-bold text-xs text-[#FAF4EC] truncate block leading-tight">
                    {shopName}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="text-[9px] text-[#A3C293] font-medium tracking-wide leading-none">
                      Toko Aktif
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DEEP GOLD SEPARATOR TECHNIQUE WITH FLORAL FILIGREE */}
          <div className="relative py-0.5 my-0.5 w-full">
            <Separator className="h-px bg-black/60 border-b border-[#C4A66B]/40 shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
            {!isCollapsed ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-[#243521] px-1.5 text-[9px] text-[#EAD8B7] select-none font-serif">
                  ❀
                </span>
              </div>
            ) : (
              <div className="h-px w-5 mx-auto bg-[#C4A66B]/40 my-0.5" />
            )}
          </div>
        </SidebarHeader>

        {/* MIDDLE SECTION: DATA-DRIVEN SHADCN SIDEBAR MENU GROUPS */}
        <SidebarContent className="p-0 overflow-y-auto no-scrollbar space-y-1 w-full">
          {navigationSections.map((section, sectionIdx) => (
            <React.Fragment key={section.label}>
              {sectionIdx > 0 && (
                <Separator className="h-px w-full bg-black/40 border-b border-[#C4A66B]/25 my-1" />
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
                      <SidebarGroupLabel className="text-[8.5px] font-bold tracking-[0.2em] text-[#C4A66B] uppercase px-1.5 h-4 text-left opacity-90">
                        {section.label}
                      </SidebarGroupLabel>
                    </motion.div>
                  )}
                </AnimatePresence>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = item.exact
                        ? pathname === item.href
                        : item.href !== "#" && pathname.startsWith(item.href);

                      return (
                        <SidebarMenuItem key={item.title}>
                          <motion.div
                            whileHover={
                              shouldReduceMotion || item.disabled
                                ? {}
                                : { x: isCollapsed ? 0 : 3 }
                            }
                            whileTap={
                              shouldReduceMotion || item.disabled
                                ? {}
                                : { scale: 0.98 }
                            }
                            transition={{ duration: 0.15 }}
                            className="relative w-full"
                          >
                            <SidebarMenuButton
                              {...(item.disabled
                                ? { disabled: true }
                                : { render: <Link href={item.href} /> })}
                              isActive={isActive}
                              tooltip={item.title}
                              className={cn(
                                "relative h-9 px-2.5 rounded-[8px] text-xs transition-all duration-150 z-10",
                                isCollapsed && "justify-center p-0 size-9 mx-auto",
                                item.disabled &&
                                  "text-[#FAF4EC]/45 font-medium cursor-not-allowed opacity-75",
                                !item.disabled && isActive && "text-[#FAF4EC] font-bold",
                                !item.disabled &&
                                  !isActive &&
                                  "text-[#FAF4EC]/85 hover:bg-[#253922]/70 hover:text-[#FAF4EC] font-medium"
                              )}
                            >
                              {!item.disabled && isActive && (
                                <motion.div
                                  layoutId="activeCreatorIndicator"
                                  className="absolute inset-0 sage-skeuo border-l-[3.5px] border-l-[#D4AF37] rounded-[8px] shadow-md -z-10"
                                  transition={
                                    shouldReduceMotion
                                      ? { duration: 0.1 }
                                      : { type: "spring", stiffness: 380, damping: 30 }
                                  }
                                />
                              )}
                              <Icon
                                className={cn(
                                  "size-4.5 shrink-0 z-10",
                                  item.disabled
                                    ? "text-[#A3C293]/40"
                                    : isActive
                                      ? "text-[#EAD8B7]"
                                      : "text-[#FAF4EC]/90"
                                )}
                              />
                              <AnimatePresence>
                                {!isCollapsed && (
                                  <motion.span
                                    variants={textRevealVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="ml-2 z-10 truncate"
                                  >
                                    {item.title}
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </SidebarMenuButton>

                            {/* Badge count (e.g. Orders) or Badge text (e.g. Soon) */}
                            <AnimatePresence>
                              {!isCollapsed &&
                                item.badgeCount !== undefined &&
                                item.badgeCount > 0 && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
                                  >
                                    <SidebarMenuBadge className="bg-[#A07828] text-[#FAF4EC] font-bold text-[9px] px-1.5 py-0.5 rounded-md shadow-2xs">
                                      {item.badgeCount}
                                    </SidebarMenuBadge>
                                  </motion.div>
                                )}
                              {!isCollapsed && item.badgeText && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none z-20"
                                >
                                  <SidebarMenuBadge className="bg-[#243521] text-[#A3C293] border border-[#3E583A] text-[8.5px] font-semibold px-1.5 py-0.2 rounded-md">
                                    {item.badgeText}
                                  </SidebarMenuBadge>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </React.Fragment>
          ))}
        </SidebarContent>

        {/* BOTTOM SECTION: MARKETPLACE SWITCH & LOGOUT */}
        <SidebarFooter className="p-0 pt-2 space-y-1.5 w-full">
          <Separator className="h-px w-full bg-black/40 border-b border-[#C4A66B]/25 mb-1" />

          {/* Switch to Marketplace */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="w-full"
          >
            <Link
              href="/market"
              className={cn(
                "w-full olive-skeuo text-[#FAF4EC] flex items-center rounded-xl text-xs font-semibold shadow-[0_2px_6px_rgba(0,0,0,0.25)] transition-all",
                isCollapsed
                  ? "justify-center p-2 size-9 mx-auto"
                  : "justify-between px-3 py-2"
              )}
              title="Lihat Marketplace"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="size-4 text-[#EAD8B7] shrink-0" />
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
              </span>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    variants={textRevealVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <ChevronRight className="size-3 text-[#C4A66B]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>

          {/* Logout Button */}
          {onLogout && (
            <motion.button
              type="button"
              onClick={onLogout}
              disabled={isLoggingOut}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "w-full text-left bg-transparent hover:bg-red-950/30 text-[#FAF4EC]/75 hover:text-red-300 flex items-center rounded-xl text-xs font-medium transition-all cursor-pointer",
                isCollapsed
                  ? "justify-center p-1.5 size-9 mx-auto"
                  : "justify-between px-3 py-1.5"
              )}
              title="Keluar (Logout)"
            >
              <span className="flex items-center gap-2">
                <LogOut className="size-3.5 shrink-0 text-red-400/80" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      variants={textRevealVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="truncate"
                    >
                      {isLoggingOut ? "Keluar..." : "Keluar (Logout)"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    variants={textRevealVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <ChevronRight className="size-3 opacity-40" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          {/* Micro Footer Brand */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                variants={textRevealVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center pt-0.5 select-none overflow-hidden"
              >
                <p className="text-[8px] text-[#A3C293]/50 font-sans tracking-wide">
                  © 2025 Bicket • Crafted with ❤️
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </SidebarFooter>
      </motion.div>
    </Sidebar>
  );
}
