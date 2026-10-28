import type { Category } from "@/types/category.type";

export const categories: Category[] = [
   {
    id: "cat-shirts",
    slug: "shirts",
    title: "Shirts",
    image: "https://i.pinimg.com/736x/61/64/b0/6164b0e49f42c29fbe66331b4b34297a.jpg",
  },

  {
    id: "cat-denim",
    slug: "denim",
    title: "Denim",
    image: "https://i.pinimg.com/736x/6e/e3/81/6ee3812aa28330014353cf146e3cc8fd.jpg",
  },
    {
    id: "cat-layering",
    slug: "layering",
    title: "Layering",
    image: "https://i.pinimg.com/736x/0d/3d/9e/0d3d9ee6a1826ade69aca0543dbcf092.jpg",
  },
  {
    id: "cat-essentials",
    slug: "essentials",
    title: "Essentials",
    image: "https://i.pinimg.com/1200x/6c/5d/aa/6c5daa0c9c0912a63c3c4f63e2b78f94.jpg",
  },
   {
    id: "cat-knitwear",
    slug: "knitwear",
    title: "Knitwear",
    image: "https://i.pinimg.com/736x/72/34/df/7234df3e9610d471e626a778191e7a05.jpg",
  },
 
  {
    id: "cat-bottoms",
    slug: "bottoms",
    title: "Bottoms",
    image: "https://i.pinimg.com/736x/3d/6f/b8/3d6fb8c267294de163a85214321b2206.jpg",
  },
  {
    id: "cat-core",
    slug: "core",
    title: "Core",
    image: "https://i.pinimg.com/736x/39/23/0e/39230ec1522182b1cfa888d19eaa5509.jpg",
  },
   {
    id: "cat-outerwear",
    slug: "outerwear",
    title: "Outerwear",
    image: "https://i.pinimg.com/1200x/26/5a/7a/265a7add90f5682fc56ad7ccb656fd01.jpg",
  },
 
 
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
