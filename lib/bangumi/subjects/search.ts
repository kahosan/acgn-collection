import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import { useToken } from '~/hooks/use-token';

import type { LegacySearchSubject, SearchPayload, SearchSubject } from '~/types/bangumi/subject';

export function useSearch(payload: SearchPayload, offset: number, limit?: number) {
  const token = useToken();

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
        throw error;
      }
    }
  );
}

export function useLegacySearch(payload: SearchPayload, offset: number, limit?: number) {
  const _type = payload.filter?.type;
  const type = _type?.length === 1 ? _type.at(0) ?? '' : '';
  return useSWRImmutable<LegacySearchSubject, Error>(
    [`/search/subject/${payload.keyword}?max_results=${limit ?? ''}&start=${offset}&type=${type}`, { base: 'https://bgmapi.kahosan.workers.dev' }],
    fetcher,
    {
      onError(error) {
        fetcherErrorHandler(error, '搜索失败');
        throw error;
      }
    }
  );
}
