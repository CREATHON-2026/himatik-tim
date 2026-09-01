"use client"

import React, { useContext } from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"

const RadioVariantContext = React.createContext<"default" | "skeuo" | "skeuo-forest">("default")

export interface RadioGroupProps extends RadioGroupPrimitive.Props {
  variant?: "default" | "skeuo" | "skeuo-forest"
}

function RadioGroup({ className, variant = "default", children, ...props }: RadioGroupProps) {
  return (
    <RadioVariantContext.Provider value={variant}>
      <RadioGroupPrimitive
        data-slot="radio-group"
        className={cn("grid w-full gap-2.5", className)}
        {...props}
      >
        {children}
      </RadioGroupPrimitive>
    </RadioVariantContext.Provider>
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  const variant = useContext(RadioVariantContext)
  const isSkeuo = variant === "skeuo" || variant === "skeuo-forest"

  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        !isSkeuo && "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        variant === "skeuo" && "skeuo-radio-item",
        variant === "skeuo-forest" && "skeuo-radio-item skeuo-radio-item-forest",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={cn(!isSkeuo && "flex size-4 items-center justify-center", isSkeuo && "skeuo-radio-indicator")}
      >
        {isSkeuo ? (
          <span className="skeuo-radio-indicator-bead" />
        ) : (
          <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
        )}
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
