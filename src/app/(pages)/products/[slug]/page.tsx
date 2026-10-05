import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ProductDetailClient } from "@/components/modules/product/product-detail";
import { buildProductBreadcrumb, getProductBySlug, products } from "@/data/product.data";
import { CURRENCY_SYMBOL } from "@/lib/formate-price";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { ProductDetail } from "@/types/product-detail.type";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const DEFAULT_DESCRIPTION =
  "Shop the Patchwork Denim Puffer Jacket at Forma: quilted recycled fill, patchworked rigid cotton denim and a boxy cropped silhouette in three washed tones.";

function clampDescription(description?: string): string {
  const text = (description ?? "").replace(/\s+/g, " ").trim();
  if (!text) return DEFAULT_DESCRIPTION;
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}...` : text;
}

function buildProductJsonLd(product: ProductDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: clampDescription(product.description),
    sku: product.id,
    image: product.colors.flatMap((color) => color.images),
    brand: { "@type": "Brand", name: SITE_NAME },
    category: product.category?.name,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: CURRENCY_SYMBOL,
      lowPrice: product.sellingPrice,
      highPrice: Math.max(
        product.sellingPrice,
        ...product.colors.flatMap((color) => color.variants.map((variant) => variant.sellingPriceOverride ?? product.sellingPrice))
      ),
      availability: product.colors.some((color) => color.variants.some((variant) => variant.stockQty > 0))
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      offerCount: product.colors.reduce((total, color) => total + color.variants.length, 0),
    },
  };
}

function buildBreadcrumbJsonLd(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  const description = clampDescription(product.description);
  const title = `${product.name} — ${SITE_NAME}`;
  const url = `/products/${product.slug}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url,
      title,
      description,
      images: [{ url: product.colors[0]?.images[0], width: 800, height: 1000, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.colors[0]?.images[0]].filter(Boolean) as string[],
    },
    other: {
      "product:price:amount": product.sellingPrice.toString(),
      "product:price:currency": CURRENCY_SYMBOL,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const breadcrumb = buildProductBreadcrumb(product);

  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProductJsonLd(product)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumb)) }} />

      <div className="mx-auto max-w-[1280px] animate-[fade-in_300ms_ease-out] px-5 pt-6 pb-28 sm:px-8 md:pb-20 lg:px-12">
        <Breadcrumb items={breadcrumb} />

        <ProductDetailClient product={product} />
      </div>
    </main>
  );
}