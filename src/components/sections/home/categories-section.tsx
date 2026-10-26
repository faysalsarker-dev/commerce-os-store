
import { ArrowRight } from "lucide-react";

import { Title } from "@/components/shared/title";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { categories } from "@/data/category.data";
import { cn } from "@/lib/utils";
import CategoryCard from "../../modules/home/category-card";
import Link from "next/link";

interface CategoriesSectionProps {
  className?: string;
}

export function CategoriesSection({ className }: CategoriesSectionProps) {
  if (categories.length === 0) return null;

  return (
    <section
      id="categories"
      aria-label="Shop by category"
      className={cn("mx-auto w-full max-w-7xl", className)}
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Shop the collection
          </p>

          <Title
            title="Shop by category"
            as="h2"
            highlight="category"
            action="underline"
            className="text-2xl font-semibold tracking-tight md:text-3xl"
          />
        </div>

        <Link
          href="/categories"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
        >
          View all
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max  gap-6 px-1 py-2 mb-3 md:mb-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              viewAllHref="/products"
            />
          ))}
        </div>

        <ScrollBar orientation="horizontal" className="h-1.5 mt-5" />
      </ScrollArea>
    </section>
  );
}
