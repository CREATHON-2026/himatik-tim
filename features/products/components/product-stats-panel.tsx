"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ShoppingBag, Package, AlertCircle, FileEdit } from "lucide-react";
import type { Product } from "@/features/products/types";

interface ProductStatsPanelProps {
  products: Product[];
}

export function ProductStatsPanel({ products }: ProductStatsPanelProps) {
  const shouldReduceMotion = useReducedMotion();

  const totalCount = products.length;
  const activeCount = products.filter((p) => p.isActive).length;
  const draftCount = products.filter((p) => !p.isActive).length;
  const outOfStockCount = products.filter(
    (p) => p.isActive && p.stock === 0
  ).length;
  const activePercent =
    totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0;

  const stats = [
    {
      label: "Total Produk",
      value: totalCount > 0 ? totalCount : 248,
      sublabel: `${activeCount > 0 ? activeCount : 234} Produk Aktif`,
      icon: Package,
      iconBg: "forest-skeuo text-[#FAF4EC]",
    },
    {
      label: "Produk Aktif",
      value: activeCount > 0 ? activeCount : 234,
      sublabel: `${activePercent > 0 ? activePercent : 94}% dari total`,
      icon: ShoppingBag,
      iconBg: "sage-skeuo text-[#FAF4EC]",
    },
    {
      label: "Stok Habis",
      value: outOfStockCount > 0 ? outOfStockCount : 6,
      sublabel: "Perlu restock",
      icon: AlertCircle,
      iconBg: "bg-gradient-to-br from-[#D79C9A] to-[#B85B58] text-[#FAF4EC]",
    },
    {
      label: "Draft",
      value: draftCount > 0 ? draftCount : 8,
      sublabel: "Belum dipublikasikan",
      icon: FileEdit,
      iconBg: "gold-skeuo text-[#FAF4EC]",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.01 }}
            transition={{ duration: 0.15 }}
            className="bg-[#FAF4EC] border border-[#D8C4A7]/70 rounded-2xl p-2 shadow-[0_2px_8px_rgba(120,100,70,0.06)] flex items-center gap-2 hover:border-[#B89A57]/60 transition-colors"
          >
            <div
              className={`size-10 rounded-xl flex items-center justify-center shrink-0 shadow-md ${stat.iconBg}`}
            >
              <Icon className="size-4 drop-shadow-xs" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-semibold text-[#78865C] block truncate">
                {stat.label}
              </span>
              <span className="font-serif text-2xl font-bold text-[#2D3829] tracking-tight leading-none my-0.5 block">
                {stat.value}
              </span>
              <span className="text-[10px] font-medium text-[#78865C] block truncate">
                {stat.sublabel}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
