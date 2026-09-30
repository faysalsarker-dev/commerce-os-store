import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PromoBannerProps } from "@/types/nav-item.type";
import { AppImage } from "@/shared/app-image";
import { AppLink } from "@/shared/app-link";

export function PromoBanner({ banner }: PromoBannerProps) {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 md:py-12 lg:px-12">
      <div className="relative min-h-[420px] overflow-hidden md:min-h-[460px]">
        <AppImage src={banner.image} alt="Seasonal clothing edit" className="absolute inset-0 size-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="relative flex min-h-[420px] max-w-xl flex-col items-start justify-center p-7 text-primary-foreground md:min-h-[460px] md:p-14">
          {banner.couponCode && <Badge className="mb-5 border-primary-foreground/40 bg-background/15 text-primary-foreground">USE {banner.couponCode}</Badge>}
          <h2 className="text-4xl font-semibold md:text-6xl">{banner.title}</h2>
          {banner.subtitle && <p className="mt-4 text-base text-primary-foreground/85 md:text-lg">{banner.subtitle}</p>}
          <Button asChild variant="secondary" size="lg" className="mt-7"><AppLink href={banner.ctaLink}>{banner.ctaLabel}</AppLink></Button>
        </div>
      </div>
    </section>
  );
}
