"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";

export interface SwitchSkeuoProps extends SwitchPrimitive.Root.Props {
  variant?: "paper" | "forest";
}

const SwitchSkeuo = React.forwardRef<HTMLButtonElement, SwitchSkeuoProps>(
  ({ className, variant = "paper", ...props }, ref) => {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        data-slot="switch-skeuo"
        className={cn(
          "skeuo-switch-root",
          variant === "forest" && "forest-theme",
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          data-slot="switch-skeuo-thumb"
          className="skeuo-switch-thumb"
        >
          <div className="skeuo-switch-led" />
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
    );
  }
);

SwitchSkeuo.displayName = "SwitchSkeuo";

export { SwitchSkeuo };
