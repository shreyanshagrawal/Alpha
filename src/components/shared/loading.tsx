import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-64" />

      <Skeleton className="h-[400px] w-full rounded-3xl" />

      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map(
          (_, i) => (
            <Skeleton
              key={i}
              className="h-24 w-full rounded-xl"
            />
          )
        )}
      </div>
    </div>
  );
}