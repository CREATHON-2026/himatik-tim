"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

export interface CheckboxProps extends CheckboxPrimitive.Root.Props {
  variant?: "default" | "skeuo" | "skeuo-forest";
}

function Checkbox({ className, variant = "default", ...props }: CheckboxProps) {
  const isSkeuo = variant === "skeuo" || variant === "skeuo-forest";
  
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        variant === "default" && "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        variant === "skeuo" && "skeuo-checkbox",
        variant === "skeuo-forest" && "skeuo-checkbox-forest",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn(
          !isSkeuo && "grid place-content-center text-current transition-none [&>svg]:size-3.5",
          isSkeuo && "skeuo-checkbox-indicator [&>svg]:size-3.5"
        )}
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

