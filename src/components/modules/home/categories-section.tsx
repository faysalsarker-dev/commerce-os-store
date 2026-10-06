import { Title } from "@/components/shared/title";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { categories as defaultCategories } from "@/data/category.data";
import type { CategoriesSectionProps } from "@/types/category.type";
import { cn } from "@/lib/utils";
import CategoryCard from "./category-card";

export function CategoriesSection({
  eyebrow = "Shop the collection",
  title = "Shop by category",
  viewAllHref = "/products",
  categories = defaultCategories,
  className,
}: CategoriesSectionProps) {
  if (categories.length === 0) return null;

  return (
    <section
      id="categories"
      aria-label={title}
      className={cn("mx-auto w-full max-w-7xl", className)}
    >
      <div className="mb-5">
        <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          {eyebrow}
        </p>
        <Title
          title={title}
          as="h2"
          highlight="category"
          action="underline"
          className="text-2xl font-semibold tracking-tight md:text-3xl"
        />
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-4 px-1 py-2">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              viewAllHref={viewAllHref}
            />
          ))}
        </div>
        <div className="flex gap-4 px-1 py-2">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              viewAllHref={viewAllHref}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
    </section>
  );
}
