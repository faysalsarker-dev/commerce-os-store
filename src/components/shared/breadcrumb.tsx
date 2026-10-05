import { ChevronRight } from "lucide-react";
import { AppLink } from "@/components/shared/app-link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <AppLink href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </AppLink>
            ) : (
              <span className={isLast ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
            )}
            {!isLast && <ChevronRight className="size-3.5" />}
          </div>
        );
      })}
    </nav>
  );
}
