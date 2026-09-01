"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99
}: QuantityStepperProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10)
    if (!isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(max, parsed))
      onChange(clamped)
    }
  }

  return (
    <div className="flex items-center gap-1 bg-card/10 p-1 border border-border/40 rounded-xl w-fit shadow-xs">
      {/* Decrement Button */}
      <Button
        variant="outline"
        onClick={handleDecrement}
        disabled={value <= min}
        className="h-8 w-8 p-0 rounded-lg focus-visible:ring-2 focus-visible:ring-primary/10 border-border hover:bg-muted active:scale-95 transition-all cursor-pointer shadow-none scale-100 hover:scale-100 hover:translate-y-0 active:translate-y-0"
        type="button"
      >
        <Minus className="w-3.5 h-3.5 text-foreground/80" />
      </Button>

      {/* Value Input Display */}
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="h-8 w-11 text-center font-serif text-sm font-semibold bg-transparent text-foreground border-0 outline-none select-all focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />

      {/* Increment Button */}
      <Button
        variant="outline"
        onClick={handleIncrement}
        disabled={value >= max}
        className="h-8 w-8 p-0 rounded-lg focus-visible:ring-2 focus-visible:ring-primary/10 border-border hover:bg-muted active:scale-95 transition-all cursor-pointer shadow-none scale-100 hover:scale-100 hover:translate-y-0 active:translate-y-0"
        type="button"
      >
        <Plus className="w-3.5 h-3.5 text-foreground/80" />
      </Button>
    </div>
  )
}
