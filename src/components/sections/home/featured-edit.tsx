
import { Title } from "@/components/shared/title";
import { ProductCard } from "../../modules/home/product-card";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  label?: string;
};

const products: Product[] = [

  {
    id: 2,
    name: "Everyday Cotton Tee",
    category: "Everyday Essentials",
    price: 890,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 3,
    name: "Essential Hoodie",
    category: "Comfort Collection",
    price: 1990,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 4,
    name: "Classic Everyday Jacket",
    category: "Modern Classics",
    price: 2490,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1100&q=85",
  },
  {
    id: 5,
    name: "Relaxed Fit Denim",
    category: "Daily Wear",
    price: 1790,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 6,
    name: "Minimal Everyday Shirt",
    category: "Modern Classics",
    price: 1290,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=85",
  },
];






export default function FeaturedEdit() {
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
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}