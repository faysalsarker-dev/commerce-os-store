
import Image from "next/image";
import Link from "next/link";

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
    <Link
      href={`${viewAllHref}?category=${encodeURIComponent(category.slug)}`}
      aria-label={`Shop ${category.title}`}
      className="group flex w-20 shrink-0 flex-col items-center gap-2 sm:w-20 md:w-32 lg:w-36 xl:w-40"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-full bg-muted ring-1 ring-black/5 transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-ring">
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 639px) 96px, (max-width: 767px) 112px, (max-width: 1023px) 128px, (max-width: 1279px) 144px, 160px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <span className="w-full truncate text-center text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground sm:text-sm">
        {category.title}
      </span>
    </Link>
  );
}
