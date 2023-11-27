import clsx from 'clsx';
import { match } from 'ts-pattern';

import { getCollectionTypeBySubjectType } from '~/utils';

import type { UserCollection } from '~/types/bangumi/collection';

interface Props {
  userCollection: UserCollection | undefined
}

export default function CollectionTypeLabel({ userCollection }: Props) {
  return (
    <div
      className={clsx(
        'absolute left-[12px] top-3 py-0.5 px-2.5 rounded-sm rounded-tl-md rounded-br-md text-sm font-medium text-white',
        match(userCollection?.type)
          .with(1, () => 'bg-pink-500')
          .with(2, () => 'bg-fuchsia-500')
          .with(3, () => 'bg-indigo-500')
          .with(4, () => 'bg-emerald-500')
          .with(5, () => 'bg-sky-500')
          .otherwise(() => 'bg-gray-500')
      )}
    >
      {
        !userCollection
          ? '未收藏'
          : getCollectionTypeBySubjectType(userCollection.subject_type)[userCollection.type]
      }
    </div>
  );
}
