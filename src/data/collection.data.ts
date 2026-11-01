import { CollectionBannerData } from "@/components/modules/home/collection-banner-card";

export const collectionBannerSamples: CollectionBannerData[] = [
  {
    id: "type1",
    type: "split",
    eyebrow: "THE EVERYDAY EDIT",
    title: "Made for Everyday.",
    description:
      "Considered pieces, easy layers, and the essentials you’ll reach for again and again.",
    image:
      "https://i.pinimg.com/736x/61/64/b0/6164b0e49f42c29fbe66331b4b34297a.jpg",
    imageAlt: "Model wearing a relaxed everyday shirt",
    ctaLabel: "Explore the edit",
    href: "/collections/everyday-essentials",
    imagePosition: "right",
    imageRatio: "wide",
  },
  {
    id: "type2",
    type: "split",
    eyebrow: "A BETTER KIND OF BASIC",
    title: "The pieces that go with everything.",
    description:
      "Easy-to-wear staples, thoughtfully chosen for your everyday rotation.",
    image:
      "https://i.pinimg.com/736x/6e/e3/81/6ee3812aa28330014353cf146e3cc8fd.jpg",
    imageAlt: "A curated selection of denim essentials",
    imagePosition: "left",
    imageRatio: "square",
    showCta: false,
  },
  {
    id: "type3",
    type: "image-overlay",
    eyebrow: "NEW SEASON",
    title: "A fresh take on everyday.",
    description: "New textures. Familiar comfort. Your next daily uniform.",
    image:
      "https://i.pinimg.com/1200x/6c/5d/aa/6c5daa0c9c0912a63c3c4f63e2b78f94.jpg",
    imageAlt: "New-season essentials styled together",
    ctaLabel: "Shop new arrivals",
    href: "/products",
    textPosition: "left",
    imageRatio: "cinematic",
  },
  {
    id: "type4",
    type: "image-overlay",
    eyebrow: "THE WEEKEND EDIT",
    title: "Off-duty, done well.",
    image:
      "https://i.pinimg.com/736x/72/34/df/7234df3e9610d471e626a778191e7a05.jpg",
    imageAlt: "Relaxed weekend knitwear look",
    ctaLabel: "Discover the edit",
    href: "/products",
    textPosition: "center",
    imageRatio: "cinematic",
  },
  {
    id: "type5",
    type: "image-only",
    eyebrow: "Collection preview",
    title: "Shop the collection",
    image:
      "https://i.pinimg.com/736x/3d/6f/b8/3d6fb8c267294de163a85214321b2206.jpg",
    imageAlt: "Collection preview",
    href: "/products",
    imageRatio: "cinematic",
  },
];