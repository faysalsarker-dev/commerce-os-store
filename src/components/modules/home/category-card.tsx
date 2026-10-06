import Image from "next/image";

import { AppLink } from "@/components/shared/app-link";
import type { Category } from "@/types/category.type";

interface CategoryCardProps {
  category: Category;
  viewAllHref: string;
}

export default function CategoryCard({
  category,
  viewAllHref,
}: CategoryCardProps) {
  return (
    <AppLink
      href={`${viewAllHref}?category=${category.slug}`}
      aria-label={`Shop ${category.title}`}
      className="group flex w-[4.5rem] shrink-0 flex-col items-center gap-2 sm:w-24"
    >
      <div className="relative size-20 overflow-hidden rounded-full bg-muted ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-ring sm:size-20">
        <Image
          src={category.image}
          alt={category.title}
          fill
          loading="lazy"
          sizes="80px"
          className="object-cover"
        />
      </div>
      <span className="line-clamp-1 max-w-full text-center text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
        {category.title}
      </span>
    </AppLink>
  );
}
