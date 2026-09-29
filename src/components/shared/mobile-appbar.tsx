import { Menu, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MobileAppbarProps } from "@/types/nav-item.type";
import { AppLink } from "./app-link";

export function MobileAppbar({ logoText, navItems, cartCount }: MobileAppbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur md:hidden">
      <Sheet>
        <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu"/>}><Menu /></SheetTrigger>
        <SheetContent side="left" className="w-[84%] p-6 shadow-none">
          <SheetHeader className="border-b border-border pb-6 text-left"><SheetTitle className="text-lg uppercase tracking-[0.22em]">{logoText}</SheetTitle></SheetHeader>
          <nav aria-label="Mobile navigation" className="flex flex-col py-5">
            {navItems.map((item) => <AppLink key={item.label} href={item.href} className="border-b border-border py-4 text-base">{item.label}</AppLink>)}
          </nav>
        </SheetContent>
      </Sheet>
      <AppLink href="#top" className="absolute left-1/2 -translate-x-1/2 text-base font-semibold uppercase tracking-[0.2em]">{logoText}</AppLink>
      <div className="flex items-center gap-0.5">
        <Button variant="ghost" size="icon" aria-label="Search"><Search /></Button>
        <Button variant="ghost" size="icon" aria-label={`Cart with ${cartCount} items`} className="relative">
          <ShoppingBag /><span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">{cartCount}</span>
        </Button>
      </div>
    </header>
  );
}
