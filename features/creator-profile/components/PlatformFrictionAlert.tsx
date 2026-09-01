"use client";

import React from "react";
import { AlertTriangle, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface StalledOrderInfo {
  orderId: string;
  shopName: string;
  status: string;
  escrowStatus: string;
  totalAmount: string;
  createdAt: string | Date;
}

interface PlatformFrictionAlertProps {
  stalledCount: number;
  orders: StalledOrderInfo[];
  className?: string;
}

/**
 * PlatformFrictionAlert Component
 * UI/UX Pro Max Proactive Warning Banner Component:
 * - Alerts creator & admin of stalled or pending payment orders
 * - Proactively reduces order abandonment & platform leakage
 * - WCAG 2.2 AA compliant with role="alert" & focus ring controls
 */
export function PlatformFrictionAlert({
  stalledCount,
  orders,
  className,
}: PlatformFrictionAlertProps) {
  if (stalledCount === 0) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "relative overflow-hidden rounded-2xl p-5 bg-linear-to-r from-amber-500/10 via-rose-500/10 to-amber-500/5 border border-amber-500/30 dark:border-amber-500/40 shadow-lg backdrop-blur-md transition-all duration-300",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
            <AlertTriangle className="w-5 h-5 animate-bounce" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-200">
                {stalledCount} Pesanan Membutuhkan Perhatian
              </h4>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                Friction Alert
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              Terdapat pesanan yang belum diselesaikan pembayarannya atau dibatalkan. Periksa rincian untuk mencegah kendala transaksi.
            </p>
          </div>
        </div>

        <Link
          href="/admin/orders?status=PENDING_PAYMENT"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-linear-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 dark:from-amber-500 dark:to-rose-500 rounded-xl shadow-md hover:shadow-lg focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 transition-all duration-200 shrink-0 min-h-10 min-w-12"
        >
          <span>Tinjau Pesanan</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Stalled Orders Quick List Preview */}
      {orders.length > 0 && (
        <div className="mt-4 pt-3 border-t border-amber-500/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {orders.slice(0, 3).map((item) => (
            <div
              key={item.orderId}
              className="flex items-center justify-between p-2.5 rounded-lg bg-white/60 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800 text-xs"
            >
              <div className="flex items-center gap-2 truncate">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" aria-hidden="true" />
                <span className="font-mono text-stone-800 dark:text-stone-200 truncate">
                  #{item.orderId.slice(0, 8)}
                </span>
              </div>
              <span className="font-semibold text-amber-800 dark:text-amber-300 shrink-0 ml-2">
                Rp {Number(item.totalAmount).toLocaleString("id-ID")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
