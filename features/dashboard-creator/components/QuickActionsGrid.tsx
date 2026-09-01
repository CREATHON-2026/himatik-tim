"use client";

import React from "react";
import Link from "next/link";
import { Plus, ClipboardList, Wallet, LayoutGrid, ChevronRight } from "lucide-react";

export function QuickActionsGrid() {
  const actions = [
    {
      id: "add-product",
      title: "Tambah Produk",
      subtitle: "Buat produk baru",
      href: "/dashboard/creator/products/new",
      icon: Plus,
      isActive: true,
    },
    {
      id: "manage-orders",
      title: "Kelola Pesanan",
      subtitle: "Lihat dan proses pesanan",
      href: "/dashboard/creator/orders",
      icon: ClipboardList,
      isActive: false,
    },
    {
      id: "view-balance",
      title: "Lihat Saldo",
      subtitle: "Cek saldo & penarikan",
      href: "/dashboard/creator/payout",
      icon: Wallet,
      isActive: false,
    },
    {
      id: "edit-store",
      title: "Edit Etalase",
      subtitle: "Atur tampilan toko Anda",
      href: "/dashboard/creator/profile",
      icon: LayoutGrid,
      isActive: false,
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-[#111827]">
        Aksi Cepat
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.id}
              href={action.href}
              className={`p-4 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-3 shadow-2xs group cursor-pointer ${
                action.isActive
                  ? "bg-[#FAF8FF] border-[#DDD6FE] hover:border-[#6355D9] hover:bg-[#F5F3FF]"
                  : "bg-white border-[#E7E5E4] hover:border-[#DDD6FE] hover:bg-[#FAFAF9]"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`size-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs transition-colors ${
                    action.isActive
                      ? "bg-white border border-[#DDD6FE] text-[#6355D9]"
                      : "bg-[#F5F5F4] text-[#78716C] group-hover:text-[#6355D9] group-hover:bg-[#F5F3FF]"
                  }`}
                >
                  <Icon className="size-4.5" />
                </div>

                <div className="min-w-0 text-left">
                  <span
                    className={`font-semibold text-xs block leading-tight truncate ${
                      action.isActive ? "text-[#6355D9]" : "text-[#111827]"
                    }`}
                  >
                    {action.title}
                  </span>
                  <span className="text-[11px] text-[#78716C] leading-none block mt-0.5 truncate">
                    {action.subtitle}
                  </span>
                </div>
              </div>

              <ChevronRight
                className={`size-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                  action.isActive ? "text-[#6355D9]" : "text-[#A8A29E]"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
