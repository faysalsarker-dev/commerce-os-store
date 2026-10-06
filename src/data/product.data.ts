export type ProductColor = {
  name: string;
  hex: string;
  images: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  sellingPrice: number;
  badge: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: ProductColor[];
};

const image = (photoId: string, width = 1200, height = 1500) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;

export const products: Product[] = [
  {
    id: "hoodie-essential",
    slug: "essential-oversized-hoodie",
    name: "Essential Oversized Hoodie",
    category: "Essentials",
    description:
      "Premium heavyweight cotton hoodie with an oversized fit for ultimate comfort and modern style.",
    price: 59.99,
    originalPrice: 89.99,
    sellingPrice: 59.99,
    badge: "New Arrival",
    rating: 4.8,
    reviewCount: 128,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      {
        name: "Charcoal Gray",
        hex: "#4b4b4f",
        images: [
          image("1521572267360-ee0c2909d518"),
          image("1503341504253-dff4815485f1"),
          image("1521572163474-6864f9cf17ab"),
          image("1542272604-787c3835535d"),
        ],
      },
      {
        name: "Stone",
        hex: "#d9d4ce",
        images: [
          image("1521572163474-6864f9cf17ab"),
          image("1556821840-3a63f95609a7"),
          image("1549298916-b41d501d3772"),
          image("1584917865442-de89df76afd3"),
        ],
      },
      {
        name: "Midnight",
        hex: "#1a1c20",
        images: [
          image("1603252109303-2751441dd157"),
          image("1591047139829-d91aecb6caea"),
          image("1542272604-787c3835535d"),
          image("1556821840-3a63f95609a7"),
        ],
      },
    ],
  },
  {
    id: "hoodie-minimal",
    slug: "minimal-hoodie",
    name: "Minimal Hoodie",
    category: "Essentials",
    description: "A clean, premium essential in a relaxed silhouette built for day-to-day comfort.",
    price: 54.99,
    originalPrice: 74.99,
    sellingPrice: 54.99,
    badge: "Best Seller",
    rating: 4.7,
    reviewCount: 94,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Soft Taupe",
        hex: "#d7d0c5",
        images: [
          image("1503341504253-dff4815485f1"),
          image("1521572267360-ee0c2909d518"),
          image("1549298916-b41d501d3772"),
          image("1556821840-3a63f95609a7"),
        ],
      },
    ],
  },
  {
    id: "sweatshirt-classic",
    slug: "classic-sweatshirt",
    name: "Classic Sweatshirt",
    category: "Core",
    description: "Heavyweight fleece sweatshirt with a structured fit and soft brushed inside.",
    price: 49.99,
    originalPrice: 69.99,
    sellingPrice: 49.99,
    badge: "Trending",
    rating: 4.6,
    reviewCount: 87,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      {
        name: "Dark Coffee",
        hex: "#2d2b2a",
        images: [
          image("1556821840-3a63f95609a7"),
          image("1591047139829-d91aecb6caea"),
          image("1603252109303-2751441dd157"),
          image("1521572163474-6864f9cf17ab"),
        ],
      },
    ],
  },
  {
    id: "hoodie-zip-up",
    slug: "zip-up-hoodie",
    name: "Zip Up Hoodie",
    category: "Layering",
    description: "A functional zip-up hoodie with premium drape and comfortable everyday warmth.",
    price: 64.99,
    originalPrice: 94.99,
    sellingPrice: 64.99,
    badge: "Limited Drop",
    rating: 4.9,
    reviewCount: 112,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      {
        name: "Onyx Black",
        hex: "#121212",
        images: [
          image("1542272604-787c3835535d"),
          image("1584917865442-de89df76afd3"),
          image("1521572267360-ee0c2909d518"),
          image("1503341504253-dff4815485f1"),
        ],
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function buildProductBreadcrumb(product: Product) {
  return [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/products" },
    { label: product.name, href: `/products/${product.slug}` },
  ];
}
