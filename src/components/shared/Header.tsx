"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/stores/cart-store";
import { siteNavigator } from "@/lib/site";



export function Header() {
  const { itemCount } = useCart();
const navItems = siteNavigator.items
  return (
    <header className="sticky top-0 z-40 hidden h-18 border-b border-border bg-card backdrop-blur md:block">
      <div className="mx-auto grid h-full max-w-360 grid-cols-[1fr_auto_1fr] items-center px-8 lg:px-12">
        <Link href="/" className="justify-self-start text-xl font-semibold uppercase tracking-[0.22em]">MAX2030</Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-7">
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-self-end gap-1">
          <Link href="/add-to-card" aria-label={`Cart with ${itemCount} items`} className="relative inline-flex size-8 items-center justify-center rounded-lg hover:bg-muted">
            <ShoppingBag />
            <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">{itemCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
