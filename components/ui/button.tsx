import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-150 ease-out select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#6355D9]/40 focus-visible:border-[#6355D9] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#6355D9] text-white hover:bg-[#5145C6] active:bg-[#4338A8] shadow-xs active:scale-[0.98]",
        outline:
          "bg-white text-[#292524] border border-[#E7E5E4] hover:bg-[#F5F5F4] hover:border-[#D6D3D1] hover:text-[#111827] shadow-2xs active:scale-[0.98]",
        secondary:
          "bg-[#F5F3FF] text-[#6355D9] border border-[#DDD6FE] hover:bg-[#EDE9FE] active:bg-[#DDD6FE] active:scale-[0.98]",
        ghost:
          "text-[#44403C] hover:bg-[#F5F5F4] hover:text-[#111827] active:bg-[#E7E5E4]",
        destructive:
          "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 active:bg-red-200 active:scale-[0.98]",
        link:
          "text-[#6355D9] underline-offset-4 hover:underline p-0 h-auto font-semibold",
        accent:
          "bg-[#E76F61] text-white hover:bg-[#D65D4F] active:bg-[#C54C3E] shadow-xs active:scale-[0.98]",
        // Backward-compatible skeuo aliases (clean modern fallback)
        skeuo:
          "bg-[#6355D9] text-white hover:bg-[#5145C6] active:bg-[#4338A8] shadow-xs",
        "skeuo-forest":
          "bg-[#6355D9] text-white hover:bg-[#5145C6] active:bg-[#4338A8] shadow-xs",
        "skeuo-paper":
          "bg-white text-[#292524] border border-[#E7E5E4] hover:bg-[#F5F5F4] shadow-2xs",
        "skeuo-gold":
          "bg-[#F5F3FF] text-[#6355D9] border border-[#DDD6FE] hover:bg-[#EDE9FE] shadow-2xs",
        "skeuo-secondary":
          "bg-[#F5F3FF] text-[#6355D9] border border-[#DDD6FE] hover:bg-[#EDE9FE]",
        "skeuo-forest-secondary":
          "bg-[#F5F3FF] text-[#6355D9] border border-[#DDD6FE] hover:bg-[#EDE9FE]",
        "skeuo-paper-secondary":
          "bg-white text-[#292524] border border-[#E7E5E4] hover:bg-[#F5F5F4]",
        "skeuo-gold-secondary":
          "bg-[#F5F3FF] text-[#6355D9] border border-[#DDD6FE] hover:bg-[#EDE9FE]",
        "skeuo-peach":
          "bg-[#FFF1F0] text-[#E76F61] border border-[#FFD0CC] hover:bg-[#FFE4E1]",
        "skeuo-peach-secondary":
          "bg-[#FFF1F0] text-[#E76F61] border border-[#FFD0CC] hover:bg-[#FFE4E1]",
      },
      size: {
        default: "h-10 gap-2 px-4 py-2 text-sm rounded-xl",
        xs: "h-7 gap-1 rounded-lg px-2.5 text-xs",
        sm: "h-8.5 gap-1.5 rounded-lg px-3 text-xs",
        lg: "h-12 gap-2.5 px-6 text-base rounded-xl font-semibold",
        icon: "size-10 rounded-xl",
        "icon-xs": "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8.5 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  children,
  disabled,
  render,
  nativeButton,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  const isNative = nativeButton ?? (render ? false : undefined);

  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={disabled}
      render={render}
      nativeButton={isNative}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
