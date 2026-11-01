"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/stores/cart-store";
import { formatPrice } from "@/lib/formate-price";

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">
      {children}
    </label>
  );
}

export default function CheckoutPage() {
  const { items, itemCount, subtotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cash-on-delivery");
  const [couponCode, setCouponCode] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.warning(
      "Order placement is not connected yet. Your cart has been kept.",
    );
  };

  const handleCouponSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!couponCode.trim()) {
      toast.warning("Enter a coupon code first.");
      return;
    }

    console.log("Coupon code:", couponCode);
    toast.success("Coupon code submitted successfully.");
  };

  return (
    <div className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-12">
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Step 2 of 2
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add your contact, delivery, and payment details.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
          <h2 className="text-xl font-medium">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Add products to your cart before checking out.
          </p>
          <Button asChild className="mt-6 rounded-full px-6">
            <Link href="/products">Continue shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <section>
              <h2 className="mb-5 text-lg font-semibold">Contact information</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="full-name">Full name *</FieldLabel>
                  <Input id="full-name" name="name" autoComplete="name" required />
                </div>
                <div>
                  <FieldLabel htmlFor="phone">Phone number *</FieldLabel>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel htmlFor="email">Email address (optional)</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                </div>
              </div>
            </section>

            <section className="border-t border-border pt-7">
              <h2 className="mb-5 text-lg font-semibold">Delivery address</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <FieldLabel htmlFor="address">Address *</FieldLabel>
                  <Input
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    placeholder="Street address, building, or area"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel htmlFor="address-line-2">
                    Second address line (optional)
                  </FieldLabel>
                  <Input
                    id="address-line-2"
                    name="addressLine2"
                    autoComplete="address-line2"
                    placeholder="Apartment, suite, floor, or landmark"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="city">City *</FieldLabel>
                  <Input
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    required
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="region">District / region *</FieldLabel>
                  <Input
                    id="region"
                    name="region"
                    autoComplete="address-level1"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel htmlFor="delivery-notes">
                    Delivery notes (optional)
                  </FieldLabel>
                  <textarea
                    id="delivery-notes"
                    name="deliveryNotes"
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Anything the courier should know?"
                  />
                </div>
              </div>
            </section>

            <section className="border-t border-border pt-7">
              <h2 className="mb-5 text-lg font-semibold">Payment method</h2>
              <div className="space-y-3">
                {[
                  {
                    id: "cash-on-delivery",
                    label: "Cash on delivery",
                    description: "Pay when your order arrives.",
                  },
                  {
                    id: "bank-transfer",
                    label: "Bank transfer",
                    description: "Payment instructions are provided when this option is available.",
                  },
                ].map((method) => (
                  <label
                    key={method.id}
                    className="flex cursor-pointer gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/50"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="mt-1 accent-primary"
                    />
                    <span>
                      <span className="block text-sm font-medium">
                        {method.label}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {method.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <Button type="submit" className="h-12 w-full btn-main  font-semibold">
              Place order · {formatPrice(subtotal)}
            </Button>
            <p className="-mt-5 text-center text-xs text-muted-foreground">
              This demo does not submit orders or process payments.
            </p>
          </form>

          <aside className="rounded-2xl border border-border bg-card p-5 sm:p-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <Link
                href="/add-to-card"
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Edit cart
              </Link>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
            <div className="mt-5 max-h-[360px] space-y-4 overflow-y-auto border-y border-border py-5">
              {items.map((item) => (
                <div key={item.key} className="flex gap-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                    <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-foreground text-[10px] font-medium text-background">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium">{item.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.color} / {item.size}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-medium tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleCouponSubmit} className="space-y-2 pt-5">
              <FieldLabel htmlFor="coupon-code">Coupon code</FieldLabel>
              <div className="flex gap-2">
                <Input
                  id="coupon-code"
                  name="couponCode"
                  autoComplete="off"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(event) =>
                    setCouponCode(event.target.value.toUpperCase())
                  }
                />
                <Button className="btn-main h-12" type="submit">Apply</Button>
              </div>
            </form>
            <div className="space-y-3 border-b border-border py-5 text-sm">
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
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Payment</span>
                <span className="font-medium">
                  {paymentMethod === "cash-on-delivery"
                    ? "Cash on delivery"
                    : "Bank transfer"}
                </span>
              </div>
            </div>
            <div className="flex justify-between gap-4 pt-5">
              <span className="font-semibold">Total</span>
              <span className="font-semibold tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
