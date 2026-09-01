"use client";

import { ShoppingBag, Store } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleSwitcherProps {
  selectedRole: "CUSTOMER" | "CREATOR";
  onSelectRole: (role: "CUSTOMER" | "CREATOR") => void;
}

export function RoleSwitcher({ selectedRole, onSelectRole }: RoleSwitcherProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Pilihan Peran Akun
      </label>
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-100/90 border border-neutral-200/80 rounded-xl">
        <button
          type="button"
          onClick={() => onSelectRole("CUSTOMER")}
          className={cn(
            "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer",
            selectedRole === "CUSTOMER"
              ? "bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-600/30"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60"
          )}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer (Penyewa)</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectRole("CREATOR")}
          className={cn(
            "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer",
            selectedRole === "CREATOR"
              ? "bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-600/30"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60"
          )}
        >
          <Store className="w-4 h-4" />
          <span>Creator (Mitra Rental)</span>
        </button>
      </div>
    </div>
  );
}
