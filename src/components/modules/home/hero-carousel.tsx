"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    id: "1",
    image: "https://i.pinimg.com/1200x/1a/35/85/1a3585a130701e041667789d7713d427.jpg",
    alt: "Hero 1",
  },
  {
    id: "2",
    image: "https://i.pinimg.com/1200x/20/3b/be/203bbee4c17863b5c55bab3db609d9ba.jpg",
    alt: "Hero 2",
  },
  {
    id: "3",
    image: "https://i.pinimg.com/1200x/c9/4b/80/c94b80778cc44b28a45fe4aea8415e52.jpg",
    alt: "Hero 3",
  },
  {
    id: "4",
    image: "https://i.pinimg.com/1200x/15/b4/e7/15b4e791cdb5dba6efff9573f2af9006.jpg",
    alt: "Hero 4",
  },
];

export type HeroSlide = {
  id: string;
  image: string;
  alt?: string;
};

export type HeroCarouselProps = {
 
  interval?: number;
};

const COPIES = 2;

export function HeroCarousel({ interval = 5000 }: HeroCarouselProps) {
  const count = slides.length;
  const total = count * COPIES;
  const lastIndex = total - 1;

  const [pos, setPos] = useState(() => Math.min(1, Math.max(count - 1, 0)));
  const [animating, setAnimating] = useState(true);
  const posRef = useRef(pos);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  const jumpTo = useCallback((next: number) => {
    setAnimating(false);
    posRef.current = next;
    setPos(next);
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)));
  }, []);

  const move = useCallback(
    (direction: 1 | -1) => {
      if (count < 2) return;
      const current = posRef.current;
      const next = current + direction;
      if (next > lastIndex) {
        jumpTo(0);
        return;
      }
      if (next < 0) {
        jumpTo(lastIndex);
        return;
      }
      posRef.current = next;
      setPos(next);
    },
    [count, jumpTo, lastIndex]
  );

  useEffect(() => {
    if (count < 2) return;
    const timer = window.setInterval(() => move(1), interval);
    return () => window.clearInterval(timer);
  }, [count, interval, move]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(delta) < 40) return;
    move(delta < 0 ? 1 : -1);
  };

  if (count === 0) return null;

  const active = ((pos % count) + count) % count;
  const looped = Array.from({ length: COPIES }, (_, copy) =>
    slides.map((slide, slideIndex) => ({ slide, copy, slideIndex }))
  ).flat();

  return (
    <section
      aria-label="Featured banners"
      className="relative h-[60svh] min-h-95 w-full overflow-hidden md:h-[calc(100vh-100px)] md:max-h-205"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`flex h-full ease-out ${animating ? "transition-transform duration-500" : "transition-none"}`}
        style={{ transform: `translateX(-${pos * 100}%)` }}
      >
        {looped.map(({ slide, copy, slideIndex }) => (
          <div key={`${slide.id}-${copy}-${slideIndex}`} className="relative h-full w-full shrink-0 grow-0 basis-full">
            <Image
              src={slide.image}
              alt={slide.alt ?? ""}
              fill
              priority={copy === 0 && slideIndex === 0}
              sizes="100vw"
              className="object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((slide, dotIndex) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${dotIndex + 1}`}
              aria-current={dotIndex === active}
              onClick={() => {
                const target = dotIndex < active ? dotIndex + count : dotIndex;
                posRef.current = target;
                setPos(target);
              }}
              className="p-1"
            >
              <span
                className={`block h-1.5 rounded-full bg-card transition-[width,opacity] ${
                  dotIndex === active ? "w-6 opacity-100" : "w-1.5 opacity-50"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
