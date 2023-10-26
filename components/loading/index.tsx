import { Spinner } from '@nextui-org/react';

export default function Loading() {
  return (
    <div className="mt-12 flex justify-center items-center gap-3">
      <Spinner />
      加载中...
    </div>
  );
}
