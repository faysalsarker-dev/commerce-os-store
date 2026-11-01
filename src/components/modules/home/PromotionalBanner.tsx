import Image from "next/image";
import Link from "next/link";

type PromotionalOffer = {
  id: string;
  image: string;
  alt: string;
  href: string;
};

const promotionalOffers: PromotionalOffer[] = [
  {
    id: "featured-offer",
    image: "/offer.png",
    alt: "30% discount on any product with free delivery",
    href: "/products",
  },
  {
    id: "charcoal-edit",
    image: "/products/charcoal-1.svg",
    alt: "Charcoal clothing collection",
    href: "/products",
  },
  {
    id: "indigo-edit",
    image: "/products/indigo-1.svg",
    alt: "Indigo clothing collection",
    href: "/products",
  },
];

function PromotionalOfferCard({ offer }: { offer: PromotionalOffer }) {
  return (
    <Link
      href={offer.href}
      aria-label={offer.alt}
      className="group relative block aspect-square overflow-hidden rounded-xl bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Image
        src={offer.image}
        alt=""
        fill
        sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
        className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </Link>
  );
}

export function PromotionalBanner() {
  return (
    <section aria-label="Promotional offers" className="w-full">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {promotionalOffers.map((offer) => (
          <PromotionalOfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}
