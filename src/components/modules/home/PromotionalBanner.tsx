import Image from "next/image";
import Link from "next/link";

export type PromotionalOffer = {
  image: string;
  alt: string;
  href: string;
  aspectRatio?: "3:1" | "5:2" | "1:1";
};

export type PromotionalBannerProps = {
  offer?: PromotionalOffer;
};

const featuredOffer: PromotionalOffer = {
  image: "https://i.pinimg.com/1200x/9a/30/31/9a30310e8962fe9bed5fd77d96737b12.jpg",
  alt: "30% discount on any product with free delivery",
  href: "/products",
  aspectRatio: "1:1",
};

const aspectRatioClasses: Record<NonNullable<PromotionalOffer["aspectRatio"]>, string> = {
  "3:1": "aspect-[3/1]",
  "5:2": "aspect-[5/2]",
  "1:1": "aspect-square",
};

export function PromotionalBanner({ offer = featuredOffer }: PromotionalBannerProps) {
  const aspectRatio = aspectRatioClasses[offer.aspectRatio ?? "5:2"];

  return (
    <section aria-label="Featured offer" className="w-full border-2 rounded-lg">
      <Link
        href={offer.href}
        aria-label={offer.alt}
        className={`group relative block ${aspectRatio} w-full overflow-hidden rounded-xl bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
      >
        <Image
          src={offer.image}
          alt=""
          fill
          sizes="100vw"
          className=" transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </Link>
    </section>
  );
}
