"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { ProductGalleryProps } from "@/types/product-detail.type";

const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 1000;

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(0);
    trackRef.current?.scrollTo({ left: 0 });
  }, [images]);

  const select = (index: number) => {
    if (index === active) return;
    setVisible(false);
    window.setTimeout(() => {
      setActive(index);
      setVisible(true);
    }, 120);
    const track = trackRef.current;
    if (track) track.scrollTo({ left: track.clientWidth * index, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== active) setActive(index);
  };

  if (images.length === 0) {
    return (
      <div className="min-w-0">
        <div className="aspect-[3/4] w-full rounded-lg bg-muted" />
      </div>
    );
  }

  const safeIndex = Math.min(active, images.length - 1);

  return (
    <div className="min-w-0">
      {/* Mobile: swipeable track */}
      <div className="relative md:hidden">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex aspect-[3/4] snap-x snap-mandatory overflow-x-auto rounded-lg bg-muted [scrollbar-width:none]"
        >
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${productName}, view ${i + 1}`}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              sizes="100vw"
              priority={i === 0}
              draggable={false}
              className="size-full shrink-0 snap-center object-cover"
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {images.map((src, i) => (
            <span
              key={src}
              className={cn(
                "h-1.5 rounded-full bg-background transition-all duration-300",
                i === safeIndex ? "w-4" : "w-1.5 opacity-60"
              )}
            />
          ))}
        </div>
      </div>

      {/* Desktop: main image with fade */}
      <div className="hidden aspect-[3/4] overflow-hidden rounded-lg bg-muted md:block">
        <Image
          key={images[safeIndex]}
          src={images[safeIndex]}
          alt={`${productName}, view ${safeIndex + 1} of ${images.length}`}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          sizes="(min-width: 768px) 50vw, 100vw"
          priority
          className={cn(
            "size-full object-cover transition-opacity duration-200",
            visible ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      <div className="-m-1 mt-2 grid snap-x snap-mandatory auto-cols-[calc((100%-1.5rem)/3)] grid-flow-col gap-3 overflow-x-auto p-1 [scrollbar-width:none]">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => select(i)}
            aria-label={`Show image ${i + 1} of ${images.length} of ${productName}`}
            aria-current={i === safeIndex}
            className={cn(
              "relative aspect-[4/5] snap-start overflow-hidden rounded-md border bg-muted transition-all duration-200",
              i === safeIndex ? "border-foreground" : "border-transparent opacity-60 hover:opacity-90"
            )}
          >
            <Image
              src={src}
              alt=""
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              sizes="(min-width: 768px) 16vw, 33vw"
              loading="lazy"
              draggable={false}
              className="size-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}