import useSWRImmutable from 'swr/immutable';
import { fetcherErrorHandler, fetcherWithOptions } from '~/lib/fetcher';
import type { Timeline, TimelinePayload, TimelineScope } from '~/types/bangumi/timeline';

export const useTimeline = (payload: TimelinePayload, scope: TimelineScope) => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  };

  return useSWRImmutable<Timeline, Error>(
    scope === 'me'
      ? (
        payload.userId
          ? ['https://acgn-collection-workers.kahosan.workers.dev/timeline', options]
          : null
      )
      : ['https://acgn-collection-workers.kahosan.workers.dev/timeline', options],
    fetcherWithOptions,
    {
      onError(error) {
        fetcherErrorHandler(error, '获取时间胶囊失败');
      }
    }
  );
};
