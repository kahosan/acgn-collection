import { Link } from '@heroui/react';

import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import type { Board } from '~/types/bangumi/board';

export default function Boards({ subjectId }: { subjectId: number }) {
  const { data, isLoading } = useSWRImmutable<Board>(
    [`/board?subjectId=${subjectId}`, { base: 'https://acgn-collection-workers.kahosan.workers.dev' }],
    fetcher,
    {
      onError(error) { fetcherErrorHandler(error, '获取讨论版失败'); }
    }
  );

  if (!data?.length || isLoading) return null;

  return (
    <>
      <div className="[&_:last-child]:mb-0">
        {
          data.slice(0, 6).map(board => (
            <div key={board.id} className="mb-4">
              <Link
                href={`https://bgm.tv/subject/topic/${board.id}`}
                className="font-medium dark:text-blue-300 text-blue-400 block"
                isExternal
              >
                {board.title}
              </Link>
              <div className="opacity-80 text-xs w-full">
                <Link href={`https://bgm.tv/${board.user.href}`} className="text-xs" color="foreground" isExternal>{board.user.name}</Link>
                {' '}
                发布于 {board.time}
                {' | '}
                <span>{board.replies} 条回复</span>
              </div>
            </div>
          ))
        }
      </div>
      <div className="w-full text-right">
        <Link
          href={`https://bgm.tv/subject/${subjectId}/board`}
          size="sm"
          className="dark:text-blue-200 text-blue-400"
          isExternal
        >
          更多讨论
        </Link>
      </div>
    </>
  );
}
