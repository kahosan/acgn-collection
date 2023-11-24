import useSWRImmutable from 'swr/immutable';
import { HTTPError, fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import { useUser } from '~/hooks/use-user';
import { useToken } from '~/hooks/use-token';

import type { UserCollection } from '~/types/bangumi/collection';

export const useUserCollection = (subjectId: number) => {
  const token = useToken();
  const user = useUser();

  const { data, isLoading, mutate, error } = useSWRImmutable<UserCollection, Error>(
    (user?.username && token) ? [`/v0/users/${user.username}/collections/${subjectId}`, token] : null,
    fetcher,
    {
      shouldRetryOnError: false,
      onError(error) {
        if (!(error instanceof HTTPError && error.status === 404))
          fetcherErrorHandler(error, '收藏获取失败');
      }
    }
  );

  return {
    data,
    isLoading,
    mutate,
    error
  };
};
