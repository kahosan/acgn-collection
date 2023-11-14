import useSWRMutation from 'swr/mutation';
import { fetcherErrorHandler, fetcherWithAuthMutation } from '~/lib/fetcher';

import { toast } from 'sonner';
import { useToken } from '~/hooks/use-token';

import type { UserSubjectCollectionModifyPayload } from '~/types/bangumi/collection';

export const useAddUserCollection = (payload: UserSubjectCollectionModifyPayload, subjectId: number) => {
  const [token] = useToken();
  const { trigger, isMutating } = useSWRMutation(
    token ? [`/v0/users/-/collections/${subjectId}`, token] : null,
    fetcherWithAuthMutation
  );

  const handleAdd = async () => {
    try {
      await trigger<UserSubjectCollectionModifyPayload>(payload);
      toast.success('新增收藏成功');
    } catch (e) {
      fetcherErrorHandler(e as Error, '新增收藏失败');
    }
  };

  return {
    handleAdd,
    isMutating
  };
};
