"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1649433911119-7cf48b3e8f50?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Hero 1",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1562263689-1001cf97d149?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Hero 2",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1550344071-13ecada2a91d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fA%3D%3D",
    alt: "Hero 3",
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
