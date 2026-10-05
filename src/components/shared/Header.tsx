import { Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeaderProps } from "@/types/nav-item.type";
import { AppLink } from "./app-link";

export function Header({ logoText, navItems, cartCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 hidden h-18 border-b border-border bg-background/95 backdrop-blur md:block">
      <div className="mx-auto grid h-full max-w-360 grid-cols-[1fr_auto_1fr] items-center px-8 lg:px-12">
        <AppLink href="#top" className="justify-self-start text-xl font-semibold uppercase tracking-[0.22em]">{logoText}</AppLink>
        <nav aria-label="Primary navigation" className="flex items-center gap-7">
          {navItems.map((item) => <AppLink key={item.label} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item.label}</AppLink>)}
        </nav>
        <div className="flex items-center justify-self-end gap-1">
          <Button variant="ghost" size="icon" aria-label="Search"><Search /></Button>
          <Button variant="ghost" size="icon" aria-label={`Cart with ${cartCount} items`} className="relative">
            <ShoppingBag />
            <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">{cartCount}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
