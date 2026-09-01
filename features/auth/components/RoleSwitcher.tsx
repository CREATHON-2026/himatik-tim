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
      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
        Daftar Sebagai
      </label>
      <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-900/90 border border-neutral-800 rounded-xl">
        <button
          type="button"
          onClick={() => onSelectRole("CUSTOMER")}
          className={cn(
            "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer",
            selectedRole === "CUSTOMER"
              ? "bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
          )}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer (Penyewa)</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectRole("CREATOR")}
          className={cn(
            "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer",
            selectedRole === "CREATOR"
              ? "bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
          )}
        >
          <Store className="w-4 h-4" />
          <span>Creator (Mitra Rental)</span>
        </button>
      </div>
    </div>
  );
}
