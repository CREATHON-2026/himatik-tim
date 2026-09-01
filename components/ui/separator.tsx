"use client"

import React from "react"
import Image from "next/image"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

export interface SeparatorProps extends SeparatorPrimitive.Props {
  variant?: "default" | "flourish" | "flourish-gold" | "showcase-flourish"
}

function Separator({
  className,
  orientation = "horizontal",
  variant = "default",
  ...props
}: SeparatorProps) {
  if (variant === "flourish") {
    return (
      <div className={cn("relative my-4 flex w-full items-center justify-center select-none", className)}>
        <Image
          src="/separator/footer-center-flourish.svg"
          alt="Separator Flourish"
          width={480}
          height={40}
          unoptimized
          className="h-8 w-auto max-w-full object-contain"
        />
      </div>
    )
  }

  if (variant === "flourish-gold") {
    return (
      <div className={cn("relative my-4 flex w-full items-center justify-center select-none", className)}>
        <Image
          src="/separator/footer-center-flourish-gold.webp"
          alt="Separator Flourish Gold"
          width={800}
          height={80}
          unoptimized
          className="h-14 sm:h-18 md:h-20 w-auto max-w-2xl object-contain filter drop-shadow-xs"
        />
      </div>
    )
  }

  if (variant === "showcase-flourish") {
    return (
      <div className={cn("relative my-4 flex w-full items-center justify-center select-none", className)}>
        <Image
          src="/separator/showcase-header-flourish.svg"
          alt="Showcase Header Flourish"
          width={1600}
          height={160}
          unoptimized
          className="h-20 sm:h-28 md:h-32 w-auto max-w-full object-contain filter drop-shadow-xs"
        />
      </div>
    )
  }

  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
