"use client";
import { useMemo, useState } from "react";
import { ProductGallery } from "@/components/modules/product/product-gallery";
import { ProductInfo } from "@/components/modules/product/product-info";
import type { ProductDetailProps } from "@/types/product-detail.type";

export function ProductDetailClient({ product }: ProductDetailProps) {
  const [colorId, setColorId] = useState(product.colors[0]?.id ?? "");

  const images = useMemo(
    () => product.colors.find((color) => color.id === colorId)?.images ?? product.colors[0]?.images ?? [],
    [colorId, product.colors]
  );

  return (
    <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
      <ProductGallery images={images} productName={product.name} />
      <div className="md:sticky md:top-24 md:self-start">
        <ProductInfo product={product} onColorChange={setColorId} />
      </div>
    </div>
  );
}