import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import type { SearchPayload, SearchSubject } from '~/types/bangumi/subjects';

export const useSearch = (payload: SearchPayload, offset: number, limit?: number) => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return useSWRImmutable<SearchSubject, Error>(
    [`/v0/search/subjects?limit=${limit ?? ''}&offset=${offset}`, options],
    fetcher,
    {
      onError(error) {
        fetcherErrorHandler(error, '搜索失败');
      }
    }
  );
};
