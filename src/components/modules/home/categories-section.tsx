import type { CategoriesSectionProps } from "@/types/nav-item.type";
import { AppImage } from "@/shared/app-image";
import { AppLink } from "@/shared/app-link";

export function CategoriesSection({ title, categories }: CategoriesSectionProps) {
  return (
    <section id="categories" className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 md:py-24 lg:px-12">
      <div className="mb-8 flex items-end justify-between"><h2 className="text-2xl font-semibold md:text-3xl">{title}</h2><span className="text-xs uppercase text-muted-foreground">Explore the collection</span></div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {categories.map((category, index) => <AppLink key={category.id} href={`#${category.slug}`} className={`group relative aspect-[4/5] overflow-hidden bg-muted ${index > 3 ? "md:col-span-2 md:aspect-[2/1]" : ""}`}><AppImage src={category.image} alt={category.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-4 pt-14 text-primary-foreground md:p-6"><h3 className="text-lg font-medium md:text-xl">{category.name}</h3></div></AppLink>)}
      </div>
    </section>
  );
}
