"use client";

import { useEffect, type ReactNode } from "react";
import { CART_STORAGE_KEY, useCartStore } from "@/stores/cart-store";

export function StoreProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const hydrateCart = async () => {
      try {
        await useCartStore.persist.rehydrate();
      } catch (error) {
        console.error("Unable to restore the saved cart.", error);
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY && event.newValue === null) {
        useCartStore.setState({ selections: [] });
      } else if (event.key === CART_STORAGE_KEY) {
        void hydrateCart();
      } else if (event.key === null) {
        useCartStore.setState({ selections: [] });
      }
    };

    void hydrateCart();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return children;
}
