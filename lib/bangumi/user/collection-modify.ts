import useSWRMutation from 'swr/mutation';
import { HTTPError, fetcher } from '~/lib/fetcher';

import { toast } from 'sonner';
import { useToken } from '~/hooks/use-token';

import type { UserCollectionModifyPayload } from '~/types/bangumi/collection';

export const useUserCollectionModify = (subjectId: number) => {
  const token = useToken();
  const { trigger, isMutating } = useSWRMutation(
    token ? [`/v0/users/-/collections/${subjectId}`, token] : null,
    fetcher
  );

  const handleModify = (payload: UserCollectionModifyPayload, refreshData: () => void) => {
    const fn = async () => {
      await trigger(payload);
      refreshData();
    };

    toast.promise(fn, {
      success: '修改或新增收藏成功',
      loading: '正在修改或新增收藏...',
      error(e) {
        if (e instanceof HTTPError)
          return `修改或新增收藏失败：${e.data.description}`;

        return '修改或新增收藏失败';
      }
    });
  };

  return {
    handleModify,
    isMutating
  };
};
