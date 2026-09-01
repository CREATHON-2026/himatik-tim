"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface FilterItemOption {
  id: string;
  label: string;
  count?: number | string;
  disabled?: boolean;
}

export interface SelectFilterTableProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FilterItemOption[];
  value: string;
  onValueChange: (value: string) => void;
  variant?: "skeuo-forest" | "skeuo-paper" | "skeuo-gold";
  size?: "sm" | "default" | "lg";
}

export function SelectFilterTable({
  items,
  value,
  onValueChange,
  variant = "skeuo-forest",
  size = "default",
  className,
  ...props
}: SelectFilterTableProps) {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        "no-scrollbar inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-md p-1",
        variant === "skeuo-forest" &&
          "border border-white/10 bg-[#1B2519]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]",
        variant === "skeuo-paper" &&
          "border border-[#566B4D]/15 bg-[#F5E9D5]/40 shadow-[inset_0_2px_4px_rgba(120,90,40,0.15)]",
        variant === "skeuo-gold" &&
          "border border-[#B89A57]/20 bg-[#B89A57]/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const isActive = item.id === value;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={item.disabled}
            onClick={() => onValueChange(item.id)}
            className={cn(
              // Base Box Shape: Box with rounded corners (12px–16px rounded-xl/rounded-2xl) NOT rounded-full
              "group relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-xl font-semibold tracking-tight transition-all duration-200 ease-out outline-none select-none",

              // Sizing variants
              size === "sm" && "h-8.5 rounded-md px-3.5 text-xs",
              size === "default" && "h-10 rounded-md px-4.5 text-xs sm:text-sm",
              size === "lg" && "h-12 rounded-lg px-5.5 text-sm sm:text-base",

              // Disabled state
              item.disabled &&
                "pointer-events-none cursor-not-allowed opacity-40",

              // ── Active State: Tactile 3D Sunken Box with Deep Specular Depth ──
              isActive && [
                "translate-y-[1px]",
                variant === "skeuo-forest" && [
                  "bg-gradient-to-b from-[#465E3E] via-[#384C32] to-[#273723]",
                  "text-[#FAF4EC]",
                  "border-t-[1.5px] border-r-[1px] border-b-[2px] border-l-[1px] border-t-white/40 border-r-black/40 border-b-black/60 border-l-white/20",
                  "shadow-[inset_0_3px_6px_rgba(0,0,0,0.6),inset_0_-1.5px_3px_rgba(255,255,255,0.15),0_2px_4px_rgba(0,0,0,0.3)]",
                  "[text-shadow:0_1px_2px_rgba(0,0,0,0.6)]",
                ],
                variant === "skeuo-paper" && [
                  "bg-gradient-to-b from-[#5E7454] via-[#4D6344] to-[#3A4E32]",
                  "text-white",
                  "border-t-[1.5px] border-r-[1px] border-b-[2px] border-l-[1px] border-t-white/45 border-r-black/30 border-b-black/50 border-l-white/25",
                  "shadow-[inset_0_3px_6px_rgba(0,0,0,0.55),inset_0_-1.5px_3px_rgba(255,255,255,0.2),0_2px_4px_rgba(62,82,55,0.25)]",
                  "[text-shadow:0_1px_2px_rgba(0,0,0,0.5)]",
                ],
                variant === "skeuo-gold" && [
                  "bg-gradient-to-b from-[#CDB067] via-[#B89A57] to-[#8C723B]",
                  "text-white",
                  "border-t-[1.5px] border-r-[1px] border-b-[2px] border-l-[1px] border-t-white/55 border-r-black/35 border-b-black/55 border-l-white/30",
                  "shadow-[inset_0_3px_6px_rgba(0,0,0,0.55),inset_0_-1.5px_3px_rgba(255,255,255,0.3),0_2px_4px_rgba(184,154,87,0.3)]",
                  "[text-shadow:0_1px_2px_rgba(0,0,0,0.4)]",
                ],
              ],

              // ── Inactive State: Raised 3D Tactile Paper Box ──
              !isActive && [
                "bg-gradient-to-b from-[#FFFFFF] to-[#FAF4EC] text-[#3E5237]",
                "border-t-[1.5px] border-r-[1.5px] border-b-[2.5px] border-l-[1px] border-t-white/90 border-r-[#B89A57]/30 border-b-[#B89A57]/45 border-l-white/70",
                "shadow-[0_6px_16px_rgba(62,82,55,0.12),0_2px_4px_rgba(0,0,0,0.06),inset_0_1.5px_1px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(184,154,87,0.15)]",
                "[text-shadow:0_1px_1px_rgba(255,255,255,0.8)]",
                "hover:-translate-y-0.5 hover:border-[#B89A57]/60 hover:from-[#FFFFFF] hover:to-[#F5EAD9] hover:shadow-[0_10px_22px_rgba(62,82,55,0.18),0_3px_6px_rgba(0,0,0,0.08)]",
                "active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
              ]
            )}
          >
            <span>{item.label}</span>

            {/* Gold Ring Count Badge Capsule */}
            {item.count !== undefined && (
              <span
                className={cn(
                  "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200",

                  // Badge sizes
                  size === "sm" &&
                    "h-4.5 min-w-4.5 rounded-full px-1.5 text-[10px]",
                  size === "default" &&
                    "h-5 min-w-5 rounded-full px-2 text-[11px]",
                  size === "lg" && "h-6 min-w-6 rounded-full px-2.5 text-xs",

                  // Badge active styling with Muted Gold Ring
                  isActive && [
                    "border border-[#B89A57]",
                    "bg-[#1A2518]/70 text-[#FAF4EC]",
                    "shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]",
                  ],

                  // Badge inactive styling
                  !isActive && [
                    "border border-[#D8C4A7]",
                    "bg-[#F5E9D5]/60 text-[#4A5E42]",
                    "group-hover:border-[#B89A57] group-hover:bg-[#F5E9D5]",
                  ]
                )}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
