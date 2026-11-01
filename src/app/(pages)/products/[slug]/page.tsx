import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ProductDetailClient } from "@/components/modules/product/product-detail";
import { buildProductBreadcrumb, getProductBySlug, products } from "@/data/product.data";


type ProductPageProps = {
  params: Promise<{ slug: string }>;
};




export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}


export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const breadcrumb = buildProductBreadcrumb(product);

  return (
    <>
      
      <div className="mx-auto max-w-full px-5 pt-6 pb-28 sm:px-8 md:pb-20 lg:px-12">
        <Breadcrumb items={breadcrumb} />

        <ProductDetailClient product={product} />
      </div>
    </>
  );
}