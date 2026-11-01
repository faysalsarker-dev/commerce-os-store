
import { ArrowRight } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { categories } from "@/data/category.data";
import CategoryCard from "../../modules/home/category-card";
import Link from "next/link";
import HeadLine from "@/components/ui/head-line";



export function CategoriesSection() {
  if (categories.length === 0) return null;

  return (
    <section
      id="categories"
      aria-label="Shop by category"
      className="w-full pt-10"
    >
      <div className="mb-5 flex items-end justify-between gap-4">
<HeadLine
    title="Shop by category"
            as="h2"
            highlight="category"
            action="underline"
            className="text-2xl font-semibold tracking-tight md:text-3xl"
            firstMessage="Shop the collection"

/>


    

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
