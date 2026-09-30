import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProductCardProps } from "@/types/nav-item.type";
import { AppImage } from "./app-image";
import { AppLink } from "./app-link";

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const badgeLabel = product.badge === "best-seller" ? "Best Seller" : product.badge === "new" ? "New" : "Sale";
  return (
    <article className="group min-w-0">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <AppLink href={`#${product.slug}`} aria-label={product.name} className="block size-full">
          <AppImage src={product.images[0]} alt={product.name} className="size-full object-cover transition-opacity duration-500 group-hover:opacity-0" loading="lazy" />
          <AppImage src={product.images[1]} alt={`${product.name}, alternate view`} className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" loading="lazy" />
        </AppLink>
        {product.badge && <Badge variant={product.badge === "sale" ? "destructive" : "secondary"} className="absolute left-3 top-3 uppercase">{badgeLabel}</Badge>}
        <Button className="absolute inset-x-3 bottom-3 translate-y-0 transition-all md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100" aria-label={`Add ${product.name} to cart`}><ShoppingBag /> Add to cart</Button>
      </div>
      <div className="pt-3">
        <p className="text-xs uppercase text-muted-foreground">{product.category}</p>
        <AppLink href={`#${product.slug}`} className="mt-1 block truncate text-sm font-medium">{product.name}</AppLink>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          {product.oldPrice && <><span className="text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</span><Badge variant="outline" className="px-1.5 py-0 text-[10px]">-{discount}%</Badge></>}
        </div>
      </div>
    </article>
  );
}
