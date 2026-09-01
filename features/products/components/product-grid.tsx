"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FlowerIcon, AlertTriangle } from "lucide-react";
import { ProductCard } from "./product-card";
import { EmptyState } from "@/components/ui/empty-state";
import { LoaderSkeuo } from "@/components/ui/loader-skeuo";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import type { Product } from "@/features/products/types";

interface ProductGridProps {
  products: Product[];
  search: string;
  activeTab: string;
  isLoading?: boolean;
  error?: string | null;
  onAddClick: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onToggleActive: (id: string, active: boolean) => void;
}

export function ProductGrid({
  products,
  search,
  activeTab,
  isLoading = false,
  error = null,
  onAddClick,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleActive,
}: ProductGridProps) {
  const shouldReduceMotion = useReducedMotion();

  // 1. Loading State with Skeuomorphic Gold Loader
  if (isLoading) {
    return (
      <div className="paper-skeuo flex min-h-[35vh] w-full flex-col items-center justify-center gap-4 rounded-2xl p-12 border border-[#B89A57]/30 shadow-inner">
        <LoaderSkeuo size={300} variant="skeuo-gold" />
        <span className="text-xs font-bold text-[#3E5237] tracking-wide">
          Memuat koleksi produk toko...
        </span>
      </div>
    );
  }

  // 2. Error State with Skeuomorphic Destructive Alert
  if (error) {
    return (
      <div className="w-full py-6">
        <Alert variant="skeuo-destructive" className="shadow-sm">
          <AlertTriangle className="size-4" />
          <AlertTitle className="text-xs font-bold">Gagal Memuat Produk</AlertTitle>
          <AlertDescription className="text-[11px] opacity-90 mt-0.5">
            {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // 3. Empty State
  if (products.length === 0) {
    return (
      <div className="border border-[#D8C4A7]/60 bg-[#FAF4EC]/60 flex min-h-[35vh] items-center justify-center rounded-3xl border-dashed p-8">
        <EmptyState
          icon={<FlowerIcon className="text-[#B89A57] size-8" />}
          title={
            search || activeTab !== "semua"
              ? "Produk Tidak Ditemukan"
              : "Belum Ada Produk"
          }
          description={
            search || activeTab !== "semua"
              ? "Coba sesuaikan kata kunci pencarian atau filter tab Anda."
              : "Mulai tambahkan koleksi produk hadiah terbaik buatan toko Anda."
          }
          action={
            search || activeTab !== "semua"
              ? undefined
              : {
                  label: "Tambah Produk Pertama",
                  onClick: onAddClick,
                }
          }
        />
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -12,
      y: shouldReduceMotion ? 0 : 8,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-2"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard
            product={{
              id: product.id,
              name: product.name,
              price: Number(product.price),
              imageUrl: product.imageUrl,
              stock: product.stock,
              isActive: product.isActive,
            }}
            onEdit={() => onEdit(product)}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            onToggleActive={onToggleActive}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
