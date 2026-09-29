export type NavItem = { label: string; href: string };

import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
// import type { Announcement } from "./announcement.type";
// import type { Category } from "./category.type";
// import type { HeroSlide } from "./hero-slide.type";
// import type { Product } from "./product.type";
// import type { PromoBanner } from "./promo-banner.type";
// import type { PromoPopup } from "./promo-popup.type";

export type AppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;
export type AppImageProps = ImgHTMLAttributes<HTMLImageElement>;
export type HeaderProps = { logoText: string; navItems: NavItem[]; cartCount: number };
export type MobileAppbarProps = HeaderProps;
export type FooterProps = { logoText: string };
// export type ProductCardProps = { product: Product };
// export type PromoPopupProps = { popup: PromoPopup };
// export type MarqueeBarProps = { items: Announcement[] };
// export type HeroCarouselProps = { slides: HeroSlide[] };
// export type CategoriesSectionProps = { title: string; categories: Category[] };
// export type ProductTab = { label: string; products: Product[] };
// export type ProductSectionProps = { title: string; viewAllHref: string; products: Product[]; tabs?: ProductTab[] };
// export type PromoBannerProps = { banner: PromoBanner };
