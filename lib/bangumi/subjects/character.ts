import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import { useToken } from '~/hooks/use-token';

import type { Characters } from '~/types/bangumi/character';

export const useCharacters = (subjectId: number) => {
  const [token] = useToken();

  return useSWRImmutable<Characters, Error>(
    token ? [`/v0/subjects/${subjectId}/characters`, token] : null,
    fetcher,
    {
      onError(e) {
        fetcherErrorHandler(e, '获取角色列表失败');
      }
    }
  );
};
