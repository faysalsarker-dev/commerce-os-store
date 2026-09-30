import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section id="newsletter" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-xs uppercase text-muted-foreground">The studio letter</p>
        <h2 className="text-3xl font-semibold md:text-4xl">A quieter kind of inbox</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground">New collections, thoughtful stories and private offers—sent occasionally.</p>
        <form className="mx-auto mt-8 flex max-w-md" onSubmit={(event) => event.preventDefault()}>
          <Input type="email" placeholder="Email address" aria-label="Email address" className="h-12 rounded-r-none shadow-none" />
          <Button type="submit" size="lg" className="h-12 rounded-l-none px-5">Subscribe <ArrowRight /></Button>
        </form>
      </div>
    </section>
  );
}
