import { cn } from "@/lib/utils";
import type { SizeSelectorProps } from "@/types/product-detail.type";

export function SizeSelector({ variants, selectedVariantId, onChange }: SizeSelectorProps) {
  return (
    <div>
      <p className="text-sm">Size</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {variants.map((v) => {
          const out = v.stockQty === 0;
          const low = v.stockQty > 0 && v.stockQty <= 5;
          const selected = v.id === selectedVariantId;
          return (
            <button key={v.id} type="button" disabled={out} onClick={() => onChange(v.id)} aria-pressed={selected}
              className={cn("relative h-10 min-w-14 overflow-hidden rounded-full border px-4 text-sm transition-colors duration-200",
                selected ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground",
                out && "cursor-not-allowed text-muted-foreground opacity-50 hover:border-border")}>
              {v.size}
              {out && <span aria-hidden className="absolute left-1/2 top-1/2 h-px w-[130%] -translate-x-1/2 -translate-y-1/2 -rotate-[20deg] bg-muted-foreground" />}
              {low && <span aria-hidden className="absolute right-2 top-1.5 size-1.5 rounded-full bg-accent" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
