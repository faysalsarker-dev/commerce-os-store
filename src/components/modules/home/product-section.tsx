import { ArrowRight } from "lucide-react";
import type { ProductSectionProps } from "@/types/nav-item.type";
import { AppLink } from "@/shared/app-link";
import { ProductCard } from "@/shared/product-card";
import { useState } from "react";

export function ProductSection({ title, viewAllHref, products, tabs }: ProductSectionProps) {
  const firstTab = tabs?.[0];
  const [activeTab, setActiveTab] = useState(firstTab?.label);
  const grid = (items: typeof products) => <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-4 md:gap-y-12">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
  return (
    <section id={title.toLowerCase().replaceAll(" ", "-")} className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:py-24 lg:px-12">
      <div className="mb-8 flex items-end justify-between gap-4"><h2 className="text-2xl font-semibold md:text-3xl">{title}</h2><AppLink href={viewAllHref} className="flex shrink-0 items-center gap-2 text-sm font-medium">View all <ArrowRight className="size-4" /></AppLink></div>
      {firstTab && tabs ? <div className="w-full"><div role="tablist" className="mb-8 h-auto rounded-none border-b border-border bg-transparent p-0">{tabs.map((tab) => <button key={tab.label} type="button" role="tab" aria-selected={activeTab === tab.label} onClick={() => setActiveTab(tab.label)} className={`rounded-none border-b-2 px-5 py-3 shadow-none ${activeTab === tab.label ? "border-foreground" : "border-transparent"}`}>{tab.label}</button>)}</div>{grid(tabs.find((tab) => tab.label === activeTab)?.products ?? firstTab.products)}</div> : grid(products)}
    </section>
  );
}
