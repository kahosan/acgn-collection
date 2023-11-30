import type { Subject } from '~/types/bangumi/subject';
import type { UserCollection } from '~/types/bangumi/collection';
import CollectionModify from './collection-modify';
import Evaluation from './evaluation';

interface Props {
  subject: Subject
  userCollection: UserCollection
  userCollectionMutate: () => void
}

export default function MusicBox({ subject, userCollection, userCollectionMutate }: Props) {
  return (
    <>
      <Evaluation subject={subject} userCollection={userCollection} />

      <div className="self-end">
        <CollectionModify subject={subject} userCollection={userCollection} userCollectionMutate={userCollectionMutate} />
      </div>
    </>
  );
}
