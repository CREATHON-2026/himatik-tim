import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

function Input({ className, type, startIcon, endIcon, ...props }: InputProps) {
  if (startIcon || endIcon) {
    return (
      <div className="relative flex items-center w-full">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#566B4D] z-10">
            {startIcon}
          </div>
        )}
        <InputPrimitive
          type={type}
          data-slot="input"
          className={cn(
            "skeuo-input",
            startIcon && "pl-10! sm:pl-10!",
            endIcon && "pr-10! sm:pr-10!",
            className
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#566B4D] z-10">
            {endIcon}
          </div>
        )}
      </div>
    );
  }

  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "skeuo-input",
        className
      )}
      {...props}
    />
  );
}

export { Input };

