import { Minus, Plus } from "lucide-react";
import type { QuantitySelectorProps } from "@/types/product-detail.type";

export function QuantitySelector({ value, min = 1, max, onChange, disabled }: QuantitySelectorProps) {
  return (
    <div>
      <p className="text-sm">Quantity</p>
      <div className={`mt-3 inline-flex h-10 items-center rounded-full border border-border transition-opacity duration-200 ${disabled ? "opacity-50" : ""}`}>
        <button type="button" aria-label="Decrease quantity" disabled={disabled || value <= min} onClick={() => onChange(value - 1)} className="flex size-10 items-center justify-center disabled:cursor-not-allowed disabled:text-muted-foreground"><Minus className="size-4" /></button>
        <span className="w-8 text-center text-sm tabular-nums">{value}</span>
        <button type="button" aria-label="Increase quantity" disabled={disabled || value >= max} onClick={() => onChange(value + 1)} className="flex size-10 items-center justify-center disabled:cursor-not-allowed disabled:text-muted-foreground"><Plus className="size-4" /></button>
      </div>
    </div>
  );
}
