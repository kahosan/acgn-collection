import { UnCollection } from './un-collection';

import type { Subject } from '~/types/bangumi/subjects';
import type { UserSubjectCollection } from '~/types/bangumi/collection';

interface Props {
  subjectData: Subject
  userSubjectData: UserSubjectCollection | undefined
  mutate: () => void
}

export default function AnimeBox({ subjectData, userSubjectData, mutate }: Props) {
  return !userSubjectData
    ? <UnCollection subjectId={subjectData.id} subjectType={subjectData.type} mutate={mutate} />
    : (
      <div>
        已收藏
      </div>
    );
}
