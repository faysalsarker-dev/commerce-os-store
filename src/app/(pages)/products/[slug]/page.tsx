import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ProductDetailClient } from "@/components/modules/product/product-detail";
import { buildProductBreadcrumb, getProductBySlug, products } from "@/data/product.data";
import { CURRENCY_SYMBOL } from "@/lib/formate-price";
import type { ProductDetail } from "@/types/product-detail.type";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const DEFAULT_DESCRIPTION =
  "Shop the Patchwork Denim Puffer Jacket at Forma: quilted recycled fill, patchworked rigid cotton denim and a boxy cropped silhouette in three washed tones.";



export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}


export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const breadcrumb = buildProductBreadcrumb(product);

  return (
    <main id="top">
      
      <div className="mx-auto max-w-[1280px] animate-[fade-in_300ms_ease-out] px-5 pt-6 pb-28 sm:px-8 md:pb-20 lg:px-12">
        <Breadcrumb items={breadcrumb} />

        <ProductDetailClient product={product} />
      </div>
    </main>
  );
}