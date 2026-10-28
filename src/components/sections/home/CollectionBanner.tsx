
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type CollectionBannerProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  href?: string;
  ctaLabel?: string;
  className?: string;
};

export function CollectionBanner({
  eyebrow = "THE COLLECTION",
  title = "Everyday essentials, elevated.",
  description = "Discover timeless styles, considered details, and versatile pieces made for everyday wear.",
  image = "/images/collection-banner.jpg",
  imageAlt = "Latest menswear collection",
  href = "/collections",
  ctaLabel = "Explore Collection",
  className,
}: CollectionBannerProps) {
  return (
    <section
      aria-labelledby="collection-banner-title"
      className={cn(
        "mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12",
        className,
      )}
    >
      <div className="grid overflow-hidden rounded-xl bg-card md:grid-cols-2">
        <div className="flex flex-col items-start justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          {eyebrow && (
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-sm">
              {eyebrow}
            </p>
          )}

          <h2
            id="collection-banner-title"
            className="mt-3 max-w-md text-2xl font-semibold leading-tight tracking-tight text-card-foreground sm:text-3xl lg:text-4xl"
          >
            {title}
          </h2>

          {description && (
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              {description}
            </p>
          )}

          {href && ctaLabel && (
            <Link
              href={href}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {ctaLabel}
            </Link>
          )}
        </div>

        <div className="relative aspect-[4/3] min-w-0 bg-muted md:aspect-auto md:min-h-[340px] lg:min-h-[400px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
