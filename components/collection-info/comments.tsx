import { Link } from '@nextui-org/react';
import Image from 'next/image';

import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import type { Comments } from '~/types/bangumi/comments';

export default function Reviews({ subjectId }: { subjectId: number }) {
  const { data, isLoading } = useSWRImmutable<Comments>(
    [`/comments?subjectId=${subjectId}`, { base: 'https://acgn-collection-workers.kahosan.workers.dev' }],
    fetcher,
    {
      onError(error) { fetcherErrorHandler(error, '获取吐槽失败'); }
    }
  );

  if (!data?.length || isLoading) return null;

  return (
    <>
      <div className="grid grid-rows-10 gap-4">
        {
          data.slice(0, 10).map(comment => (
            <div key={comment.comment}>
              <div className="flex gap-2">
                <div className="relative min-w-[48px] h-[48px]">
                  <Image
                    src={comment.user.avatar}
                    alt="avatar"
                    className="rounded-md"
                    priority
                    fill
                    sizes="100%"
                  />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1 w-full">
                    <Link
                      href={`https://bgm.tv/${comment.user.href}`}
                      className="font-medium sm:text-sm text-xs dark:text-blue-300 text-blue-400 block"
                      isExternal
                    >
                      {comment.user.name}
                    </Link>
                    <small className="text-xs opacity-40">
                      {comment.published.replace('@', '').trim()}
                    </small>
                  </div>
                  <div className="p-2 text-sm rounded-md bg-slate-200 dark:bg-gray-700/70 max-w-max">
                    {comment.comment}
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <Link
        href={`https://bgm.tv/subject/${subjectId}/comments`}
        size="sm"
        className="w-full justify-end mt-1 dark:text-blue-200 text-blue-400"
        isExternal
      >
        更多吐槽
      </Link>
    </>
  );
}
