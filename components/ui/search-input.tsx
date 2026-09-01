import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "skeuo" | "skeuo-forest" | "skeuo-paper" | "skeuo-gold";
  onClear?: () => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      type = "text",
      variant = "default",
      value,
      onChange,
      onClear,
      disabled,
      ...props
    },
    ref
  ) => {
    const [localValue, setLocalValue] = React.useState("");
    const isControlled = value !== undefined;
    const currentVal = isControlled ? (value as string) : localValue;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setLocalValue(e.target.value);
      }
      if (onChange) {
        onChange(e);
      }
    };

    const handleClear = () => {
      if (!isControlled) {
        setLocalValue("");
      }
      if (onClear) {
        onClear();
      }
    };

    const containerThemeMap = {
      default: "skeuo-search-container-chrome",
      skeuo: "skeuo-search-container-chrome",
      "skeuo-forest": "skeuo-search-container-forest",
      "skeuo-paper": "skeuo-search-container-paper",
      "skeuo-gold": "skeuo-search-container-gold",
    };

    // Color definitions for Search icons based on variants
    const iconColors = {
      default: "#64748B",
      skeuo: "#64748B",
      "skeuo-forest": "rgba(250, 244, 236, 0.45)",
      "skeuo-paper": "rgba(62, 82, 55, 0.55)",
      "skeuo-gold": "rgba(250, 244, 236, 0.45)",
    };

    return (
      <div
        className={cn(
          "skeuo-search-container",
          containerThemeMap[variant],
          className
        )}
        data-disabled={disabled}
      >
        <Search
          className="size-4 shrink-0 animate-fade-in"
          style={{ color: iconColors[variant] }}
        />
        <InputPrimitive
          ref={ref}
          type={type}
          value={currentVal}
          onChange={handleInputChange}
          disabled={disabled}
          className="skeuo-search-input"
          {...props}
        />
        {currentVal.length > 0 && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="skeuo-search-clear"
            aria-label="Pembersih teks"
          >
            <X className="size-2.5" />
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
