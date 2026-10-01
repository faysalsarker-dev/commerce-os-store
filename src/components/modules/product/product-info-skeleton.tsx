import { Skeleton } from "@/components/ui/skeleton";

export function ProductInfoSkeleton() {
  return (
    <div>
      <Skeleton className="h-3 w-20" />
      <Skeleton className="mt-3 h-8 w-4/5 md:h-9" />
      <Skeleton className="mt-3 h-7 w-28" />
      <Skeleton className="mt-2 h-4 w-40" />
      <div className="mt-6 space-y-2.5"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /></div>
      <div className="mt-8 space-y-7">
        <div><Skeleton className="h-4 w-28" /><div className="mt-3 flex gap-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="size-9 rounded-full" />)}</div></div>
        <div><Skeleton className="h-4 w-10" /><div className="mt-3 flex flex-wrap gap-2">{[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-10 w-14 rounded-full" />)}</div></div>
        <div><Skeleton className="h-4 w-16" /><Skeleton className="mt-3 h-10 w-28 rounded-full" /></div>
        <Skeleton className="hidden h-12 w-full rounded-full md:block" />
      </div>
      <div className="mt-8 border-t border-border">{[0, 1, 2].map((i) => <div key={i} className="border-b border-border py-4"><Skeleton className="h-4 w-1/3" /></div>)}</div>
      <div className="mt-6 grid grid-cols-3 gap-3">{[0, 1, 2].map((i) => <div key={i} className="flex flex-col items-center gap-2"><Skeleton className="size-4" /><Skeleton className="h-3 w-16" /></div>)}</div>
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-border bg-background/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden">
        <Skeleton className="h-5 w-20" /><Skeleton className="h-12 flex-1 rounded-full" />
      </div>
    </div>
  );
}
