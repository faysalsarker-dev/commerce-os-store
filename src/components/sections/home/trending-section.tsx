"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame, TrendingUp, Sparkles, ArrowRight, Zap } from "lucide-react";
import { Title } from "@/components/shared/title";
import { ProductCard, type Product } from "@/components/modules/home/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "popular" | "best-rated" | "deals";

interface TrendingProduct extends Product {
  salesCount?: string;
  rank?: number;
  filterTags: FilterTab[];
}

const trendingProducts: TrendingProduct[] = [
  {
    id: "tr-1",
    slug: "oversized-urban-fleece-hoodie",
    name: "Oversized Urban Fleece Hoodie",
    category: "Streetwear",
    price: 1890,
    originalPrice: 2490,
    rating: 4.9,
    reviewCount: 342,
    label: "#1 🔥 Trending",
    salesCount: "2.4k sold this week",
    rank: 1,
    filterTags: ["all", "popular", "best-rated", "deals"],
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "tr-2",
    slug: "vintage-washed-denim-jacket",
    name: "Vintage Washed Denim Jacket",
    category: "Outerwear",
    price: 3290,
    originalPrice: 3990,
    rating: 4.8,
    reviewCount: 218,
    label: "#2 ⚡ Hot Drop",
    salesCount: "1.8k sold",
    rank: 2,
    filterTags: ["all", "popular", "deals"],
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "tr-3",
    slug: "minimalist-leather-retro-sneakers",
    name: "Minimalist Leather Retro Sneakers",
    category: "Footwear",
    price: 3490,
    originalPrice: 4290,
    rating: 4.9,
    reviewCount: 189,
    label: "#3 ⭐ Top Rated",
    salesCount: "1.5k sold",
    rank: 3,
    filterTags: ["all", "popular", "best-rated"],
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "tr-4",
    slug: "tailored-relaxed-fit-blazer",
    name: "Tailored Relaxed Fit Blazer",
    category: "Tailored",
    price: 4590,
    rating: 4.8,
    reviewCount: 145,
    label: "🔥 Selling Fast",
    salesCount: "1.1k sold",
    rank: 4,
    filterTags: ["all", "best-rated"],
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "tr-5",
    slug: "heavyweight-cotton-graphic-tee",
    name: "Heavyweight Cotton Graphic Tee",
    category: "Tops",
    price: 1190,
    originalPrice: 1690,
    rating: 4.7,
    reviewCount: 420,
    label: "⚡ Hot Deal",
    salesCount: "3.1k sold",
    rank: 5,
    filterTags: ["all", "popular", "deals"],
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "tr-6",
    slug: "textured-knit-cardigan",
    name: "Textured Knit Cardigan",
    category: "Knitwear",
    price: 2890,
    rating: 4.9,
    reviewCount: 167,
    label: "⭐ Top Pick",
    salesCount: "950 sold",
    rank: 6,
    filterTags: ["all", "best-rated"],
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "tr-7",
    slug: "utility-cargo-trousers",
    name: "Utility Cargo Trousers",
    category: "Bottoms",
    price: 2390,
    originalPrice: 2990,
    rating: 4.7,
    reviewCount: 280,
    label: "🔥 Popular",
    salesCount: "1.9k sold",
    rank: 7,
    filterTags: ["all", "popular", "deals"],
    image:
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "tr-8",
    slug: "structured-crossbody-bag",
    name: "Structured Crossbody Bag",
    category: "Accessories",
    price: 1990,
    originalPrice: 2590,
    rating: 4.8,
    reviewCount: 112,
    label: "⚡ Trending",
    salesCount: "1.3k sold",
    rank: 8,
    filterTags: ["all", "popular", "deals", "best-rated"],
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=85",
  },
];

const tabs: { id: FilterTab; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Trending", icon: <Flame className="size-3.5 text-amber-500 fill-amber-500" /> },
  { id: "popular", label: "Most Popular", icon: <TrendingUp className="size-3.5 text-blue-500" /> },
  { id: "best-rated", label: "Top Rated", icon: <Sparkles className="size-3.5 text-purple-500" /> },
  { id: "deals", label: "Hot Deals", icon: <Zap className="size-3.5 text-emerald-500" /> },
];

export function TrendingSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredProducts = trendingProducts.filter((product) =>
    product.filterTags.includes(activeTab)
  );

  return (
    <section id="trending" aria-label="Trending products" className="mt-16 md:mt-24">
      {/* Section Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8 md:mb-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2.5">
            <Flame className="size-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>HOT RIGHT NOW</span>
          </div>
          <Title
            title="Trending Products"
            as="h2"
            highlight="Trending"
            action="highlight"
            className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl"
          />
          <p className="mt-1.5 text-sm text-muted-foreground">
            Explore what our community is buying and raving about this week.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-muted/60 p-1.5 backdrop-blur-sm border border-border/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer select-none",
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/40"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-y-12">
        {filteredProducts.map((product) => (
          <div key={product.id} className="relative group/trending">
            <ProductCard product={product} />
            {product.salesCount && (
              <div className="mt-1.5 px-2 flex items-center justify-between text-[0.7rem] text-muted-foreground">
                <span className="inline-flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400">
                  <Flame className="size-3 fill-amber-500" />
                  {product.salesCount}
                </span>
                <span className="font-semibold text-foreground/70">
                  Rank #{product.rank}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg" className="rounded-full px-8 gap-2 font-medium hover:bg-accent transition-all">
          <Link href="/products">
            View All Trending Items
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
