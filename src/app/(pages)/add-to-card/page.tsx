"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/cart-store";
import { formatPrice } from "@/lib/formate-price";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <div className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Step 1 of 2
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Your cart
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your bag
          </p>
        </div>
        <Link
          href="/checkout"
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Continue to checkout
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
          <h2 className="text-xl font-medium">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse the collection and add something you love.
          </p>
          <Button asChild className="mt-6 rounded-full px-6">
            <Link href="/products">Continue shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-10  lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="divide-y divide-border border-y border-border space-y-3">
            {items.map((item) => (
              <article
                key={item.key}
                className="flex gap-4 sm:gap-6 bg-card p-3 rounded-lg shadow-sm"
              >
                <Link
                  href={`/products/${item.slug}`}
                  className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-32"
                  aria-label={`View ${item.name}`}
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="128px"
                      className="object-cover shadow-sm"
                    />
                  )}
                </Link>
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {item.category}
                    </p>
                    <Link
                      href={`/products/${item.slug}`}
                      className="mt-1 inline-block font-medium hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Color: {item.color} <span className="mx-1">·</span> Size:{" "}
                      {item.size}
                    </p>
                    <p className="mt-2 text-sm font-medium">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <div className="flex h-9 items-center rounded-full border border-border bg-background text-sm font-medium tabular-nums">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(item.key, item.quantity - 1)
                        }
                        className="grid size-9 place-items-center rounded-l-full text-muted-foreground hover:text-foreground disabled:opacity-40"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="min-w-8 text-center text-sm tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() =>
                          updateQuantity(item.key, item.quantity + 1)
                        }
                        className="grid size-9 place-items-center rounded-r-full text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() => removeItem(item.key)}
                        className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <div className="mt-6 space-y-3 border-b border-border pb-5 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
            </div>
            <div className="flex justify-between gap-4 py-5">
              <span className="font-semibold">Total</span>
              <span className="font-semibold tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </div>
            <Button asChild className="h-12 w-full btn-main text-sm font-semibold">
              <Link href="/checkout">Proceed to checkout</Link>
            </Button>
            <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
              Shipping and payment details are entered on the next step.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
