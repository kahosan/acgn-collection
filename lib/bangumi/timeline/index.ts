import useSWR from 'swr';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';
import type { Timeline, TimelinePayload } from '~/types/bangumi/timeline';

export const useTimeline = (payload: TimelinePayload) => useSWR<Timeline, Error>(
  payload.userId
    ? `https://acgn-collection-workers.kahosan.workers.dev/timeline?userId=${payload.userId}&type=${payload.type}&page=${payload.page}`
    : `https://acgn-collection-workers.kahosan.workers.dev/timeline?type=${payload.type}&page=${payload.page}`,
  fetcher,
  {
    onError(error) {
      fetcherErrorHandler(error, '获取时间胶囊失败');
      throw error;
    }
  }
);
