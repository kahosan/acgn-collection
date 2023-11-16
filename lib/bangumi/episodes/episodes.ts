import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import type { Episodes, EpisodesPayload } from '~/types/bangumi/episodes';

export const useEpisodes = (payload: EpisodesPayload) => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(payload))
    params.append(key, value);

  return useSWRImmutable<Episodes>(
    `/v0/episodes?${params.toString()}`,
    fetcher,
    {
      onError(error) {
        fetcherErrorHandler(error, '获取剧集信息失败');
      }
    }
  );
};
