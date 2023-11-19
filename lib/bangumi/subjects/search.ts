import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import { useToken } from '~/hooks/use-token';

import type { SearchPayload, SearchSubject } from '~/types/bangumi/subjects';

export const useSearch = (payload: SearchPayload, offset: number, limit?: number) => {
  const [token] = useToken();

  const options: (token: string) => RequestInit = (token: string) => {
    return {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };
  };

  return useSWRImmutable<SearchSubject, Error>(
    token ? [`/v0/search/subjects?limit=${limit ?? ''}&offset=${offset}`, options(token)] : null,
    fetcher,
    {
      onError(error) {
        fetcherErrorHandler(error, '搜索失败');
      }
    }
  );
};
