import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import { useToken } from '~/hooks/use-token';

import type { LegacySearchSubject, SearchPayload, SearchSubject } from '~/types/bangumi/subjects';

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

export const useLegacySearch = (payload: SearchPayload, offset: number, limit?: number) => {
  const _type = payload.filter?.type;
  const type = _type?.length === 1 ? _type.at(0) ?? '' : '';
  return useSWRImmutable<LegacySearchSubject, Error>(
    [`/search/api?keyword=${payload.keyword}&max_results=${limit ?? ''}&start=${offset}&type=${type}`, { base: '/' }],
    fetcher,
    {
      onError(error) {
        fetcherErrorHandler(error, '搜索失败');
      }
    }
  );
};
