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
      { name: "Black", hex: "#1a1a1a", images: ["https://i.pinimg.com/1200x/c6/76/a7/c676a702803aa9f79c0d4d2b54a86260.jpg"] },
      { name: "Heather Gray", hex: "#8b8b8b", images: ["https://i.pinimg.com/1200x/e6/97/fb/e697fbe8c53e64980ddc8f9391b79775.jpg"] },
      { name: "Navy", hex: "#24324f", images: ["https://i.pinimg.com/1200x/ed/38/2c/ed382cada59979f8dedb86c4cb23bcd5.jpg"] },
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
      { name: "Black", hex: "#1a1a1a", images: ["https://i.pinimg.com/1200x/ac/03/e4/ac03e4d5d2d8717e450b9d07b4c75f40.jpg"] },
      { name: "Gray", hex: "#858585", images: ["https://i.pinimg.com/1200x/21/9d/cf/219dcf03c141d68bf8bb2d65b0215a92.jpg"] },
      { name: "Navy", hex: "#24324f", images: ["https://i.pinimg.com/1200x/19/e4/49/19e44987fa5207eb9f67bd78085dce85.jpg"] },
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
      { name: "Red", hex: "#dc2626", images: ["https://i.pinimg.com/1200x/31/f6/94/31f694f8955827b3cdfbd08c60dd1384.jpg"] },
      { name: "Gray", hex: "#858585", images: ["https://i.pinimg.com/1200x/d2/b3/e0/d2b3e010ef7c5caf1b6c80c61e15cb9f.jpg"] },
      { name: "Navy", hex: "#24324f", images: ["https://i.pinimg.com/1200x/e4/0e/eb/e40eeb5f0ec323219f5dd680c720c42f.jpg"] },
    ],
  },
  {
    id: "jacket-denim-puffer",
    slug: "patchwork-denim-puffer-jacket",
    name: "Patchwork Denim Puffer Jacket",
    category: "Outerwear",
    description: "Quilted recycled insulation with patchworked rigid cotton denim in a boxy cropped cut.",
    price: 129.99,
    originalPrice: 179.99,
    sellingPrice: 129.99,
    badge: "Trending",
    rating: 4.9,
    reviewCount: 76,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Light Wash", hex: "#8ba7c0", images: ["https://i.pinimg.com/736x/6e/49/eb/6e49eb3cf40c04b05b924dcf1982c4b9.jpg"] },
      { name: "Mid Wash", hex: "#4f6c88", images: ["https://i.pinimg.com/1200x/29/b4/9e/29b49eacc6eb772093e19a1c8e802a57.jpg"] },
      { name: "Dark Wash", hex: "#263d55", images: ["https://i.pinimg.com/1200x/3a/4d/5e/3a4d5e8c8f9b8d8e8c8f9b8d8e8c8f9b.jpg"] },
    ],
  },
  {
    id: "sweater-merino-ribbed",
    slug: "ribbed-merino-wool-sweater",
    name: "Ribbed Merino Wool Sweater",
    category: "Knitwear",
    description: "Superfine merino knit featuring tactile English rib stitches and an easy relaxed drape.",
    price: 89.99,
    originalPrice: 119.99,
    sellingPrice: 89.99,
    badge: "Best Seller",
    rating: 4.8,
    reviewCount: 142,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Cream", hex: "#f0e9d8", images: ["https://i.pinimg.com/736x/09/65/3b/09653b0b61eafb9de1dcdccf180720d1.jpg"] },
      { name: "Green", hex: "#228B22", images: ["https://i.pinimg.com/1200x/7c/52/bc/7c52bca933b61f23257b485d8c4217e4.jpg"] },
      { name: "Navy", hex: "#24324f", images: ["https://i.pinimg.com/1200x/5d/8d/40/5d8d40875c02c01c04e17943375b6039.jpg"] },
    ],
  },
  {
    id: "jeans-relaxed-straight",
    slug: "relaxed-straight-selvedge-jeans",
    name: "Relaxed Straight Selvedge Jeans",
    category: "Denim",
    description: "Heavy 14oz Japanese shuttle-loom selvedge denim in a timeless mid-rise straight silhouette.",
    price: 99.99,
    originalPrice: 139.99,
    sellingPrice: 99.99,
    badge: "Popular",
    rating: 4.7,
    reviewCount: 65,
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Light Blue", hex: "#9bbbd4", images: ["https://i.pinimg.com/736x/74/43/1d/74431d299abfd9113113120015018562.jpg"] },
      { name: "Indigo", hex: "#344c70", images: ["https://i.pinimg.com/1200x/cb/ac/1e/cbac1e29316fa8f83b36df26984d4225.jpg"] },
      { name: "Black", hex: "#252525", images: ["https://i.pinimg.com/736x/32/15/70/32157069681bb2a6cb3175652b27916f.jpg"] },
    ],
  },
  {
    id: "polo-classic",
    slug: "classic-cotton-polo",
    name: "Classic Cotton Polo",
    category: "Essentials",
    description: "A versatile cotton polo shirt with a clean collar and comfortable everyday fit.",
    price: 39.99,
    originalPrice: 54.99,
    sellingPrice: 39.99,
    badge: "Best Seller",
    rating: 4.7,
    reviewCount: 98,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#f5f5f2", images: ["https://i.pinimg.com/1200x/88/82/6e/88826ecd59c400ff528a4aa98e79d2fd.jpg"] },
      { name: "Navy", hex: "#24324f", images: ["https://i.pinimg.com/1200x/0a/42/d5/0a42d5dd4528dceee00e565dc435639e.jpg"] },
      { name: "Olive", hex: "#59624b", images: ["https://i.pinimg.com/736x/c8/6b/d9/c86bd98da5a00a6e1ee5d011deb797e4.jpg"] },
    ],
  },
  {
    id: "shirt-button-down",
    slug: "classic-button-down-shirt",
    name: "Classic Button-Down Shirt",
    category: "Shirts",
    description: "A comfortable button-down shirt with a timeless cut for work or everyday wear.",
    price: 49.99,
    originalPrice: 64.99,
    sellingPrice: 49.99,
    badge: "New Arrival",
    rating: 4.6,
    reviewCount: 53,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#f5f5f2", images: ["https://i.pinimg.com/1200x/ca/85/4f/ca854ff5f6dcf4776346547c0763a81a.jpg"] },
      { name: "Light Blue", hex: "#a9c5dc", images: ["https://i.pinimg.com/1200x/e6/c7/ab/e6c7abb4130397b44381b990c3aecff2.jpg"] },
      { name: "Black", hex: "#1a1a1a", images: ["https://i.pinimg.com/1200x/4a/3f/53/4a3f5303a6dda0d55c440d68bc2d94c9.jpg"] },
    ],
  },
  {
    id: "pants-chino",
    slug: "everyday-chino-pants",
    name: "Everyday Chino Pants",
    category: "Bottoms",
    description: "Easy-wearing cotton chinos with a straight fit, made for everyday outfits.",
    price: 59.99,
    originalPrice: 79.99,
    sellingPrice: 59.99,
    badge: "Popular",
    rating: 4.7,
    reviewCount: 38,
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "Khaki", hex: "#b4a078", images: ["https://i.pinimg.com/1200x/3c/25/f4/3c25f40a1d9bd5f59f9f293dcc3b23d8.jpg"] },
      { name: "Navy", hex: "#24324f", images: ["https://i.pinimg.com/1200x/80/ff/19/80ff198a44b417d1d27538ac5129f2de.jpg"] },
      { name: "Black", hex: "#1a1a1a", images: ["https://i.pinimg.com/736x/6d/f1/3a/6df13a0b5c82092179af8b4dc1d85877.jpg"] },
    ],
  },
  {
    id: "tee-heavyweight-box",
    slug: "heavyweight-boxy-tee",
    name: "Heavyweight Boxy Tee",
    category: "Essentials",
    description: "260 GSM combed organic cotton jersey tee with a dropped shoulder and crisp neckband.",
    price: 34.99,
    originalPrice: 44.99,
    sellingPrice: 34.99,
    badge: "Core",
    rating: 4.7,
    reviewCount: 210,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#f5f5f2", images: ["https://i.pinimg.com/736x/1c/bf/90/1cbf9074db697438d67335987c6d541a.jpg"] },
      { name: "Black", hex: "#1a1a1a", images: ["https://i.pinimg.com/1200x/96/8e/0a/968e0afc12e5ef4e2d56cffa2bb63a60.jpg"] },
      { name: "Navy", hex: "#24324f", images: ["https://i.pinimg.com/1200x/5b/b0/f5/5bb0f543e9e07201c3db121c62d89d80.jpg"] },
      { name: "Olive", hex: "#59624b", images: ["https://i.pinimg.com/1200x/ae/84/42/ae8442cc9b05c9b80e34eb6f49c4e23b.jpg"] },
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
