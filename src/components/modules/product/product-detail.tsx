"use client";

import Image from "next/image";
import { useState, ViewTransition } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/product.data";
import { formatPrice } from "@/lib/formate-price";
import { useCart } from "@/stores/cart-store";
import { toast } from "sonner";

function ProductGallery({
  product,
  selectedColorIndex,
  selectedImageIndex,
  onSelectThumbnail,
}: {
  product: Product;
  selectedColorIndex: number;
  selectedImageIndex: number;
  onSelectThumbnail: (index: number) => void;
}) {
  const gallery =
    product.colors[selectedColorIndex]?.images ??
    product.colors[0]?.images ??
    [];
  const activeImage = gallery[selectedImageIndex] ?? gallery[0];

  return (
    <div className="space-y-4">
      <ViewTransition
        name={`product-image-${product.slug}`}
        share="product-morph"
        default="none"
      >
        <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-muted">
          {activeImage ? (
            <Image
              src={activeImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
              Product image unavailable
            </div>
          )}
        </div>
      </ViewTransition>

      {gallery.length > 1 && (
        <div className="flex snap-x gap-3 overflow-x-auto pb-1">
          {gallery.map((image, index) => (
            <button
              key={`${product.slug}-${image}-${index}`}
              type="button"
              aria-label={`View product image ${index + 1}`}
              aria-pressed={index === selectedImageIndex}
              onClick={() => onSelectThumbnail(index)}
              className={cn(
                "relative h-20 w-16 shrink-0 snap-start overflow-hidden rounded-lg border bg-muted transition-[border-color,opacity] duration-200 sm:h-24 sm:w-20",
                index === selectedImageIndex
                  ? "border-primary"
                  : "border-border opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductInfo({
  product,
  selectedColorIndex,
  onSelectColor,
  selectedSize,
  onSelectSize,
}: {
  product: Product;
  selectedColorIndex: number;
  onSelectColor: (index: number) => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
}) {
  const { addItem } = useCart();
  const selectedColor = product.colors[selectedColorIndex] ?? product.colors[0];
  const hasComparePrice = product.originalPrice > product.price;
  const canAddToCart = product.sizes.length === 0 || Boolean(selectedSize);

  return (
    <div className="flex flex-col lg:sticky lg:top-24">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {product.category}
      </p>

      <ViewTransition
        name={`product-title-${product.slug}`}
        share="product-morph"
        default="none"
      >
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {product.name}
        </h1>
      </ViewTransition>

      <ViewTransition
        name={`product-price-${product.slug}`}
        share="product-morph"
        default="none"
      >
        <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {formatPrice(product.price)}
          </span>
          {hasComparePrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </ViewTransition>

      {product.description.trim() && (
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          {product.description}
        </p>
      )}

      {product.colors.length > 0 && (
        <div className="mt-8 border-t border-border pt-6">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h2 className="text-sm font-medium text-foreground">Color</h2>
            <span className="text-sm text-muted-foreground">
              {selectedColor?.name}
            </span>
          </div>
          <ViewTransition
            name={`product-colors-${product.slug}`}
            share="product-morph"
            default="none"
          >
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color, index) => (
                <button
                  key={color.name}
                  type="button"
                  aria-label={`Select ${color.name}`}
                  aria-pressed={selectedColorIndex === index}
                  onClick={() => onSelectColor(index)}
                  className={cn(
                    "grid size-10 place-items-center rounded-full border transition-[border-color,box-shadow] duration-200",
                    selectedColorIndex === index
                      ? "border-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
                      : "border-border hover:border-foreground/50",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="size-7 rounded-full border border-black/10"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          </ViewTransition>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div className="mt-7 border-t border-border pt-6">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h2 className="text-sm font-medium text-foreground">Size</h2>
            <span className="text-sm text-muted-foreground">
              {selectedSize ? `Selected: ${selectedSize}` : "Choose a size"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={selectedSize === size}
                onClick={() => onSelectSize(size)}
                className={cn(
                  "min-w-12 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                  selectedSize === size
                    ? "border-primary btn-main"
                    : "border-border bg-card text-card-foreground hover:border-foreground/50",
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button
        disabled={!canAddToCart}
        onClick={() => {
          const added = addItem(
            product,
            selectedColorIndex,
            selectedSize || "One size",
          );
          if (added) {
            toast.success("Added to cart");
          } else {
            toast.error("Unable to add this item to your cart.");
          }
        }}
        className="mt-8 h-12 w-full rounded-lg text-base btn-main font-semibold  transition-transform duration-200 hover:scale-[1.01] hover:bg-primary/90 active:scale-[0.99]"
      >
        <ShoppingBag className="size-5" />
        Add to cart
      </Button>
    </div>
  );
}

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");

  return (
    <div className="pb-12">
      <div className="grid gap-8 md:gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:items-start lg:gap-16">
        <ProductGallery
          product={product}
          selectedColorIndex={selectedColorIndex}
          selectedImageIndex={selectedImageIndex}
          onSelectThumbnail={setSelectedImageIndex}
        />
        <ProductInfo
          product={product}
          selectedColorIndex={selectedColorIndex}
          onSelectColor={(nextIndex) => {
            setSelectedColorIndex(nextIndex);
            setSelectedImageIndex(0);
          }}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
        />
      </div>
    </div>
  );
}
