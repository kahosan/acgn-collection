import type { Subject } from '~/types/bangumi/subjects';
import type { UserSubjectCollection } from '~/types/bangumi/collection';

interface Props {
  subjectData: Subject
  userSubjectData: UserSubjectCollection
  mutate: () => void
}

export default function GameBox({ subjectData, userSubjectData, mutate }: Props) {
  return (
    <div>
      已收藏
    </div>
  );
}
