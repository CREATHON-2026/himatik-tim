import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        accent:
          "bg-accent text-accent-foreground [a]:hover:bg-accent/80",
        "golden-hour":
          "bg-gradient-to-br from-[#B89A57] to-[#EBC3A8] text-white border-0 font-semibold shadow-sm shadow-[#B89A57]/15",
        skeuo: "skeuo-badge [a]:hover:brightness-105",
        "skeuo-forest": "skeuo-badge skeuo-badge-forest [a]:hover:brightness-105",
        "skeuo-gold": "skeuo-badge skeuo-badge-gold [a]:hover:brightness-105",
        "skeuo-sage": "skeuo-badge skeuo-badge-sage [a]:hover:brightness-105",
        "skeuo-peach": "skeuo-badge skeuo-badge-peach [a]:hover:brightness-105",
        "skeuo-olive": "skeuo-badge skeuo-badge-olive [a]:hover:brightness-105",
        "skeuo-sand": "skeuo-badge skeuo-badge-sand [a]:hover:brightness-105",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

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
  })
}

export { Badge, badgeVariants }
