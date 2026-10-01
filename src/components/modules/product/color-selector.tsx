import { cn } from "@/lib/utils";
import type { ColorSelectorProps } from "@/types/product-detail.type";

export function ColorSelector({ colors, selectedColorId, onChange }: ColorSelectorProps) {
  const selected = colors.find((c) => c.id === selectedColorId);
  return (
    <div>
      <p className="text-sm">Color: <span className="text-muted-foreground">{selected?.colorName}</span></p>
      <div className="mt-3 flex gap-3">
        {colors.map((c) => (
          <button key={c.id} type="button" onClick={() => onChange(c.id)} aria-label={c.colorName} aria-pressed={c.id === selectedColorId}
            className={cn("flex size-9 items-center justify-center rounded-full border border-border bg-muted text-xs font-medium ring-offset-2 ring-offset-background transition-shadow duration-200",
              c.id === selectedColorId ? "ring-1 ring-foreground" : "hover:ring-1 hover:ring-border")}
            style={c.colorHex ? { backgroundColor: c.colorHex } : undefined}>
            {!c.colorHex && c.colorName.charAt(0)}
          </button>
        ))}
      </div>
    </div>
  );
}
