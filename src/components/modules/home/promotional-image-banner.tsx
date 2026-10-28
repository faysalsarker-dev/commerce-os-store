import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type PromotionalImageBannerProps = {
  image: string;
  mobileImage?: string;
  alt: string;
  href?: string;
  layout: "full" | "half";
};

export function PromotionalImageBanner({
  image,
  mobileImage,
  alt,
  href,
  layout,
}: PromotionalImageBannerProps) {
  const imageCard = (
    <div
      className={cn(
        "relative p-0 col-span-1 w-full h-50 overflow-hidden rounded-xl bg-muted/30 ",
        layout === "full" && "sm:col-span-2 sm:aspect-[2/1]",
      )}
    >
      {mobileImage && (
        <Image
          src={mobileImage}
          alt={alt}
          fill
          sizes="100vw"
          className="object-contain sm:hidden rounded-lg"
        />
      )}
      <Image
        src={image}
        alt={alt}
        fill
        
        className={cn(
          "object-contain rounded-lg ",
          mobileImage && "hidden sm:block",
        )}
      />
    </div>
  );

  return href ? (
    <Link
      href={href}
      className="block rounded-xl focus-visible:outline-none"
    >
      {imageCard}
    </Link>
  ) : (
    imageCard
  );
}
