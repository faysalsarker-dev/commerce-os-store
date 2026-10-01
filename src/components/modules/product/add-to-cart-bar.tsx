"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formate-price";

export function AddToCartBar({ price, canAdd, label, onAdd }: any) {
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1500);
    return () => window.clearTimeout(t);
  }, [added]);

  const handle = () => {
    onAdd();
    toast("Added to cart");
    setAdded(true);
  };
  const text = added ? "Added" : label;

  return (
    <>
      <Button size="lg" className="hidden h-12 w-full rounded-full md:flex" disabled={!canAdd} onClick={handle}>{text}</Button>
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-border bg-background/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <span className="text-base font-semibold">{formatPrice(price)}</span>
        <Button size="lg" className="h-12 flex-1 rounded-full" disabled={!canAdd} onClick={handle}>{text}</Button>
      </div>
    </>
  );
}
