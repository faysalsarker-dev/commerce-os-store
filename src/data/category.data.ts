import type { Category } from "@/types/category.type";

const image = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&h=1067&q=70`;

export const categories: Category[] = [
  {
    id: "cat-women",
    slug: "women",
    title: "Women",
    image: image("1769183960105-e8bf22c65c10"),
  },
  {
    id: "cat-men",
    slug: "men",
    title: "Men",
    image: image("1675442141177-b99b70652416"),
  },
  {
    id: "cat-outerwear",
    slug: "outerwear",
    title: "Outerwear",
    image: image("1648489732771-f46eb9d8d95a"),
  },
  {
    id: "cat-denim",
    slug: "denim",
    title: "Denim",
    image: image("1753877439268-6263fc86fdf2"),
  },
  {
    id: "cat-knitwear",
    slug: "knitwear",
    title: "Knitwear",
    image: image("1765337210325-768dafc12989"),
  },
  {
    id: "cat-dresses",
    slug: "dresses",
    title: "Dresses",
    image: image("1634463052781-11027eac90c8"),
  },
  {
    id: "cat-footwear",
    slug: "footwear",
    title: "Footwear",
    image: image("1599141793311-710f09cc58ee"),
  },
  {
    id: "cat-accessories",
    slug: "accessories",
    title: "Accessories",
    image: image("1758879219613-1e161ce3b369"),
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
