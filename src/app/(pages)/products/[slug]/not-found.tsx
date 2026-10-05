import Link from "next/link";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Product not found",
  robots: { index: false, follow: false },
};

export default function ProductNotFound() {
  return (
    <main id="top" className="mx-auto flex min-h-[60svh] max-w-[1280px] flex-col items-center justify-center px-5 py-28 text-center sm:px-8 lg:px-12">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">We couldn&apos;t find that product</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        It may have sold out or moved. Browse the rest of the {SITE_NAME} collection instead.
      </p>
      <Link href="/" className="mt-8 inline-flex h-12 items-center rounded-full bg-foreground px-8 text-sm font-medium text-background">
        Back to home
      </Link>
    </main>
  );
}