import type { Subject } from '~/types/bangumi/subjects';
import type { UserCollection } from '~/types/bangumi/collection';

interface Props {
  subject: Subject
  userCollection: UserCollection
  userCollectionMutate: () => void
}

export default function RealBox({ subject, userCollection, userCollectionMutate }: Props) {
  return (
    <div>
      已收藏
    </div>
  );
}
