import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import type { Subject } from '~/types/subjects';

export const useSubject = (id: string) => useSWRImmutable<Subject, Error>(
  `/v0/subjects/${id}`,
  fetcher,
  {
    onError(error) {
      fetcherErrorHandler(error, '获取条目失败');
    }
  }
);
