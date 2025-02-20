import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import { useToken } from '~/hooks/use-token';

import type { Notify } from '~/types/bangumi/notify';

export function useNotify() {
  const token = useToken();

  return useSWRImmutable<Notify>(
    token ? ['https://acgn-collection-workers.kahosan.workers.dev/next/p1/notify?limit=20&unread=true', token] : null,
    fetcher,
    {
      onError(error) {
        fetcherErrorHandler(error, '获取未读通知失败');
      }
    }
  );
}
