

// "use client";

// import Image from "next/image";
// import Link from "next/link";

// import { cn } from "@/lib/utils";

// export type Product = {
//   id: string | number;
//   name?: string | null;
//   image?: string | null;
//   price?: number | null;
//   slug?: string | null;
//   category?: string | null;
//   label?: string | null;
//   hoverImage?: string | null;
//   originalPrice?: number | null;
//   rating?: number | null;
//   reviewCount?: number | null;
// };

// export type ProductCardProps = {
//   product: Product;
//   href?: string;
//   className?: string;
//   sizes?: string;
//   priority?: boolean;
// };

// const DEFAULT_SIZES =
//   "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw";

// const priceFormatter = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
// });

// const formatPrice = (price?: number | null) =>
//   typeof price === "number" && Number.isFinite(price) && price >= 0
//     ? priceFormatter.format(price)
//     : null;

// const getDiscount = (
//   price?: number | null,
//   originalPrice?: number | null,
// ) => {
//   if (
//     typeof price !== "number" ||
//     typeof originalPrice !== "number" ||
//     !Number.isFinite(price) ||
//     !Number.isFinite(originalPrice) ||
//     price < 0 ||
//     originalPrice <= price
//   ) {
//     return 0;
//   }

//   return Math.round(((originalPrice - price) / originalPrice) * 100);
// };

// export function ProductCard({
//   product,
//   href,
//   className,
//   sizes = DEFAULT_SIZES,
//   priority = false,
// }: ProductCardProps) {
//   const name = product.name?.trim() || "Untitled product";
//   const image = product.image?.trim();
//   const hoverImage = product.hoverImage?.trim();
//   const category = product.category?.trim();
//   const label = product.label?.trim();

//   const price = formatPrice(product.price);
//   const originalPrice = formatPrice(product.originalPrice);
//   const discount = getDiscount(product.price, product.originalPrice);

//   const productHref =
//     href ?? (product.slug?.trim() ? `/products/${product.slug}` : "#");

//   return (
//     <Link
//       href={productHref}
//       aria-label={`View ${name}`}
//       className={cn(
//         "group/card flex min-w-0 flex-col rounded-lg bg-card p-2 outline-none",
//         "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
//         className,
//       )}
//     >
//       <article data-slot="product-card" className="flex h-full min-w-0 flex-col">
//         <div className="relative aspect-4/5 w-full overflow-hidden rounded-md bg-muted">
//           {image ? (
//             <Image
//               src={image}
//               alt={name}
//               fill
//               priority={priority}
//               loading={priority ? undefined : "lazy"}
//               sizes={sizes}
//               className="object-cover"
//             />
//           ) : (
//             <div
//               role="img"
//               aria-label="Product image unavailable"
//               className="absolute inset-0 flex items-center justify-center p-3 text-center text-xs text-muted-foreground"
//             >
//               Image unavailable
//             </div>
//           )}

//           {image && hoverImage && (
//             <Image
//               src={hoverImage}
//               alt=""
//               aria-hidden="true"
//               fill
//               loading="lazy"
//               sizes={sizes}
//               className="hidden object-cover md:block md:opacity-0 md:group-hover/card:opacity-100"
//             />
//           )}

//           {(discount > 0 || label) && (
//             <div className="pointer-events-none absolute inset-x-2 top-2 flex flex-col items-start gap-1.5">
//               {discount > 0 && (
//                 <span className="max-w-full rounded-sm bg-primary px-2 py-1 text-[10px] font-semibold uppercase leading-tight tracking-wide text-primary-foreground tabular-nums sm:text-xs">
//                   -{discount}%
//                 </span>
//               )}

//               {label && (
//                 <span className="max-w-full truncate rounded-sm bg-background/90 px-2 py-1 text-[10px] font-medium uppercase leading-tight tracking-wide text-foreground sm:text-xs">
//                   {label}
//                 </span>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="flex min-w-0 flex-1 flex-col pt-3">
//           {category && (
//             <p className="truncate text-[10px] font-medium uppercase leading-4 tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.15em]">
//               {category}
//             </p>
//           )}

//           <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-card-foreground sm:mt-1.5 sm:text-base">
//             {name}
//           </h3>

//           <div className="mt-2 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
//             {price ? (
//               <span className="text-sm font-semibold leading-5 text-card-foreground tabular-nums sm:text-base">
//                 {price}
//               </span>
//             ) : (
//               <span className="text-sm text-muted-foreground">
//                 Price unavailable
//               </span>
//             )}

//             {originalPrice &&
//               typeof product.price === "number" &&
//               typeof product.originalPrice === "number" &&
//               product.originalPrice > product.price && (
//                 <span className="text-xs leading-5 text-muted-foreground line-through tabular-nums sm:text-sm">
//                   {originalPrice}
//                 </span>
//               )}
//           </div>
//         </div>
//       </article>
//     </Link>
//   );
// }



"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type Product = {
  id: string | number;
  name?: string | null;
  image?: string | null;
  price?: number | null;
  slug?: string | null;
  category?: string | null;
  label?: string | null;
  hoverImage?: string | null;
  originalPrice?: number | null;
  rating?: number | null;
  reviewCount?: number | null;
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

const formatPrice = (price?: number | null) =>
  typeof price === "number" &&
  Number.isFinite(price) &&
  price >= 0
    ? priceFormatter.format(price)
    : null;

const getDiscount = (
  price?: number | null,
  originalPrice?: number | null,
) => {
  if (
    typeof price !== "number" ||
    typeof originalPrice !== "number" ||
    !Number.isFinite(price) ||
    !Number.isFinite(originalPrice) ||
    price < 0 ||
    originalPrice <= price
  ) {
    return 0;
  }

  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

const LABEL_STYLES: Record<string, string> = {
  sale: "bg-primary text-primary-foreground",
  "best selling": "bg-background/95 text-foreground",
  trending: "bg-foreground text-background",
};

const normalizeLabel = (label?: string | null) => {
  const normalized = label?.trim().toLowerCase();

  if (!normalized) return null;

  const labels: Record<string, string> = {
    sale: "Sale",
    offer: "Sale",
    "best selling": "Best Selling",
    "best-seller": "Best Selling",
    bestseller: "Best Selling",
    trend: "Trending",
    trending: "Trending",
  };

  return labels[normalized] ?? null;
};

export function ProductCard({
  product,
  href,
  className,
  sizes = DEFAULT_SIZES,
  priority = false,
}: ProductCardProps) {
  const name = product.name?.trim() || "Untitled product";
  const image = product.image?.trim();
  const category = product.category?.trim();
  const label = normalizeLabel(product.label);

  const price = formatPrice(product.price);
  const originalPrice = formatPrice(product.originalPrice);
  const discount = getDiscount(product.price, product.originalPrice);

  const productHref =
    href ?? (product.slug?.trim() ? `/products/${product.slug}` : "#");

  return (
    <Link
      href={productHref}
      aria-label={`View ${name}`}
      className={cn(
        "group/card flex min-w-0 flex-col rounded-lg bg-card p-2 outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <article
        data-slot="product-card"
        className="flex h-full min-w-0 flex-col"
      >
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-md bg-muted">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              priority={priority}
              loading={priority ? undefined : "lazy"}
              sizes={sizes}
              className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
            />
          ) : (
            <div
              role="img"
              aria-label="Product image unavailable"
              className="absolute inset-0 flex items-center justify-center p-3 text-center text-xs text-muted-foreground"
            >
              Image unavailable
            </div>
          )}

          {(discount > 0 || label) && (
            <div className="pointer-events-none absolute inset-2 flex flex-col items-start gap-1.5">
              {discount > 0 && (
                <span className="inline-flex min-h-6 items-center rounded-sm bg-primary px-2 py-1 text-[10px] font-semibold uppercase leading-none tracking-wide text-primary-foreground tabular-nums sm:text-xs">
                  -{discount}%
                </span>
              )}

              {label && (
                <span
                  className={cn(
                    "inline-flex min-h-6 max-w-full items-center truncate rounded-sm px-2 py-1 text-[10px] font-semibold uppercase leading-none tracking-wide sm:text-xs",
                    LABEL_STYLES[label.toLowerCase()] ??
                      "bg-background/95 text-foreground",
                  )}
                >
                  {label}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col pt-3">
          {category && (
            <p className="truncate text-[10px] font-medium uppercase leading-4 tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.15em]">
              {category}
            </p>
          )}

          <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-card-foreground sm:mt-1.5 sm:text-base">
            {name}
          </h3>

          <div className="mt-2 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
            {price ? (
              <span className="text-sm font-semibold leading-5 text-card-foreground tabular-nums sm:text-base">
                {price}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">
                Price unavailable
              </span>
            )}

            {originalPrice &&
              typeof product.price === "number" &&
              typeof product.originalPrice === "number" &&
              product.originalPrice > product.price && (
                <span className="group-hover:text-primary text-xs leading-5 text-muted-foreground line-through tabular-nums sm:text-sm">
                  {originalPrice}
                </span>
              )}
          </div>
        </div>
      </article>
    </Link>
  );
}
