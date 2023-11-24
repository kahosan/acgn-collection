import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import { useToken } from '~/hooks/use-token';

import type { Relations } from '~/types/bangumi/relation';

export const useRelations = (subjectId: number) => {
  const token = useToken();

  return useSWRImmutable<Relations, Error>(
    token ? [`/v0/subjects/${subjectId}/subjects`, token] : null,
    fetcher,
    {
      onError(e) {
        fetcherErrorHandler(e, '获取关联条目失败');
      }
    }
  );
};
