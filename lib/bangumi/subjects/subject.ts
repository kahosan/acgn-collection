import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import { useToken } from '~/hooks/use-token';

import type { Subject } from '~/types/bangumi/subject';

export const useSubject = (id: string) => {
  const token = useToken();

  return useSWRImmutable<Subject, Error>(
    token ? [`/v0/subjects/${id}`, token] : null,
    fetcher,
    {
      onError(error) {
        fetcherErrorHandler(error, '获取条目失败');
        throw error;
      }
    }
  );
};
