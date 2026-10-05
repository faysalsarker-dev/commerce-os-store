import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";

export type NavItem = { label: string; href: string };

export type AppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;
export type AppImageProps = ImgHTMLAttributes<HTMLImageElement>;
export type HeaderProps = { logoText: string; navItems: NavItem[]; cartCount: number };
export type MobileAppbarProps = HeaderProps;
export type FooterProps = { logoText: string };

export type ProductCardItem = {
  id: string | number;
  name: string;
  image: string;
  price: number;
  slug?: string;
  category?: string;
  label?: string;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
};

export type ProductTab = { label: string; products: ProductCardItem[] };
export type ProductSectionProps = {
  title: string;
  viewAllHref: string;
  products: ProductCardItem[];
  tabs?: ProductTab[];
};

export type PromoBannerItem = {
  image: string;
  title: string;
  subtitle?: string;
  couponCode?: string;
  ctaLabel: string;
  ctaLink: string;
};

export type PromoBannerProps = { banner: PromoBannerItem };

export type PromoPopupItem = {
  isActive: boolean;
  title: string;
  description: string;
  couponCode?: string;
  ctaLabel: string;
  ctaLink: string;
  image?: string;
};

export type PromoPopupProps = { popup: PromoPopupItem };
