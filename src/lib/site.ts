import { House, ShoppingBasket, Tags } from "lucide-react";
import type { NavItem } from "@/types/nav-item.type";

export const SITE_NAME = "POS Inventory";

export const siteNavigator: { items: NavItem[] } = {
  items: [
    { label: "Home", href: "/", icon: House },
    { label: "Shop", href: "/products", icon: ShoppingBasket },
    { label: "Categories", href: "/categories", icon: Tags },
  ],
};