import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { Header } from "@/components/shared/Header";
import { MobileAppbar } from "@/components/shared/mobile-appbar";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Considered clothing, made in small runs`,
    template: `%s`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};





import type { NavItem } from "@/types/nav-item.type";
import { Footer } from "@/components/shared/footer";

export const navItems: NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "Shop", href: "#featured" },
  { label: "Categories", href: "#categories" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Track Order", href: "#footer" },
];





export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
   
      <body className="min-h-full flex flex-col">
        
        
           <Header logoText="Forma" navItems={navItems} cartCount={2} />
      <MobileAppbar logoText="Forma" navItems={navItems} cartCount={2} />
        {children}
        
        <Footer/></body>
      
    </html>
  );
}
