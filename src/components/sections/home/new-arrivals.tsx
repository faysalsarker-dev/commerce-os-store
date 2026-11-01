import { Title } from "@/components/shared/title";
import { ProductCard, type Product } from "@/components/modules/home/product-card";
import { products as productData } from "@/data/product.data";

export function NewArrivals() {
  const newArrivals: Product[] = productData
    .filter((product) => product.badge === "New Arrival")
    .map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      reviewCount: product.reviewCount,
      label: product.badge,
      image: product.colors[0]?.images[0] ?? "",
      colors: product.colors,
    }));

  return (
    <section id="new-arrivals" aria-label="New arrivals" className="mx-auto w-full max-w-7xl ">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                  Explore the collection
                </p>
    
                <Title
                  title="New Arrivals"
                  as="h1"
                  highlight="Arrivals"
                  action="underline"
                  className="text-3xl font-semibold tracking-tight sm:text-4xl"
                />
    
                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                  Discover the latest additions to our collection, featuring fresh styles 
                </p>
              </div>
    
              
            </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-y-12">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}