import { Title } from "@/components/shared/title";
import { ProductCard, type Product } from "@/components/modules/home/product-card";

const products: Product[] = [
  {
    id: "na-1",
    slug: "oversized-graphic-tee",
    name: "Oversized Graphic Tee",
    category: "Tops",
    price: 1290,
    originalPrice: 1890,
    rating: 4.6,
    reviewCount: 128,
    label: "New",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "na-2",
    slug: "ribbed-knit-dress",
    name: "Ribbed Knit Dress",
    category: "Dresses",
    price: 3490,
    rating: 4.8,
    reviewCount: 64,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "na-3",
    slug: "relaxed-fit-denim",
    name: "Relaxed Fit Denim",
    category: "Denim",
    price: 1790,
    originalPrice: 2290,
    rating: 4.4,
    reviewCount: 212,
    label: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "na-4",
    slug: "essential-hoodie",
    name: "Essential Hoodie",
    category: "Sweatshirts",
    price: 1990,
    rating: 4.7,
    reviewCount: 156,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "na-5",
    slug: "classic-everyday-jacket",
    name: "Classic Everyday Jacket",
    category: "Outerwear",
    price: 2490,
    originalPrice: 3490,
    rating: 4.5,
    reviewCount: 98,
    label: "Sale",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "na-6",
    slug: "minimal-everyday-shirt",
    name: "Minimal Everyday Shirt",
    category: "Shirts",
    price: 1290,
    rating: 4.3,
    reviewCount: 87,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "na-7",
    slug: "structured-leather-tote",
    name: "Structured Leather Tote",
    category: "Accessories",
    price: 4290,
    rating: 4.9,
    reviewCount: 41,
    label: "New",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: "na-8",
    slug: "minimal-white-sneakers",
    name: "Minimal White Sneakers",
    category: "Footwear",
    price: 2790,
    originalPrice: 3190,
    rating: 4.2,
    reviewCount: 173,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85",
  },
];

export function NewArrivals() {
  return (
    <section id="new-arrivals" aria-label="New arrivals" className="mx-auto w-full max-w-7xl ">
      <div className="mb-6 md:mb-8">
        <Title
          title="New arrivals"
          as="h2"
          highlight="arrivals"
          action="highlight"
          className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl"
        />
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-y-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}