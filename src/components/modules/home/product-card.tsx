"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type Product = {
  id: string | number;
  name: string;
  image: string;
  price: number;
  slug?: string;
  category?: string;
  label?: string;
  hoverImage?: string;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
};

export type ProductCardProps = {
  product: Product;
  href?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const DEFAULT_SIZES =
  "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const discountPercent = (price: number, originalPrice?: number) =>
  originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

export function ProductCard({
  product,
  href,
  className,
  sizes = DEFAULT_SIZES,
  priority = false,
}: ProductCardProps) {
  const [saved, setSaved] = useState(false);

  const discount = discountPercent(product.price, product.originalPrice);
  const productHref =
    href ?? (product.slug ? `/products/${product.slug}` : "#");

  return (
    <Link
      href={productHref}
      className={cn(
        "group/card relative flex min-w-0 flex-col outline-none bg-card p-2 rounded-lg",
        className
      )}
    >
      <article data-slot="product-card">
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-muted ring-1 ring-black/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={sizes}
            className={cn(
              "object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-hover/card:scale-[1.06]",
              "motion-reduce:transform-none"
            )}
          />

          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt=""
              aria-hidden="true"
              fill
              loading="lazy"
              sizes={sizes}
              className="object-cover opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.06] group-hover/card:opacity-100 motion-reduce:transition-none motion-reduce:transform-none"
            />
          )}

          <div className="pointer-events-none absolute inset-x-3 top-3 z-20 flex items-start justify-between gap-2">
            <div className="flex flex-col items-start gap-1.5">
              {discount > 0 && (
                <span className="rounded-sm bg-primary px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-primary-foreground tabular-nums">
                  -{discount}%
                </span>
              )}

              {product.label && (
                <span className="rounded-sm bg-background/90 px-2 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-foreground backdrop-blur-sm">
                  {product.label}
                </span>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-pressed={saved}
              aria-label={
                saved
                  ? `Remove ${product.name} from wishlist`
                  : `Save ${product.name} to wishlist`
              }
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setSaved((value) => !value);
              }}
              className="pointer-events-auto rounded-full bg-background/80 backdrop-blur-sm transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <Heart
                className={cn(
                  "size-4 transition-colors",
                  saved
                    ? "fill-primary text-primary"
                    : "text-foreground"
                )}
              />
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col pt-3">
          <div className="flex items-center justify-between gap-2">
            {product.category ? (
              <p className="truncate text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {product.category}
              </p>
            ) : (
              <span />
            )}

            {typeof product.rating === "number" && (
              <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground tabular-nums">
                <Star className="size-3.5 fill-primary text-primary" />
                {product.rating.toFixed(1)}

                {typeof product.reviewCount === "number" && (
                  <span className="hidden sm:inline">
                    ({product.reviewCount})
                  </span>
                )}
              </span>
            )}
          </div>

          <h3 className="mt-1.5 text-sm font-medium leading-snug text-foreground transition-colors group-hover/card:text-primary sm:text-base">
            <span className="line-clamp-2">{product.name}</span>
          </h3>

          <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 px-1">
            <span className="text-base font-semibold text-foreground tabular-nums">
              {priceFormatter.format(product.price)}
            </span>

            {product.originalPrice &&
              product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through tabular-nums">
                  {priceFormatter.format(product.originalPrice)}
                </span>
              )}
          </div>
        </div>
      </article>
    </Link>
  );
}