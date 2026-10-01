import { useState } from "react";
import type { ProductInfoProps } from "@/types/product-detail.type";
import { AddToCartBar } from "./add-to-cart-bar";
import { ColorSelector } from "./color-selector";
import { ProductExtraInfo } from "./product-extra-info";
import { QuantitySelector } from "./quantity-selector";
import { SizeSelector } from "./size-selector";
import { formatPrice } from "@/lib/formate-price";

export function ProductInfo({ product, onColorChange }: ProductInfoProps) {
  const [colorId, setColorId] = useState(product.colors[0]?.id ?? "");
  const [variantId, setVariantId] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0];
  const variant = color?.variants.find((v) => v.id === variantId);
  const price = variant?.sellingPriceOverride ?? product.sellingPrice;
  const allOut = color ? color.variants.every((v) => v.stockQty === 0) : true;
  const paragraphs = (product.description ?? "").split("\n\n").filter(Boolean);

  const changeColor = (id: string) => {
    setColorId(id);
    setVariantId(undefined);
    setQuantity(1);
    onColorChange(id);
  };
  const changeSize = (id: string) => {
    setVariantId(id);
    setQuantity(1);
  };

  const stockLine = variant
    ? variant.stockQty <= 5 ? `Only ${variant.stockQty} left` : "In stock"
    : allOut ? "Out of stock" : "In stock — select a size";
  const label = allOut || variant?.stockQty === 0 ? "Out of stock" : variant ? "Add to cart" : "Select a size";

  return (
    <div>
      {product.category && <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category.name}</p>}
      <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{product.name}</h1>
      <p className="mt-3 text-xl">{formatPrice(price)}</p>
      <p className={`mt-2 text-sm ${variant && variant.stockQty <= 5 ? "text-accent" : "text-muted-foreground"}`}>{stockLine}</p>
      {paragraphs.length > 0 && (
        <div className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
          {(expanded ? paragraphs : paragraphs.slice(0, 1)).map((p) => <p key={p}>{p}</p>)}
          {paragraphs.length > 1 && <button type="button" onClick={() => setExpanded((e) => !e)} className="text-foreground underline underline-offset-4">{expanded ? "Read less" : "Read more"}</button>}
        </div>
      )}
      <div className="mt-8 space-y-7">
        <ColorSelector colors={product.colors} selectedColorId={colorId} onChange={changeColor} />
        <SizeSelector variants={color?.variants ?? []} selectedVariantId={variantId} onChange={changeSize} />
        <QuantitySelector value={quantity} max={variant?.stockQty ?? 1} onChange={setQuantity} disabled={!variant} />
        <AddToCartBar price={price * quantity} canAdd={label === "Add to cart"} label={label} onAdd={() => undefined} />
      </div>
      <ProductExtraInfo />
    </div>
  );
}
