import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ProductDetailClient } from "@/components/modules/product/product-detail";
import { buildProductBreadcrumb, getProductBySlug, products } from "@/data/product.data";
import { CURRENCY_SYMBOL } from "@/lib/formate-price";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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
    <div>
     

      <div className="mx-auto max-w-7xl animate-[fade-in_300ms_ease-out] px-5 pt-6 pb-28 sm:px-8 md:pb-20 lg:px-12">
        <Breadcrumb items={breadcrumb} />

        <ProductDetailClient product={product} />
      </div>
    </div>
  );
}