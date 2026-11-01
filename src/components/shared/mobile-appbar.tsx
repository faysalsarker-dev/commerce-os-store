"use client";

import { Menu, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/stores/cart-store";
import { siteNavigator } from "@/lib/site";




export function MobileAppbar() {
  const { itemCount } = useCart();

  const navItems = siteNavigator.items

  return (
    <header className="sticky top-0 z-40 grid h-16 grid-cols-3 items-center border-b border-border bg-background/95 px-4 backdrop-blur md:hidden">
      <Sheet>
        <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open navigation menu" />}>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="w-[84%] max-w-sm p-5 shadow-none">
          <SheetHeader className="border-b border-border pb-5 pl-0 text-left">
            <SheetTitle className="text-lg uppercase tracking-[0.22em]">MAX2030</SheetTitle>
          </SheetHeader>
          <nav aria-label="Mobile navigation" className="flex flex-col py-3">
            {navItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex min-h-12 items-center gap-3 border-b border-border py-3 text-base transition-colors hover:text-muted-foreground"
              >
                <Icon aria-hidden="true" className="size-5 text-muted-foreground" />
                {label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <Link href="/" className="justify-self-center text-base font-semibold uppercase tracking-[0.2em]">MAX2030</Link>
      <div className="flex items-center justify-self-end gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Search products"
          render={<Link href="/products" />}
        >
          <Search />
        </Button>
        <Link href="/add-to-card" aria-label={`Cart with ${itemCount} items`} className="relative inline-flex size-8 items-center justify-center rounded-lg hover:bg-muted">
          <ShoppingBag /><span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">{itemCount}</span>
        </Link>
      </div>
    </header>
  );
}
