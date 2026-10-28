"use client";

import { Suspense, useMemo, useCallback, useRef, type FormEvent } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { products, type Product } from "@/data/product.data";
import { ProductCard } from "@/components/modules/home/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/shared/breadcrumb";

const ITEMS_PER_PAGE = 8;

const CATEGORIES = [
  "All",
  "Essentials",
  "Outerwear",
  "Denim",
  "Knitwear",
  "Footwear",
  "Accessories",
  "Layering",
  "Core",
  "Shirts",
  "Bottoms",
] as const;

type SortOption = "featured" | "newest" | "price-asc" | "price-desc" | "rating-desc";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Featured", value: "featured" },
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating-desc" },
];

function ProductsCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL query params
  const currentCategory = searchParams.get("category") || "All";
  const currentSearch = searchParams.get("search") || "";
  const currentSort = (searchParams.get("sort") as SortOption) || "featured";
  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  // Form ref to reset input directly without cascading render effects
  const formRef = useRef<HTMLFormElement>(null);

  // Helper to update query parameters in URL
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (!value || (key === "category" && value === "All") || (key === "sort" && value === "featured") || (key === "page" && value === "1")) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const queryString = params.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(targetUrl, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchVal = (formData.get("search") as string)?.trim() || null;
    updateParams({ search: searchVal, page: "1" });
  };

  const handleClearSearch = () => {
    formRef.current?.reset();
    updateParams({ search: null, page: "1" });
  };

  const handleCategorySelect = (category: string) => {
    updateParams({ category, page: "1" });
  };

  const handleSortChange = (sort: SortOption) => {
    updateParams({ sort, page: "1" });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page.toString() });
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  const handleResetAll = () => {
    formRef.current?.reset();
    router.push(pathname, { scroll: false });
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result: Product[] = [...products];

    // Search query filter
    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.badge.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (currentCategory !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === currentCategory.toLowerCase()
      );
    }

    // Sorting
    switch (currentSort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Put "New Arrival" or "Trending" badges first
        result.sort((a, b) => {
          const aNew = a.badge === "New Arrival" ? 1 : 0;
          const bNew = b.badge === "New Arrival" ? 1 : 0;
          return bNew - aNew;
        });
        break;
      case "featured":
      default:
        // Default order preserves mock curation
        break;
    }

    return result;
  }, [currentSearch, currentCategory, currentSort]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, safePage]);

  const hasActiveFilters = currentCategory !== "All" || currentSearch.trim() !== "" || currentSort !== "featured";

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <section className="border-b border-border bg-muted/20 py-10 sm:py-14">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
            ]}
          />
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                All Products
              </h1>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                Curated essentials, relaxed silhouettes, and tactile textures crafted for modern everyday wear.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-muted px-3 py-1 font-mono text-xs text-foreground">
                {totalItems} {totalItems === 1 ? "Product" : "Products"}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Area */}
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-12">
        {/* Controls: Search, Sort & Clear */}
        <div className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Form */}
          <form
            ref={formRef}
            onSubmit={handleSearchSubmit}
            className="relative flex w-full max-w-md items-center"
          >
            <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
            <Input
              key={currentSearch}
              name="search"
              defaultValue={currentSearch}
              type="text"
              placeholder="Search products by name, style, or tag..."
              className="h-10 w-full pl-9 pr-20 text-sm"
            />
            {currentSearch ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={handleClearSearch}
                className="absolute right-12 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </Button>
            ) : null}
            <Button
              type="submit"
              size="sm"
              variant="secondary"
              className="absolute right-1.5 h-7 px-2.5 text-xs font-medium"
            >
              Search
            </Button>
          </form>

          {/* Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="size-4 text-muted-foreground" />
              <label htmlFor="sort-select" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Sort:
              </label>
              <select
                id="sort-select"
                value={currentSort}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm font-medium text-foreground outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetAll}
                className="h-9 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3.5" />
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-5 scrollbar-none">
          <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground mr-2">
            <SlidersHorizontal className="size-3.5" />
            Category:
          </div>
          {CATEGORIES.map((category) => {
            const isActive = currentCategory.toLowerCase() === category.toLowerCase();
            return (
              <Button
                key={category}
                type="button"
                size="sm"
                variant={isActive ? "default" : "outline"}
                onClick={() => handleCategorySelect(category)}
                className="h-8 rounded-full text-xs font-medium transition-colors"
              >
                {category}
              </Button>
            );
          })}
        </div>

        {/* Active Filter Chips / Status summary */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <span>
              Showing{" "}
              <strong className="text-foreground">
                {totalItems === 0
                  ? 0
                  : `${(safePage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(
                      safePage * ITEMS_PER_PAGE,
                      totalItems
                    )}`}
              </strong>{" "}
              of <strong className="text-foreground">{totalItems}</strong> items
            </span>

            {currentSearch && (
              <Badge className="gap-1 bg-secondary text-foreground">
                Search: &quot;{currentSearch}&quot;
                <button
                  onClick={handleClearSearch}
                  className="ml-1 text-muted-foreground hover:text-foreground"
                  aria-label="Remove search filter"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            )}

            {currentCategory !== "All" && (
              <Badge className="gap-1 bg-secondary text-foreground">
                {currentCategory}
                <button
                  onClick={() => handleCategorySelect("All")}
                  className="ml-1 text-muted-foreground hover:text-foreground"
                  aria-label="Remove category filter"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            )}
          </div>

          <span className="hidden sm:inline-block">
            Page {safePage} of {totalPages}
          </span>
        </div>

        {/* Product Grid or Empty State */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-10">
            {paginatedProducts.map((p) => {
              const cardProduct = {
                id: p.id,
                name: p.name,
                slug: p.slug,
                category: p.category,
                price: p.price,
                originalPrice: p.originalPrice,
                label: p.badge,
                image: p.colors[0]?.images[0] ?? "",
                rating: p.rating,
                reviewCount: p.reviewCount,
              };

              return (
                <ProductCard
                  key={p.id}
                  product={cardProduct}
                  href={`/products/${p.slug}`}
                />
              );
            })}
          </div>
        ) : (
          <div className="my-16 flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
              <Search className="size-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No products found</h3>
            <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
              We couldn&apos;t find any products matching your current search or filter criteria.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Button onClick={handleResetAll} variant="default" size="sm">
                Reset All Filters
              </Button>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <nav
            aria-label="Pagination Navigation"
            className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row"
          >
            <p className="text-xs text-muted-foreground">
              Page <span className="font-medium text-foreground">{safePage}</span> of{" "}
              <span className="font-medium text-foreground">{totalPages}</span>
            </p>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage <= 1}
                className="h-8 gap-1 px-3 text-xs"
              >
                <ChevronLeft className="size-3.5" />
                Previous
              </Button>

              <div className="flex items-center gap-1 px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={pageNum === safePage ? "default" : "ghost"}
                    size="icon-xs"
                    onClick={() => handlePageChange(pageNum)}
                    className="size-8 text-xs font-medium"
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={pageNum === safePage ? "page" : undefined}
                  >
                    {pageNum}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(safePage + 1)}
                disabled={safePage >= totalPages}
                className="h-8 gap-1 px-3 text-xs"
              >
                Next
                <ChevronRight className="size-3.5" />
              </Button>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

function ProductsCatalogFallback() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-muted/20 py-10 sm:py-14">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="mt-4 h-10 w-64 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-96 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="aspect-4/5 w-full animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsCatalogFallback />}>
      <ProductsCatalog />
    </Suspense>
  );
}
