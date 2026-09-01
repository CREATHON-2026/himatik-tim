"use client";

import React from "react";
import {
  Clock,
  CheckCircle2,
  Package,
  Truck,
  CheckCheck,
  XCircle,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELLED";

interface OrderStatusConfig {
  label: string;
  ariaLabel: string;
  icon: LucideIcon;
  className: string;
  iconColor: string;
}

const statusMap: Record<OrderStatus, OrderStatusConfig> = {
  PENDING_PAYMENT: {
    label: "Menunggu Pembayaran",
    ariaLabel: "Status Pesanan: Menunggu Pembayaran",
    icon: Clock,
    className:
      "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-700",
    iconColor: "text-amber-700 dark:text-amber-400",
  },
  PAID: {
    label: "Sudah Dibayar",
    ariaLabel: "Status Pesanan: Sudah Dibayar",
    icon: CheckCircle2,
    className:
      "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-700",
    iconColor: "text-emerald-700 dark:text-emerald-400",
  },
  PROCESSING: {
    label: "Sedang Diproses",
    ariaLabel: "Status Pesanan: Sedang Diproses",
    icon: Package,
    className:
      "bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/80 dark:text-sky-200 dark:border-sky-700",
    iconColor: "text-sky-700 dark:text-sky-400",
  },
  SHIPPED: {
    label: "Dikirim / Siap Pickup",
    ariaLabel: "Status Pesanan: Dikirim atau Siap Pickup",
    icon: Truck,
    className:
      "bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/80 dark:text-indigo-200 dark:border-indigo-700",
    iconColor: "text-indigo-700 dark:text-indigo-400",
  },
  COMPLETED: {
    label: "Selesai",
    ariaLabel: "Status Pesanan: Selesai",
    icon: CheckCheck,
    className:
      "bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/80 dark:text-teal-200 dark:border-teal-700",
    iconColor: "text-teal-700 dark:text-teal-400",
  },
  CANCELLED: {
    label: "Dibatalkan",
    ariaLabel: "Status Pesanan: Dibatalkan",
    icon: XCircle,
    className:
      "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200 dark:border-rose-700",
    iconColor: "text-rose-700 dark:text-rose-400",
  },
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * OrderStatusBadge Component
 * WCAG 2.2 AA Compliant Status Indicator:
 * - Color is not the sole indicator (Icon + Label text used)
 * - Contrast ratios >= 4.5:1 in light and dark mode
 * - Includes full explicit aria-label for Screen Readers
 */
export function OrderStatusBadge({
  status,
  className,
  size = "md",
}: OrderStatusBadgeProps) {
  const config = statusMap[status] || statusMap.PENDING_PAYMENT;
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs sm:text-sm gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2 font-medium",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-4.5 h-4.5",
  };

  return (
    <span
      role="status"
      aria-label={config.ariaLabel}
      className={cn(
        "inline-flex items-center font-medium rounded-full border shadow-xs transition-colors duration-150 select-none",
        config.className,
        sizeClasses[size],
        className
      )}
    >
      <Icon
        className={cn("shrink-0", config.iconColor, iconSizes[size])}
        aria-hidden="true"
      />
      <span>{config.label}</span>
    </span>
  );
}
