/* eslint-disable @eslint-react/jsx/no-array-index-key -- skeleton */
import { Skeleton } from '@nextui-org/react';

export function RelationsSkeleton() {
  return (
    <div className="flex flex-wrap gap-4">
      {
        Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="rounded-md h-24 w-20" />
        ))
      }
    </div>
  );
}

export function CharactersSkeleton() {
  return (
    <div className="flex flex-wrap gap-4">
      {
        Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="rounded-md h-14 w-24 sm:w-52" />
        ))
      }
    </div>
  );
}
