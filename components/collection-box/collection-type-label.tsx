import { clsx } from 'clsx';
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
        'absolute left-[12px] top-3 py-0.5 px-2.5 rounded-xs rounded-tl-md rounded-br-md text-sm font-medium',
        match(userCollection?.type)
          .with(1, () => 'bg-red-400 text-red-100 drop-shadow-[2px_3px_3px_#c71c1c]')
          .with(2, () => 'bg-blue-400 text-blue-100 drop-shadow-[2px_3px_3px_#3c82d2]')
          .with(3, () => 'bg-indigo-400 text-indigo-100 drop-shadow-[2px_3px_3px_#5057ac]')
          .with(4, () => 'bg-orange-400 text-orange-100 drop-shadow-[2px_3px_3px_#de7500]')
          .with(5, () => 'bg-stone-400 text-stone-100 drop-shadow-[2px_3px_3px_#9a938e]')
          .otherwise(() => 'bg-gray-400 text-gray-100 drop-shadow-[2px_3px_3px_gray]')
      )}
    >
      {
        userCollection
          ? getCollectionTypeBySubjectType(userCollection.subject_type)[userCollection.type]
          : '未收藏'
      }
    </div>
  );
}
