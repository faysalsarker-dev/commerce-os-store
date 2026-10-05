import type { BreadcrumbItemData, ProductDetail } from "@/types/product-detail.type";

const image = (colorId: string, view: number) => `/products/${colorId}-${view}.svg`;

const buildImages = (colorId: string) => [1, 2, 3, 4].map((view) => image(colorId, view));

export const productDetail: ProductDetail = {
  id: "pd-001",
  slug: "patchwork-denim-puffer-jacket",
  name: "Patchwork Denim Puffer Jacket",
  category: { id: "cat-jackets", name: "Jackets" },
  sellingPrice: 4500,
  description:
    "A quilted puffer cut from patchworked panels of rigid cotton denim, each piece washed to a slightly different tone so no two jackets look exactly alike. A lightweight recycled fill keeps it warm without the bulk.\n\nThe silhouette is boxy and slightly cropped, with a stand collar, two-way metal zip, deep hand pockets, and an interior media pocket. Ribbed cuffs keep out the wind on colder mornings.\n\nDesigned to be layered over a hoodie or a simple tee, it softens and fades beautifully with wear.",
  colors: [
    {
      id: "light-blue",
      colorName: "Light Blue",
      colorHex: "#A9C1D9",
      images: buildImages("light-blue"),
      variants: [
        { id: "v-l-s", size: "S", stockQty: 12 },
        { id: "v-l-m", size: "M", stockQty: 3 },
        { id: "v-l-l", size: "L", stockQty: 0 },
        { id: "v-l-xl", size: "XL", stockQty: 8, sellingPriceOverride: 4800 },
        { id: "v-l-xxl", size: "XXL", stockQty: 2, sellingPriceOverride: 4950 },
      ],
    },
    {
      id: "indigo",
      colorName: "Indigo",
      colorHex: "#2E3A63",
      images: buildImages("indigo"),
      variants: [
        { id: "v-i-s", size: "S", stockQty: 0 },
        { id: "v-i-m", size: "M", stockQty: 15 },
        { id: "v-i-l", size: "L", stockQty: 9 },
        { id: "v-i-xl", size: "XL", stockQty: 1 },
        { id: "v-i-xxl", size: "XXL", stockQty: 4, sellingPriceOverride: 4950 },
      ],
    },
    {
      id: "charcoal",
      colorName: "Charcoal",
      colorHex: "#3A3A3C",
      images: buildImages("charcoal"),
      variants: [
        { id: "v-c-s", size: "S", stockQty: 6 },
        { id: "v-c-m", size: "M", stockQty: 10 },
        { id: "v-c-l", size: "L", stockQty: 4 },
        { id: "v-c-xl", size: "XL", stockQty: 0 },
        { id: "v-c-xxl", size: "XXL", stockQty: 0 },
      ],
    },
  ],
};

export const products: ProductDetail[] = [productDetail];

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return products.find((product) => product.slug === slug);
}

export function buildProductBreadcrumb(product: ProductDetail): BreadcrumbItemData[] {
  return [
    { label: "Home", href: "/" },
    { label: product.category?.name ?? "Shop", href: "/#categories" },
    { label: product.name },
  ];
}