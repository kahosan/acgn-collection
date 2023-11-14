import useSWRImmutable from 'swr/immutable';
import { HTTPError, fetcher, fetcherErrorHandler } from '~/lib/fetcher';

import { useUser } from '~/hooks/use-user';
import { useToken } from '~/hooks/use-token';

import type { UserSubjectCollection, UserSubjectCollectionPayload } from '~/types/bangumi/collection';

export const useUserSubjectCollections = (payload: UserSubjectCollectionPayload) => {
  const [token] = useToken();
  const { data: user } = useUser();

  const { data, isLoading, mutate, error } = useSWRImmutable<UserSubjectCollection, Error>(
    (user?.username && token) ? [`/v0/users/${user.username}/collections/${payload.subject_id}`, token] : null,
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
