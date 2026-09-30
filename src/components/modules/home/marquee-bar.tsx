"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const ANNOUNCEMENTS = [
  "Free shipping on all orders over $50",
  "New season arrivals just landed",
  "Easy 30 day returns on every order",
];

const APPEAR_AFTER = 1500;
const SEPARATOR = "◆";

export function AnnouncementBar() {
  const [items] = useState(ANNOUNCEMENTS);
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const isVisible = visible || reduceMotion;

  useEffect(() => {
    if (items.length === 0) return;
    if (reduceMotion) return;
    const timer = window.setTimeout(() => setVisible(true), APPEAR_AFTER);
    return () => window.clearTimeout(timer);
  }, [items.length, reduceMotion]);

  if (items.length === 0 || !isVisible) return null;

  const track = [...items, ...items];
  const duration = items.length * 6;

  return (
    <motion.aside
      aria-label="Store announcements"
      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden bg-primary/30 text-primary-foreground "
    >
      <div className="flex w-max py-2.5">
        <motion.div
          className="flex w-max shrink-0 items-center"
          initial={reduceMotion ? false : { x: 0 }}
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduceMotion
              ? undefined
              : { duration, ease: "linear", repeat: Infinity, delay: 0.5 }
          }
        >
          {track.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex shrink-0 items-center gap-6 pr-6 text-[11px] font-medium uppercase tracking-[0.18em] whitespace-nowrap"
            >
              {item}
              <span aria-hidden="true" className="text-primary-foreground/50">
                {SEPARATOR}
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </motion.aside>
  );
}
