import { ProductGallerySkeleton } from "@/components/modules/product/product-gallery-skeleton";
import { ProductInfoSkeleton } from "@/components/modules/product/product-info-skeleton";
import { Skeleton } from "@/components/ui/skeleton";


export default function ProductDetailLoading() {
  return (
    <main id="top">
      <div className="mx-auto max-w-[1280px] px-5 pt-6 pb-28 sm:px-8 md:pb-20 lg:px-12">
        <Skeleton className="h-4 w-64 max-w-full" />
        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <ProductGallerySkeleton />
          <div className="md:sticky md:top-24 md:self-start"><ProductInfoSkeleton /></div>
        </div>
      </div>
    </main>
  );
}
