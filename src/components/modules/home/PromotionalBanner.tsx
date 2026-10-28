import {
  PromotionalImageBanner,
  type PromotionalImageBannerProps,
} from "@/components/modules/home/promotional-image-banner";

const promotionalBanners: Array<
  PromotionalImageBannerProps & { id: string }
> = [
  {
    id: "featured-offer",
    image: "/offer.png",
    alt: "30% discount on any product with free delivery",
    href: "/products",
    layout: "full",
  },
  {
    id: "charcoal-edit",
    image: "/products/charcoal-1.svg",
    alt: "Charcoal collection",
    href: "/products",
    layout: "half",
  },
  {
    id: "indigo-edit",
    image: "/products/indigo-1.svg",
    alt: "Indigo collection",
    href: "/products",
    layout: "half",
  },
];

export function PromotionalBanner() {
  return (
    <section aria-label="Special offers" className="w-full">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {promotionalBanners.map(({ id, ...banner }) => (
          <PromotionalImageBanner key={id} {...banner} />
        ))}
      </div>
    </section>
  );
}