"use client";

import { create } from "zustand";
import {
  createJSONStorage,
  persist,
} from "zustand/middleware";
import { useMemo } from "react";
import { products, type Product } from "@/data/product.data";

type CartSelection = {
  key: string;
  productId: string;
  color: string;
  size: string;
  quantity: number;
};

export type CartItem = CartSelection & {
  slug: string;
  name: string;
  category: string;
  image: string;
  price: number;
};

type PersistedCartState = {
  selections: CartSelection[];
};

type CartStore = {
  selections: CartSelection[];
  addItem: (product: Product, colorIndex: number, size: string) => boolean;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

export const CART_STORAGE_KEY = "forma-cart";

function isCartSelection(value: unknown): value is CartSelection {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.key === "string" &&
    typeof item.productId === "string" &&
    typeof item.color === "string" &&
    typeof item.size === "string" &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

function readCartSelections(value: unknown): CartSelection[] {
  const selections = Array.isArray(value)
    ? value
    : value && typeof value === "object" && "selections" in value
      ? value.selections
      : undefined;

  if (!Array.isArray(selections)) {
    if (selections !== undefined) {
      console.error("Saved cart data is invalid.");
    }
    return [];
  }

  const validItems = selections.filter(isCartSelection);
  if (validItems.length !== selections.length) {
    console.error("Some saved cart items are invalid and were ignored.");
  }
  return validItems.map(({ key, productId, color, size, quantity }) => ({
    key,
    productId,
    color,
    size,
    quantity,
  }));
}

function resolveCartItems(selections: CartSelection[]): CartItem[] {
  return selections.flatMap((selection) => {
    const product = products.find((entry) => entry.id === selection.productId);
    if (!product) {
      console.error(`Cart product "${selection.productId}" is not available.`);
      return [];
    }

    const color = product.colors.find(
      (entry) => entry.name === selection.color,
    );
    if (!color) {
      console.error(`Cart color "${selection.color}" is not available.`);
      return [];
    }

    return [{
      ...selection,
      slug: product.slug,
      name: product.name,
      category: product.category,
      image: color.images[0] ?? "",
      price: product.price,
    }];
  });
}

const storage = createJSONStorage<PersistedCartState>(() => localStorage);

export const useCartStore = create<CartStore>()(
  persist<CartStore, [], [], PersistedCartState>(
    (set) => ({
      selections: [],
      addItem: (product, colorIndex, size) => {
        const color = product.colors[colorIndex] ?? product.colors[0];
        if (!color || !size) return false;

        const key = `${product.id}:${color.name}:${size}`;
        set((state) => {
          const existing = state.selections.find((item) => item.key === key);
          if (existing) {
            return {
              selections: state.selections.map((item) =>
                item.key === key
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return {
            selections: [
              ...state.selections,
              {
                key,
                productId: product.id,
                color: color.name,
                size,
                quantity: 1,
              },
            ],
          };
        });
        return true;
      },
      updateQuantity: (key, quantity) => {
        if (!Number.isInteger(quantity) || quantity < 1) return;
        set((state) => ({
          selections: state.selections.map((item) =>
            item.key === key ? { ...item, quantity } : item,
          ),
        }));
      },
      removeItem: (key) =>
        set((state) => ({
          selections: state.selections.filter((item) => item.key !== key),
        })),
      clearCart: () => set({ selections: [] }),
    }),
    {
      name: CART_STORAGE_KEY,
      version: 1,
      storage,
      skipHydration: true,
      partialize: (state) => ({ selections: state.selections }),
      migrate: (persistedState) => ({
        selections: readCartSelections(persistedState),
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        selections: readCartSelections(persistedState),
      }),
    },
  ),
);

export function useCart() {
  const selections = useCartStore((state) => state.selections);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const items = useMemo(() => resolveCartItems(selections), [selections]);
  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  return {
    items,
    itemCount,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };
}
