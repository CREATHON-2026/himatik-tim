import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex h-5.5 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-all select-none [&>svg]:pointer-events-none [&>svg]:size-3.5!",
  {
    variants: {
      variant: {
        default:
          "bg-[#F5F3FF] text-[#6355D9] border-[#DDD6FE] font-semibold",
        secondary:
          "bg-[#F5F5F4] text-[#44403C] border-[#E7E5E4]",
        destructive:
          "bg-red-50 text-red-600 border-red-200",
        outline:
          "border-[#E7E5E4] text-[#78716C] bg-white",
        ghost:
          "text-[#78716C] hover:bg-[#F5F5F4] border-transparent",
        link:
          "text-[#6355D9] underline-offset-4 hover:underline border-transparent p-0",
        accent:
          "bg-[#FFF1F0] text-[#E76F61] border-[#FFD0CC] font-semibold",
        success:
          "bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0] font-medium",
        warning:
          "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A] font-medium",
        // Backward-compatible skeuo aliases
        "golden-hour":
          "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
        skeuo:
          "bg-[#F5F3FF] text-[#6355D9] border-[#DDD6FE]",
        "skeuo-forest":
          "bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]",
        "skeuo-gold":
          "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
        "skeuo-sage":
          "bg-[#F5F5F4] text-[#44403C] border-[#E7E5E4]",
        "skeuo-peach":
          "bg-[#FFF1F0] text-[#E76F61] border-[#FFD0CC]",
        "skeuo-olive":
          "bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]",
        "skeuo-sand":
          "bg-[#FAFAF9] text-[#78716C] border-[#E7E5E4]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
