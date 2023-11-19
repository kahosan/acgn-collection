import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import { useToken } from '~/hooks/use-token';

import type { Episodes, EpisodesPayload } from '~/types/bangumi/episodes';

export const useEpisodes = (payload: EpisodesPayload) => {
  const [token] = useToken();
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(payload))
    params.append(key, value);

  return useSWRImmutable<Episodes>(
    token ? [`/v0/episodes?${params.toString()}`, token] : null,
    fetcher,
    {
      onError(error) {
        fetcherErrorHandler(error, '获取剧集信息失败');
      }
    }
  );
};
