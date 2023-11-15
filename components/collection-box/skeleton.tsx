import { Skeleton } from '@nextui-org/react';

export default function CollectionBoxSkeleton() {
  return (
    <Skeleton className="rounded-xl">
      <div className="h-80 sm:w-full sm:h-full" />
    </Skeleton>
  );
}
