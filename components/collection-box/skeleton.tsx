import { Skeleton } from '@nextui-org/react';

export default function CollectionBoxSkeleton() {
  return (
    <Skeleton className="rounded-xl">
      <div className="w-full h-full" />
    </Skeleton>
  );
}
