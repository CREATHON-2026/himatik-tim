"use client"

import React, { useContext } from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { cn } from "@/lib/utils"

const ProgressVariantContext = React.createContext<"default" | "skeuo" | "skeuo-forest">("default")

export interface ProgressProps extends Omit<ProgressPrimitive.Root.Props, "children"> {
  variant?: "default" | "skeuo" | "skeuo-forest"
  children?: React.ReactNode
}

function Progress({
  className,
  children,
  value,
  variant = "default",
  ...props
}: ProgressProps) {
  return (
    <ProgressVariantContext.Provider value={variant}>
      <ProgressPrimitive.Root
        value={value}
        data-slot="progress"
        className={cn("flex flex-wrap gap-2.5 w-full", className)}
        {...props}
      >
        {children}
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </ProgressPrimitive.Root>
    </ProgressVariantContext.Provider>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  const variant = useContext(ProgressVariantContext)
  const isSkeuo = variant === "skeuo" || variant === "skeuo-forest"

  return (
    <ProgressPrimitive.Track
      className={cn(
        !isSkeuo && "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        variant === "skeuo" && "skeuo-progress-track",
        variant === "skeuo-forest" && "skeuo-progress-track skeuo-progress-track-forest",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  const variant = useContext(ProgressVariantContext)
  const isSkeuo = variant === "skeuo" || variant === "skeuo-forest"

  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        !isSkeuo && "h-full bg-primary transition-all",
        variant === "skeuo" && "skeuo-progress-indicator skeuo-progress-indicator-paper",
        variant === "skeuo-forest" && "skeuo-progress-indicator skeuo-progress-indicator-forest",
        className
      )}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-xs font-semibold tracking-wide uppercase opacity-75", className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-xs text-muted-foreground font-semibold tabular-nums opacity-80",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
