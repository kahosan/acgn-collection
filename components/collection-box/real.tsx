import { Episodes } from './anime';
import Evaluation from './evaluation';
import CollectionModify from './collection-modify';

import type { Subject } from '~/types/bangumi/subject';
import { EpisodesType } from '~/types/bangumi/episode';
import type { UserCollection } from '~/types/bangumi/collection';

interface Props {
  subject: Subject
  userCollection: UserCollection
  userCollectionMutate: () => void
}

export default function RealBox({ subject, userCollection, userCollectionMutate }: Props) {
  return (
    <>
      <Episodes
        key={userCollection.ep_status}
        payload={{ subject_id: subject.id, type: EpisodesType.本篇 }}
        watchedEpisode={userCollection.ep_status}
        collectionType={userCollection.type}
        userCollectionMutate={userCollectionMutate}
      />

      <Evaluation subject={subject} userCollection={userCollection} />

      <div className="self-end">
        <CollectionModify subject={subject} userCollection={userCollection} userCollectionMutate={userCollectionMutate} />
      </div>
    </>
  );
}
