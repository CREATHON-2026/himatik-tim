import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative z-1 w-full h-full flex items-center justify-center font-semibold rounded-[inherit] transition-[background-color,color] duration-200 ease-out select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-[#5E7454] to-[#3E5237] text-white/95 border-t-[1.5px] border-t-white/45 border-l-[1px] border-l-white/25 border-b-[2.5px] border-b-black/35 border-r-[1.5px] border-r-black/20 shadow-[0_18px_45px_rgba(0,0,0,0.25),0_2px_4px_rgba(0,0,0,0.15),inset_0_1.5px_1px_rgba(255,255,255,0.65),inset_0_-3px_5px_rgba(0,0,0,0.4)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] hover:from-[#677F5C] hover:to-[#43573C] hover:shadow-[0_22px_55px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.18),inset_0_1.5px_1px_rgba(255,255,255,0.7),inset_0_-3px_5px_rgba(0,0,0,0.4)] active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.5)] active:translate-y-[1px]",
        outline:
          "bg-gradient-to-b from-[#FFFFFF] to-[#FAF4EC] text-foreground border-t-[1.5px] border-t-white/90 border-l-[1px] border-l-white/70 border-b-[2.5px] border-b-[#B89A57]/50 border-r-[1.5px] border-r-[#B89A57]/30 shadow-[0_12px_30px_rgba(62,82,55,0.12),0_2px_4px_rgba(0,0,0,0.06),inset_0_1.5px_1px_rgba(255,255,255,0.9),inset_0_-2.5px_4px_rgba(184,154,87,0.18)] [text-shadow:0_1px_1px_rgba(255,255,255,0.8)] hover:from-[#FFFFFF] hover:to-[#F5EAD9] hover:shadow-[0_16px_38px_rgba(62,82,55,0.16),0_4px_8px_rgba(0,0,0,0.08),inset_0_1.5px_1px_rgba(255,255,255,0.95)] active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.15)] active:translate-y-[1px] dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/95",
        ghost:
          "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
        link: "text-primary underline-offset-4 hover:underline",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/95",
        // skeuo variants — gaya taktil 3D, rendering dikontrol terpisah di bawah
        skeuo: "",
        "skeuo-forest": "",  // forest: hijau hutan dalam
        "skeuo-paper": "",   // paper: krem/linen hangat
        "skeuo-gold": "",    // gold: luxe gold / bronze
        "skeuo-secondary": "",
        "skeuo-forest-secondary": "",
        "skeuo-paper-secondary": "",
        "skeuo-gold-secondary": "",
        "skeuo-peach": "",
        "skeuo-peach-secondary": "",
      },
      size: {
        default:
          "h-10 gap-2 px-5 text-sm rounded-lg has-data-[icon=inline-end]:pr-4.5 has-data-[icon=inline-start]:pl-4.5",
        xs: "h-7 gap-1 rounded-lg px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8.5 gap-1.5 rounded-lg px-3.5 text-[0.825rem] has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 px-6 text-base rounded-lg has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-10 rounded-lg",
        "icon-xs":
          "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8.5 rounded-lg",
        "icon-lg": "size-12 rounded-lg",
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

  // ── Varian Skeuo: struktur berlapis DOM untuk efek fisik penekanan 3D ──
  const skeuoThemeMap: Record<string, string> = {
    skeuo: "",
    "skeuo-forest": "forest-btn-theme",
    "skeuo-paper": "paper-btn-theme",
    "skeuo-gold": "gold-btn-theme",
    "skeuo-peach": "peach-btn-theme",
    "skeuo-secondary": "skeuo-btn-secondary",
    "skeuo-forest-secondary": "forest-btn-theme-secondary skeuo-btn-secondary",
    "skeuo-paper-secondary": "paper-btn-theme-secondary skeuo-btn-secondary",
    "skeuo-gold-secondary": "gold-btn-theme-secondary skeuo-btn-secondary",
    "skeuo-peach-secondary": "peach-btn-theme-secondary skeuo-btn-secondary",
  };

  if (variant && variant in skeuoThemeMap) {
    const themeClass = skeuoThemeMap[variant as keyof typeof skeuoThemeMap];
    return (
      <ButtonPrimitive
        data-slot="button"
        disabled={disabled}
        render={render}
        nativeButton={isNative}
        className={cn(
          "skeuo-btn focus-visible:ring-3 focus-visible:ring-ring/50",
          `skeuo-btn-${size}`,
          themeClass,
          disabled && "skeuo-btn-disabled",
          className
        )}
        {...props}
      >
        {/* Outer: bayangan tepi/angkat tombol */}
        <div className="skeuo-btn-outer w-full h-full">
          {/* Inner: permukaan gradasi + bevel dalam */}
          <div className="skeuo-btn-inner w-full h-full">
            {/* Span: teks label dengan gradasi & anti-aliasing */}
            <span className="skeuo-btn-span w-full h-full">
              {children}
            </span>
          </div>
        </div>
      </ButtonPrimitive>
    );
  }

  // ── Varian standar lainnya ─────────────────────────────────────────────
  const showStarBorder = variant !== "ghost" && variant !== "link";

  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={disabled}
      render={render}
      nativeButton={isNative}
      className={cn(
        "group/button relative inline-flex shrink-0 items-center justify-center overflow-hidden transition-all duration-200 ease-out outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 hover:scale-102 hover:-translate-y-0.5 active:scale-98 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-lg",
        showStarBorder ? "p-[2px]" : "p-0",
        className
      )}
      {...props}
    >
      {showStarBorder && (
        <>
          {/* Star movement background animations */}
          <div
            className="absolute w-[300%] h-[50%] opacity-70 -bottom-2.75 right-[-250%] rounded-full animate-star-movement-bottom z-0"
            style={{
              background: "radial-gradient(circle, var(--accent-gold), transparent 10%)"
            }}
          />
          <div
            className="absolute w-[300%] h-[50%] opacity-70 -top-2.5 left-[-250%] rounded-full animate-star-movement-top z-0"
            style={{
              background: "radial-gradient(circle, var(--accent-gold), transparent 10%)"
            }}
          />
        </>
      )}

      {/* Inner container applying the CVA variants */}
      <div
        className={cn(
          buttonVariants({ variant, size })
        )}
      >
        {children}
      </div>
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };

