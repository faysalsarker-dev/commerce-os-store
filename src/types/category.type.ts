export type Category = {
  id: string;
  slug: string;
  title: string;
  image: string;
};

export type CategoriesSectionProps = {
  eyebrow?: string;
  title?: string;
  viewAllHref?: string;
  categories?: Category[];
  className?: string;
};
