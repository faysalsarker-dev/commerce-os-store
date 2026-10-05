"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { AppLink } from "@/components/shared/app-link";
import { Title } from "@/components/shared/title";
import { categories as defaultCategories } from "@/data/category.data";
import type { CategoriesSectionProps } from "@/types/category.type";

const TRACK_CLASS =
  "flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth motion-reduce:scroll-auto md:gap-4";

const ITEM_CLASS =
  "w-[clamp(9.5rem,62vw,15rem)] shrink-0 snap-start sm:w-[clamp(12rem,40vw,17rem)] md:w-[clamp(13rem,28vw,19rem)] lg:w-[calc((100%-3rem)/4)] xl:w-[calc((100%-4.5rem)/5)]";

type ScrollState = {
  canPrev: boolean;
  canNext: boolean;
  progress: number;
  index: number;
};

const INITIAL_STATE: ScrollState = { canPrev: false, canNext: true, progress: 0, index: 1 };

export function CategoriesSection({
  eyebrow = "Shop the collection",
  title = "Shop by category",
  viewAllHref = "/products",
  categories = defaultCategories,
  className,
}: CategoriesSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(0);
  const [state, setState] = useState<ScrollState>(INITIAL_STATE);

  const syncScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, track.scrollLeft / maxScroll)) : 0;
    const step = stepRef.current || track.clientWidth;
    const index = Math.min(categories.length, Math.max(1, Math.round(track.scrollLeft / step) + 1));
    setState({
      canPrev: track.scrollLeft > 4,
      canNext: track.scrollLeft < maxScroll - 4,
      progress,
      index,
    });
  }, [categories.length]);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    stepRef.current = (first instanceof HTMLElement ? first.offsetWidth : track.clientWidth) + gap;
    syncScrollState();
  }, [syncScrollState]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    measure();
    track.addEventListener("scroll", syncScrollState, { passive: true });

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    for (const child of Array.from(track.children)) observer.observe(child);

    return () => {
      track.removeEventListener("scroll", syncScrollState);
      observer.disconnect();
    };
  }, [measure, syncScrollState]);

  const scrollByPage = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const distance = stepRef.current || Math.max(track.clientWidth * 0.8, 240);
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByPage(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByPage(-1);
    }
  };

  if (categories.length === 0) return null;

  const total = String(categories.length).padStart(2, "0");
  const current = String(state.index).padStart(2, "0");
  const barWidth = Math.max(state.progress * 100, 4);

  return (
    <section
      id="categories"
      aria-label={title}
      className={cn("mx-auto w-full max-w-360 px-4 py-8 sm:px-6 md:py-20 lg:px-12", className)}
    >
      <div className="mb-6 flex items-end justify-between gap-6 md:mb-8">
        <div className="min-w-0">
          <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            {eyebrow}
          </p>
          <Title
            title={title}
            as="h2"
            highlight={"category"}
            action="underline"
            className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <AppLink
            href={viewAllHref}
            className="mr-1 hidden items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary md:inline-flex"
          >
            View all
            <ArrowRight className="size-4" />
          </AppLink>
          <Button
            variant="outline"
            size="icon-lg"
            aria-label="Scroll categories backward"
            disabled={!state.canPrev}
            onClick={() => scrollByPage(-1)}
            className="hidden rounded-full sm:inline-flex"
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="icon-lg"
            aria-label="Scroll categories forward"
            disabled={!state.canNext}
            onClick={() => scrollByPage(1)}
            className="hidden rounded-full sm:inline-flex"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={title}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={cn(TRACK_CLASS, "-mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12")}
      >
        {categories.map((category) => (
          <article key={category.id} className={ITEM_CLASS}>
            <AppLink
              href={`${viewAllHref}?category=${category.slug}`}
              aria-label={`Shop ${category.title}`}
              className="group/card relative block overflow-hidden rounded-2xl bg-muted ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/10 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="relative aspect-3/4 w-full">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 24vw, (min-width: 640px) 34vw, 62vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transform-none"
                />
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 md:p-4">
                <h3 className="text-sm font-medium tracking-tight text-white drop-shadow-sm md:text-base">
                  {category.title}
                </h3>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-300 group-hover/card:bg-white group-hover/card:text-black md:size-9">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </AppLink>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `${barWidth}%` }}
          />
        </div>
        <p className="text-xs tabular-nums text-muted-foreground">
          {current} / {total}
        </p>
      </div>
    </section>
  );
}
