"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgePercent,
  Check,
  Heart,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/modules/home/product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/product.data";
import { formatPrice } from "@/lib/formate-price";

const relatedImages = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
];

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
  const gallery = product.colors[selectedColorIndex]?.images ?? product.colors[0]?.images ?? [];
  const activeImage = gallery[selectedImageIndex] ?? gallery[0] ?? relatedImages[0];

  return (
    <div className="space-y-4">
      <div className="relative h-140 overflow-hidden rounded border border-black/5 bg-[#f0f0f0] sm:h-160">
        <Image
          src={activeImage}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover"
        />
      
      </div>

      <div
        className={cn(
          "w-full gap-3",
          gallery.length > 4 ? "flex snap-x overflow-x-auto pb-2" : "grid grid-cols-4"
        )}
      >
        {gallery.map((image, index) => (
          <button
            key={`${product.slug}-${image}-${index}`}
            type="button"
            aria-label={`View product image ${index + 1}`}
            onClick={() => onSelectThumbnail(index)}
            className={cn(
              "group relative h-24 shrink-0 overflow-hidden rounded border bg-white shadow-sm transition-all snap-start",
              gallery.length > 4 ? "w-[calc(25%-0.75rem)] min-w-27.5" : "w-full",
              index === selectedImageIndex ? "border-black/20 ring-1 ring-black/10" : "border-transparent"
            )}
          >
            <Image src={image} alt={`${product.name} thumbnail ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
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
  const [saved, setSaved] = useState(false);
  const selectedColor = product.colors[selectedColorIndex] ?? product.colors[0];
  const salePercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        <span>{product.badge}</span>
      </div>

      <div>
        <h1 className="text-4xl font-semibold tracking-[-0.06em] text-foreground">{product.name}</h1>
      </div>

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-1 text-[#1d1d1d]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn("size-4 fill-current", index < Math.round(product.rating) ? "text-black" : "text-muted-foreground/60")}
            />
          ))}
        </div>
        <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
        <span>({product.reviewCount} reviews)</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-4xl font-semibold tracking-[-0.04em] text-foreground">
          {formatPrice(product.price)}
        </span>
        <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
        <span className="rounded bg-black px-2 py-1 text-xs font-semibold text-white">{salePercent}% OFF</span>
      </div>

      <p className="max-w-xl text-base leading-7 text-muted-foreground">{product.description}</p>

      <div className="border-t border-black/10 pt-5">
        <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>Color: {selectedColor?.name ?? "Default"}</span>
        </div>

        <div className="flex items-center gap-3">
          {product.colors.map((color, index) => (
            <button
              key={color.name}
              type="button"
              aria-label={`Select ${color.name}`}
              onClick={() => onSelectColor(index)}
              className={cn(
                "relative h-9 w-9 rounded-full border-2 transition-all duration-200",
                selectedColorIndex === index ? "border-black shadow-sm" : "border-white"
              )}
              style={{ backgroundColor: color.hex }}
            >
              {selectedColorIndex === index && <span className="absolute inset-0 rounded-full ring-2 ring-black/10" />}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-black/10 pt-5">
        <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>Size: {selectedSize}</span>
          <button type="button" className="font-medium text-foreground underline decoration-black/25 underline-offset-4 hover:decoration-black">
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={cn(
                "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                selectedSize === size ? "border-black bg-black text-white" : "border-black/10 bg-white text-foreground hover:border-black/25"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button className="flex h-15.5 flex-1 items-center justify-center gap-3 rounded-xl bg-black text-base font-semibold text-white hover:bg-black/90">
          <ShoppingBag className="size-5" />
          Add to Cart
        </Button>
        <button
          type="button"
          aria-label="Save to wishlist"
          onClick={() => setSaved((value) => !value)}
          className={cn(
            "flex h-15.5 w-15.5 items-center justify-center rounded-xl border border-black/10 bg-white transition-colors",
            saved && "bg-black text-white"
          )}
        >
          <Heart className={cn("size-5", saved ? "fill-current" : "fill-none")} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 border-t border-black/10 pt-5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2"><Truck className="size-4 text-foreground" /> <span>Free Shipping</span></div>
        <div className="flex items-center gap-2"><BadgePercent className="size-4 text-foreground" /> <span>Easy Returns</span></div>
        <div className="flex items-center gap-2"><ShieldCheck className="size-4 text-foreground" /> <span>Secure Payment</span></div>
      </div>
    </div>
  );
}

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] ?? product.sizes[0] ?? "M");

  const relatedCards = useMemo(
    () => [
      {
        id: "1",
        name: "Minimal Hoodie",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
        price: 54.99,
        originalPrice: 74.99,
        category: "Essentials",
        slug: "minimal-hoodie",
        label: "New",
      },
      {
        id: "2",
        name: "Classic Sweatshirt",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80",
        price: 49.99,
        originalPrice: 69.99,
        category: "Core",
        slug: "classic-sweatshirt",
        label: "Trending",
      },
      {
        id: "3",
        name: "Zip Up Hoodie",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
        price: 64.99,
        originalPrice: 94.99,
        category: "Layering",
        slug: "zip-up-hoodie",
        label: "Limited Drop",
      },
      {
        id: "4",
        name: product.name,
        image: product.colors[0]?.images[0],
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        slug: product.slug,
        label: product.badge,
      },
    ],
    [product]
  );

  return (
    <div className="space-y-12">
      <div className="grid gap-10 lg:grid-cols-[1.45fr_0.95fr] lg:items-start">
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

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-black/5 bg-white p-6">
          <div className="mb-5 flex gap-8 border-b border-black/10 text-sm font-medium text-muted-foreground">
            {[
              "Details",
              "Materials",
              "Size & Fit",
              "Shipping & Returns",
            ].map((tab, index) => (
              <button key={tab} type="button" className={cn("pb-3", index === 0 && "border-b-2 border-black text-foreground")}>
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-5 text-base leading-7 text-muted-foreground">
            <p>
              Crafted from high-quality heavyweight cotton, this hoodie delivers unmatched comfort and durability. The oversized fit and minimal design make it a versatile staple for any wardrobe.
            </p>

            <ul className="space-y-3">
              {[
                "Oversized fit",
                "Soft & heavyweight fabric",
                "Adjustable drawstring hood",
                "Ribbed cuffs and hem",
                "Unisex style",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex size-5 items-center justify-center rounded-full bg-black text-white">
                    <Check className="size-3" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

     
      </div>

    
    </div>
  );
}
