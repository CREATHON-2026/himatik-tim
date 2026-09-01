"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

export interface VariantOption {
  id: string
  name: string
  priceAdjustment?: number
  badgeText?: string
}

interface VariantSelectorProps {
  label: string
  options: VariantOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function VariantSelector({
  label,
  options,
  value,
  onChange,
  placeholder = "Pilih variasi..."
}: VariantSelectorProps) {
  // Find the selected option to display a clean trigger value
  const selectedOption = options.find((opt) => opt.id === value)
  
  // Format the trigger display value: e.g. "Kecil (S) (+Rp 25.000)"
  const shortName = selectedOption ? selectedOption.name.split(" - ")[0] : ""
  const displayLabel = selectedOption 
    ? `${shortName}${
        selectedOption.priceAdjustment && selectedOption.priceAdjustment > 0
          ? ` (+Rp ${selectedOption.priceAdjustment.toLocaleString("id-ID")})`
          : ""
      }`
    : placeholder

  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <Label className="text-xs font-sans tracking-wider uppercase text-muted-foreground font-semibold">
        {label}
      </Label>
      <Select value={value} onValueChange={(val: string | null) => onChange(val ?? "")}>

        <SelectTrigger className="w-full bg-card/30 border-border rounded-lg h-10 px-3.5 focus-visible:ring-3 focus-visible:ring-primary/10 focus-visible:border-primary/50 text-sm font-medium">
          <span className="flex-1 text-left truncate">{displayLabel}</span>
        </SelectTrigger>
        <SelectContent className="bg-popover border border-border/40 rounded-lg shadow-md max-h-60 overflow-y-auto">
          {options.map((option) => (
            <SelectItem
              key={option.id}
              value={option.id}
              className="flex items-center justify-between w-full rounded-md px-2.5 py-2 text-sm cursor-pointer transition-colors !focus:bg-primary/10 !focus:text-foreground !hover:bg-primary/10 !hover:text-foreground"
            >
              <div className="flex flex-col items-start text-left w-full whitespace-normal leading-normal py-0.5 pr-4">
                <span className="font-medium text-foreground">{option.name}</span>
                {((option.priceAdjustment && option.priceAdjustment > 0) || option.badgeText) && (
                  <div className="flex items-center gap-1.5 mt-1">
                    {option.priceAdjustment && option.priceAdjustment > 0 && (
                      <span className="text-[10px] text-muted-foreground font-sans font-medium">
                        +Rp {option.priceAdjustment.toLocaleString("id-ID")}
                      </span>
                    )}
                    {option.badgeText && (
                      <Badge variant="golden-hour" className="text-[8px] px-1.5 py-0 font-bold shrink-0">
                        {option.badgeText}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
