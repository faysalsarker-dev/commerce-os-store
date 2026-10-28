
import { Title } from "@/components/shared/title";
import { ProductCard } from "../../modules/home/product-card";
import { products } from "@/data/product.data";

export default function FeaturedEdit() {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <section id="featured" aria-label="Featured products" className="mt-16 md:mt-24">
      <div className="mb-6 flex items-end justify-between gap-6 md:mb-8">
        <div className="min-w-0">
          <p className="mb-2 text-[0.7rem] font-medium tracking-[0.25em] text-muted-foreground uppercase">
            Handpicked for you
          </p>
          <Title
            title="Featured products"
            as="h2"
            highlight="products"
            action="underline"
            className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl"
          />
        </div>

      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              category: product.category,
              price: product.price,
              originalPrice: product.originalPrice,
              image: product.colors[0]?.images[0] ?? "",
              label: product.badge,
              rating: product.rating,
              reviewCount: product.reviewCount,
            }}
          />
        ))}
      </div>
    </section>
  );
}