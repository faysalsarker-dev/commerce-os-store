import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BreadcrumbItemData } from "@/types/product-detail.type";

type BreadcrumbProps = {
  items: BreadcrumbItemData[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1">
              {item.href && !isLast ? (
                <Link href={item.href} className="truncate transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={cn("truncate", isLast && "text-foreground")}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight aria-hidden className="size-3.5 shrink-0 opacity-60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}