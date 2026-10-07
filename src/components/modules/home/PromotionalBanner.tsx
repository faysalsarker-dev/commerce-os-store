
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BannerIcon = "shipping" | "secure" | "returns";

type BannerBottomItem = {
  icon: BannerIcon;
  title: string;
  description?: string;
};

type ImageBanner = {
  type: "image";
  image: string;
  mobileImage?: string;
  alt: string;
  link: string;
};

type CustomBanner = {
  type: "custom";
  eyebrow?: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;

  mainImage: string;
  mainImageAlt?: string;

  backgroundImage?: string;

  bottomItems?: BannerBottomItem[];
};

type PromotionalBannerData = ImageBanner | CustomBanner;

const promotionalBanner: PromotionalBannerData = {
  type: "custom",

  eyebrow: "LIMITED TIME OFFER",

  title: "Up to 50% Off",

  description: "Your favorite styles, now at lower prices.",

  buttonText: "Shop Now",
  buttonLink: "/products",

  mainImage: "/images/promotional-model.png",
  mainImageAlt: "Model wearing our latest collection",

  // Optional.
  // If this doesn't exist, the banner automatically uses bg-primary.
  backgroundImage: undefined,

  bottomItems: [
    {
      icon: "shipping",
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: "secure",
      title: "Secure Payment",
      description: "100% Safe & Reliable",
    },
    {
      icon: "returns",
      title: "Easy Returns",
      description: "Within 7 Days",
    },
  ],
};

// Example IMAGE banner:
//
// const promotionalBanner: PromotionalBannerData = {
//   type: "image",
//   image: "/images/summer-sale-banner.jpg",
//   mobileImage: "/images/summer-sale-banner-mobile.jpg",
//   alt: "Summer sale up to 50% off",
//   link: "/sale",
// };

const iconMap = {
  shipping: Truck,
  secure: CheckCircle2,
  returns: RotateCcw,
};

function BannerIcon({ type }: { type: BannerIcon }) {
  const Icon = iconMap[type];

  return <Icon className="size-5 shrink-0" strokeWidth={1.7} />;
}

function ImageBannerView({ banner }: { banner: ImageBanner }) {
  return (
    <section className="w-full ">
      <Link
        href={banner.link}
        className="group relative mx-auto block aspect-[16/5] w-full max-w-7xl overflow-hidden rounded-2xl bg-muted outline-none"
      >
        <picture>
          {banner.mobileImage && (
            <source
              media="(max-width: 767px)"
              srcSet={banner.mobileImage}
            />
          )}

          <Image
            src={banner.image}
            alt={banner.alt}
            fill
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] motion-reduce:transform-none"
          />
        </picture>
      </Link>
    </section>
  );
}

function CustomBannerView({ banner }: { banner: CustomBanner }) {
  const hasBackgroundImage = Boolean(banner.backgroundImage);

  return (
    <section className="w-full">
      <div
        className={cn(
          "group relative mx-auto min-h-[460px] w-full max-w-7xl overflow-hidden rounded-2xl",
          "bg-primary"
        )}
      >
        {hasBackgroundImage && (
          <Image
            src={banner.backgroundImage!}
            alt=""
            fill
            aria-hidden="true"
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        {hasBackgroundImage && (
          <div className="absolute inset-0 bg-black/10" />
        )}

        {!hasBackgroundImage && (
          <>
            <div className="pointer-events-none absolute -right-24 -top-32 size-[420px] rounded-full bg-white/[0.08] blur-3xl" />

            <div className="pointer-events-none absolute -bottom-40 left-[42%] size-[500px] rounded-full bg-black/[0.08] blur-3xl" />

            <div className="pointer-events-none absolute right-[26%] top-1/2 hidden h-[300px] w-[160px] -translate-y-1/2 rotate-[25deg] rounded-[100%] border border-white/10 lg:block" />
          </>
        )}

        <div className="relative z-10 grid min-h-[460px] grid-cols-1 lg:grid-cols-[1fr_0.9fr]">
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 xl:px-16">
            <div className="max-w-xl">
              {banner.eyebrow && (
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground backdrop-blur-sm"
                >
                  {banner.eyebrow}
                </motion.span>
              )}

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-5 max-w-lg text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-primary-foreground sm:text-6xl lg:text-7xl"
              >
                {banner.title}
              </motion.h2>

              {banner.description && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.16,
                  }}
                  className="mt-5 max-w-md text-sm leading-6 text-primary-foreground/80 sm:text-base"
                >
                  {banner.description}
                </motion.p>
              )}

              {banner.buttonText && banner.buttonLink && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.24,
                  }}
                  className="mt-7"
                >
                  <Button
                    asChild
                    size="lg"
                    className="group/button rounded-full bg-background px-6 text-foreground shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:bg-background active:scale-[0.98]"
                  >
                    <Link href={banner.buttonLink}>
                      {banner.buttonText}

                      <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
              )}

              {banner.bottomItems &&
                banner.bottomItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.32,
                    }}
                    className="mt-10 flex flex-wrap gap-y-5"
                  >
                    {banner.bottomItems.map((item, index) => (
                      <div
                        key={`${item.title}-${index}`}
                        className={cn(
                          "flex items-center gap-3 pr-5 sm:pr-6",
                          index > 0 &&
                            "border-l border-primary-foreground/20 pl-5 sm:pl-6"
                        )}
                      >
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground">
                          <BannerIcon type={item.icon} />
                        </div>

                        <div>
                          <p className="text-xs font-medium text-primary-foreground">
                            {item.title}
                          </p>

                          {item.description && (
                            <p className="mt-0.5 text-[0.65rem] text-primary-foreground/60">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
            </div>
          </div>

          <div className="relative min-h-[340px] lg:min-h-full">
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0"
            >
              <Image
                src={banner.mainImage}
                alt={banner.mainImageAlt ?? ""}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain object-bottom transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
              />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />

            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-primary to-transparent lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function PromotionalBanner() {
  if (promotionalBanner.type === "image") {
    return <ImageBannerView banner={promotionalBanner} />;
  }

  return <CustomBannerView banner={promotionalBanner} />;
}
