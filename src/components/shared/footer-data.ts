export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export const companyInfo = {
  name: "Storefront",
  tagline: "Modern e-commerce experience",
  email: "hello@storefront.com",
  phone: "+1 (555) 123-4567",
  address: "123 Commerce Street, San Francisco, CA 94105",
};

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "All Products", href: "/products" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: "facebook",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: "twitter",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: "instagram",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: "youtube",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: "tiktok",
  },
];

export const newsletterText = {
  title: "Stay in the loop",
  description: "Subscribe to receive updates, exclusive offers, and more.",
};
