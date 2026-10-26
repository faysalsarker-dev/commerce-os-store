
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Title } from "@/components/shared/title";
import { categories } from "@/data/category.data";
import { cn } from "@/lib/utils";

import Image from "next/image";

export const metadata: Metadata = {
  title: "All Categories",
  description: "Explore all clothing categories and find your style.",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link
          href="/"
          className="mb-2 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      <div className="relative h-50 w-full rounded-lg my-3">
        <Image src="/categories-banner.png" alt="Category Banner" fill className="object-cover rounded-lg" />
      </div>


      <div className="mb-8 mt-2">
        

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Explore the collection
            </p>

            <Title
              title="All categories"
              as="h1"
              highlight="categories"
              action="underline"
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            />

            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
              Browse our collections and discover something you&apos;ll love.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"}
          </p>
        </div>
      </div>

      {categories.length > 0 ? (
        <div
          className={cn(
            "grid grid-cols-2 gap-x-4 gap-y-8",
            "sm:grid-cols-3 sm:gap-x-5",
            "lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10",
            "xl:grid-cols-5",
          )}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${encodeURIComponent(category.slug)}`}
              aria-label={`Shop ${category.title}`}
              className="group min-w-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 20vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <h2 className="min-w-0 truncate text-sm font-medium transition-colors group-hover:text-muted-foreground sm:text-base">
                  {category.title}
                </h2>

                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-20 text-center">
          <h2 className="text-lg font-medium">No categories yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back later to explore our collections.
          </p>
        </div>
      )}
    </div>
  );
}
