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
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#78716C] z-10 [&_svg]:size-4">
            {startIcon}
          </div>
        )}
        <InputPrimitive
          type={type}
          data-slot="input"
          className={cn(
            "w-full h-10 px-3.5 py-2 rounded-xl text-sm bg-white text-[#111827] border border-[#E7E5E4] placeholder:text-[#A8A29E] shadow-2xs transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#6355D9]/30 focus-visible:border-[#6355D9] disabled:opacity-50 disabled:cursor-not-allowed",
            startIcon && "pl-10",
            endIcon && "pr-10",
            className
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#78716C] z-10 [&_svg]:size-4">
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
        "w-full h-10 px-3.5 py-2 rounded-xl text-sm bg-white text-[#111827] border border-[#E7E5E4] placeholder:text-[#A8A29E] shadow-2xs transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#6355D9]/30 focus-visible:border-[#6355D9] disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export { Input };
