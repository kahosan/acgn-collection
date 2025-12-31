import useSWRImmutable from 'swr/immutable';

import { fetcher } from '~/lib/fetcher';

import type { AnitabiLite } from '~/types/anitabi/lite';

export function useAnitabi(id: number) {
  return useSWRImmutable<AnitabiLite, Error>(
    `https://api.anitabi.cn/bangumi/${id}/lite`,
    fetcher,
    { shouldRetryOnError: false }
  );
}
