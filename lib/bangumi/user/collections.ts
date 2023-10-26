import useSWRImmutable from 'swr/immutable';
import { useToken } from '~/hooks/use-token';
import { useUser } from '~/hooks/use-user';

import { fetcherErrorHandler, fetcherWithAuth } from '~/lib/fetcher';

import type { UserCollection, UserCollectionPayload } from '~/types/collection';

export const useUserCollections = (payload: UserCollectionPayload) => {
  const [token] = useToken();
  const { data: user } = useUser();

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(payload))
    params.set(key, value);

  const { data, isLoading, mutate, error } = useSWRImmutable<UserCollection, Error>(
    (user?.username && token) ? [`/v0/users/${user.username}/collections?${params.toString()}`, token] : null,
    fetcherWithAuth,
    {
      onError(error) {
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
