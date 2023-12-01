import Image from 'next/image';
import { Link } from '@nextui-org/react';

import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import type { Reviews } from '~/types/bangumi/reviews';

export default function Reviews({ subjectId }: { subjectId: number }) {
  const { data, isLoading } = useSWRImmutable<Reviews>(
    [`/reviews?subjectId=${subjectId}`, { base: 'https://acgn-collection-workers.kahosan.workers.dev' }],
    fetcher,
    {
      onError(error) { fetcherErrorHandler(error, '获取评论失败'); }
    }
  );

  if (!data?.length || isLoading) return null;

  return (
    <>
      <div className="[&_:last-child]:mb-0">
        {
          data.slice(0, 5).map(review => (
            <div key={review.id} className="mb-6">
              <Image
                src={review.user.avatar}
                alt="avatar"
                width={62}
                height={62}
                className="float-left mr-2 rounded-md"
              />
              <Link
                href={`https://bgm.tv/blog/${review.id}`}
                className="font-medium text-lg dark:text-blue-300 text-blue-400 block"
                isExternal
              >
                {review.title}
              </Link>
              <div className="text-xs opacity-80 my-0.5 mb-1">
                来自
                {' '}
                <Link href={`https://bgm.tv/${review.user.href}`} color="foreground" className="text-xs" isExternal>{review.user.name}</Link>
                {' '}
                {review.time}
              </div>
              <p className="break-all text-sm">{review.content}</p>
            </div>
          ))
        }
      </div>
      <div className="w-full text-right">
        <Link
          href={`https://bgm.tv/subject/${subjectId}/reviews`}
          size="sm"
          className="dark:text-blue-200 text-blue-400"
          isExternal
        >
          更多评论
        </Link>
      </div>
    </>
  );
}
