import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type CollectionBannerImageRatio = "wide" | "cinematic" | "square";
export type CollectionBannerImagePosition = "left" | "right";
export type CollectionBannerTextPosition = "left" | "center" | "right";

type CollectionBannerBase = {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  image: string;
  imageAlt: string;
  ctaLabel?: string;
  href?: string;
};

export type CollectionBannerData =
  | (CollectionBannerBase & {
      type: "split";
      imagePosition?: CollectionBannerImagePosition;
      imageRatio?: CollectionBannerImageRatio;
      showCta?: boolean;
    })
  | (CollectionBannerBase & {
      type: "image-overlay";
      textPosition?: CollectionBannerTextPosition;
      imageRatio?: CollectionBannerImageRatio;
      showCta?: boolean;
    })
  | (CollectionBannerBase & {
      type: "image-only";
      imageRatio?: CollectionBannerImageRatio;
    });

const imageRatioClasses: Record<CollectionBannerImageRatio, string> = {
  wide: "aspect-[4/3] sm:aspect-[16/10]",
  cinematic: "aspect-[5/4] sm:aspect-[16/7]",
  square: "aspect-square",
};

function CollectionBannerImage({
  banner,
  sizes,
}: {
  banner: CollectionBannerData;
  sizes: string;
}) {
  return (
    <Image
      src={banner.image}
      alt={banner.imageAlt}
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
    />
  );
}

function CollectionBannerCopy({
  banner,
  titleId,
  overlay = false,
  textPosition = "left",
  showCta = true,
  className,
}: {
  banner: CollectionBannerData;
  titleId: string;
  overlay?: boolean;
  textPosition?: CollectionBannerTextPosition;
  showCta?: boolean;
  className?: string;
}) {
  const hasCopy = Boolean(
    banner.eyebrow ||
      banner.title ||
      banner.description ||
      (showCta && banner.ctaLabel && banner.href),
  );

  if (!hasCopy) return null;

  return (
    <div
      className={cn(
        "flex flex-col items-start",
        !overlay && "h-full justify-center p-6 sm:p-10 lg:p-14",
        overlay && "relative z-10 p-6 text-white sm:p-10 lg:p-14",
        overlay && textPosition === "center" && "items-center text-center",
        overlay && textPosition === "right" && "items-end text-right",
        className,
      )}
    >
      {banner.eyebrow && (
        <p
          className={cn(
            "mb-5 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] sm:text-xs",
            overlay ? "text-white/80" : "text-muted-foreground",
          )}
        >
          {!overlay && (
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-primary"
            />
          )}
          {banner.eyebrow}
        </p>
      )}

      {banner.title && (
        <h2
          id={titleId}
          className={cn(
            "max-w-xl text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-6xl",
            overlay ? "text-white" : "text-card-foreground",
          )}
        >
          {banner.title}
        </h2>
      )}

      {banner.description && (
        <p
          className={cn(
            "mt-5 max-w-md text-sm leading-7 sm:text-base",
            overlay ? "text-white/85" : "text-muted-foreground",
          )}
        >
          {banner.description}
        </p>
      )}

      {showCta && banner.ctaLabel && banner.href && (
        <Link
          href={banner.href}
          className={cn(
            "group/cta mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-medium transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            overlay
              ? "bg-white text-black hover:bg-white/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          {banner.ctaLabel}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}

function SplitCollectionBannerCard({
  banner,
}: {
  banner: Extract<CollectionBannerData, { type: "split" }>;
}) {
  const titleId = useId();
  const imagePosition = banner.imagePosition ?? "right";
  const imageRatio = banner.imageRatio ?? "wide";

  return (
    <article
      aria-labelledby={banner.title ? titleId : undefined}
      aria-label={banner.title ? undefined : banner.eyebrow || banner.imageAlt}
      className="group grid overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm lg:grid-cols-2"
    >
      <CollectionBannerCopy
        banner={banner}
        titleId={titleId}
        showCta={banner.showCta}
        className={imagePosition === "left" ? "lg:order-2" : undefined}
      />
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          imageRatioClasses[imageRatio],
          "lg:aspect-auto lg:min-h-105",
          imagePosition === "left" && "lg:order-1",
        )}
      >
        <CollectionBannerImage
          banner={banner}
          sizes="(max-width: 1023px) 100vw, 50vw"
        />
      </div>
    </article>
  );
}

function OverlayCollectionBannerCard({
  banner,
}: {
  banner: Extract<CollectionBannerData, { type: "image-overlay" }>;
}) {
  const titleId = useId();
  const textPosition = banner.textPosition ?? "left";
  const imageRatio = banner.imageRatio ?? "cinematic";

  return (
    <article
      aria-labelledby={banner.title ? titleId : undefined}
      aria-label={banner.title ? undefined : banner.eyebrow || banner.imageAlt}
      className={cn(
        "group relative flex min-h-90 w-full items-end overflow-hidden rounded-2xl bg-neutral-900 sm:min-h-110 lg:min-h-130",
        imageRatioClasses[imageRatio],
        textPosition === "center" && "items-center",
        textPosition === "right" && "justify-end",
      )}
    >
      <CollectionBannerImage
        banner={banner}
        sizes="(max-width: 1279px) 100vw, 1280px"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-black/5"
      />
      <CollectionBannerCopy
        banner={banner}
        titleId={titleId}
        overlay
        textPosition={textPosition}
        showCta={banner.showCta}
      />
    </article>
  );
}

function ImageOnlyCollectionBannerCard({
  banner,
}: {
  banner: Extract<CollectionBannerData, { type: "image-only" }>;
}) {
  const imageRatio = banner.imageRatio ?? "cinematic";
  const card = (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl bg-muted",
        imageRatioClasses[imageRatio],
      )}
    >
      <CollectionBannerImage
        banner={banner}
        sizes="(max-width: 1279px) 100vw, 1280px"
      />
    </div>
  );

  return banner.href ? (
    <Link
      href={banner.href}
      aria-label={banner.title || banner.ctaLabel || banner.imageAlt}
      className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {card}
    </Link>
  ) : (
    card
  );
}

export function CollectionBannerCard({
  banner,
}: {
  banner: CollectionBannerData;
}) {
  switch (banner.type) {
    case "split":
      return <SplitCollectionBannerCard banner={banner} />;
    case "image-overlay":
      return <OverlayCollectionBannerCard banner={banner} />;
    case "image-only":
      return <ImageOnlyCollectionBannerCard banner={banner} />;
  }
}
