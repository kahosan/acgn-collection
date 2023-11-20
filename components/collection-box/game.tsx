import type { Subject } from '~/types/bangumi/subject';
import type { UserCollection } from '~/types/bangumi/collection';

interface Props {
  subject: Subject
  userCollection: UserCollection
  userCollectionMutate: () => void
}

export default function GameBox({ subject, userCollection, userCollectionMutate }: Props) {
  return (
    <div>
      已收藏
    </div>
  );
}
