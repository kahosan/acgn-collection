import { useSession } from 'next-auth/react';
import useSWRImmutable from 'swr/immutable';
import { fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import type { Characters } from '~/types/bangumi/character';

export const useCharacters = (subjectId: number) => {
  const { data } = useSession();

  return useSWRImmutable<Characters, Error>(
    data?.token ? [`/v0/subjects/${subjectId}/characters`, data.token] : null,
    fetcher,
    {
      onError(e) {
        fetcherErrorHandler(e, '获取角色列表失败');
        throw e;
      }
    }
  );
};
