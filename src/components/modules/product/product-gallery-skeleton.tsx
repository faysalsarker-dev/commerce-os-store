import { Skeleton } from "@/components/ui/skeleton";

export function ProductGallerySkeleton() {
  return (
    <div className="min-w-0">
      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
      <div className="-m-1 mt-2 grid grid-cols-3 gap-3 p-1">
        {[0, 1, 2].map((i) => <Skeleton key={i} className="aspect-[4/5] rounded-md" />)}
      </div>
    </div>
  );
}
