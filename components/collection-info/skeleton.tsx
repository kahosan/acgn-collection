import { Skeleton } from '@nextui-org/react';

export function RelationsSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {
        Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="rounded-md h-24 w-20" />
        ))
      }
    </div>
  );
}
