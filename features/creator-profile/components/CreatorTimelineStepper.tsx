"use client";

import React from "react";
import {
  UserCheck,
  Store,
  ShieldCheck,
  PackagePlus,
  ShoppingBag,
  Wallet,
  Sparkles,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineEventItem {
  type:
    | "REGISTERED"
    | "STORE_CREATED"
    | "VERIFIED"
    | "PRODUCT_CREATED"
    | "PRODUCT_UPDATED"
    | "ORDER_RECEIVED"
    | "ORDER_COMPLETED"
    | "PAYOUT_REQUESTED";
  timestamp: string | Date;
  detail: string;
}

interface CreatorTimelineStepperProps {
  shopName: string;
  verificationStatus: string;
  timeline: TimelineEventItem[];
  className?: string;
}

interface EventVisualConfig {
  label: string;
  icon: LucideIcon;
  badgeBg: string;
  iconColor: string;
  accentBorder: string;
}

const eventConfigs: Record<TimelineEventItem["type"], EventVisualConfig> = {
  REGISTERED: {
    label: "Akun Terdaftar",
    icon: UserCheck,
    badgeBg: "bg-rose-100 dark:bg-rose-950/60",
    iconColor: "text-rose-600 dark:text-rose-400",
    accentBorder: "border-rose-200 dark:border-rose-900",
  },
  STORE_CREATED: {
    label: "Toko Dipublikasikan",
    icon: Store,
    badgeBg: "bg-amber-100 dark:bg-amber-950/60",
    iconColor: "text-amber-700 dark:text-amber-400",
    accentBorder: "border-amber-200 dark:border-amber-900",
  },
  VERIFIED: {
    label: "Kreator Terverifikasi",
    icon: ShieldCheck,
    badgeBg: "bg-emerald-100 dark:bg-emerald-950/60",
    iconColor: "text-emerald-700 dark:text-emerald-400",
    accentBorder: "border-emerald-200 dark:border-emerald-900",
  },
  PRODUCT_CREATED: {
    label: "Produk Diunggah",
    icon: PackagePlus,
    badgeBg: "bg-sky-100 dark:bg-sky-950/60",
    iconColor: "text-sky-700 dark:text-sky-400",
    accentBorder: "border-sky-200 dark:border-sky-900",
  },
  PRODUCT_UPDATED: {
    label: "Katalog Diperbarui",
    icon: PackagePlus,
    badgeBg: "bg-indigo-100 dark:bg-indigo-950/60",
    iconColor: "text-indigo-700 dark:text-indigo-400",
    accentBorder: "border-indigo-200 dark:border-indigo-900",
  },
  ORDER_RECEIVED: {
    label: "Pesanan Diterima",
    icon: ShoppingBag,
    badgeBg: "bg-violet-100 dark:bg-violet-950/60",
    iconColor: "text-violet-700 dark:text-violet-400",
    accentBorder: "border-violet-200 dark:border-violet-900",
  },
  ORDER_COMPLETED: {
    label: "Pesanan Selesai",
    icon: ShoppingBag,
    badgeBg: "bg-teal-100 dark:bg-teal-950/60",
    iconColor: "text-teal-700 dark:text-teal-400",
    accentBorder: "border-teal-200 dark:border-teal-900",
  },
  PAYOUT_REQUESTED: {
    label: "Penarikan Dana",
    icon: Wallet,
    badgeBg: "bg-emerald-100 dark:bg-emerald-950/60",
    iconColor: "text-emerald-700 dark:text-emerald-400",
    accentBorder: "border-emerald-200 dark:border-emerald-900",
  },
};

/**
 * CreatorTimelineStepper Component
 * UI/UX Pro Max Component:
 * - Visualizes Creator Validation Timeline (CRX Stepper)
 * - Modern Art Nouveau Glassmorphism styling with rose/gold flourishes
 * - Fully accessible keyboard navigation & ARIA landmarks
 */
export function CreatorTimelineStepper({
  shopName,
  verificationStatus,
  timeline,
  className,
}: CreatorTimelineStepperProps) {
  return (
    <section
      aria-label={`Perjalanan Kreator ${shopName}`}
      className={cn(
        "relative rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-stone-50/90 via-rose-50/30 to-amber-50/40 dark:from-stone-900/90 dark:via-stone-900/80 dark:to-stone-950/90 border border-rose-900/10 dark:border-rose-500/20 backdrop-blur-md shadow-xl transition-all duration-300",
        className
      )}
    >
      {/* Art Nouveau Header Accent */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-rose-900/10 dark:border-rose-500/20">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" aria-hidden="true" />
            <span>CRX Milestone Journey</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Perjalanan Kreator — {shopName}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Jejak aktivitas faktual dan pencapaian bisnis Anda di Gifteria
          </p>
        </div>

        {verificationStatus === "VERIFIED" && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span>Kreator Resmi</span>
          </div>
        )}
      </div>

      {/* Vertical Stepper Lines */}
      {timeline.length === 0 ? (
        <div className="py-12 text-center text-stone-500 dark:text-stone-400 text-sm">
          Belum ada riwayat aktivitas terdeteksi.
        </div>
      ) : (
        <ol className="relative ml-4 sm:ml-6 border-l-2 border-dashed border-rose-300 dark:border-rose-800 space-y-6 sm:space-y-8">
          {timeline.map((item, index) => {
            const config = eventConfigs[item.type] || eventConfigs.REGISTERED;
            const Icon = config.icon;
            const eventDate = new Date(item.timestamp);
            const formattedDate = eventDate.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <li key={index} className="relative pl-6 sm:pl-8 group">
                {/* Stepper Node Icon */}
                <span
                  className={cn(
                    "absolute -left-[17px] top-0 flex items-center justify-center w-8 h-8 rounded-full border shadow-sm transition-transform duration-200 group-hover:scale-110",
                    config.badgeBg,
                    config.accentBorder
                  )}
                  aria-hidden="true"
                >
                  <Icon className={cn("w-4 h-4", config.iconColor)} />
                </span>

                {/* Event Card */}
                <div className="p-4 sm:p-5 rounded-xl bg-white/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-md transition-all duration-200 group-hover:border-rose-300 dark:group-hover:border-rose-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                      {config.label}
                    </span>
                    <time
                      dateTime={eventDate.toISOString()}
                      className="text-xs text-stone-500 dark:text-stone-400 font-mono"
                    >
                      {formattedDate}
                    </time>
                  </div>
                  <p className="mt-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                    {item.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {/* Footer Stepper Encouragement */}
      <div className="mt-8 pt-4 border-t border-rose-900/10 dark:border-rose-500/20 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
        <span className="flex items-center gap-1 font-medium text-amber-700 dark:text-amber-400">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Setiap pesanan & payout meningkatkan skor trust toko Anda di pasar.</span>
        </span>
        <ChevronRight className="w-4 h-4 shrink-0 text-stone-400" aria-hidden="true" />
      </div>
    </section>
  );
}
