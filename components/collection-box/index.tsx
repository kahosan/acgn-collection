import BookBox from './book';
import GameBox from './game';
import RealBox from './real';
import MusicBox from './music';
import AnimeBox from './anime';

import { match } from 'ts-pattern';

import { useUserSubjectCollections } from '~/lib/bangumi/user';
import { HTTPError } from '~/lib/fetcher';

import type { Subject } from '~/types/bangumi/subjects';
import { SubjectType } from '~/types/bangumi/subjects';

interface Props {
  subjectData: Subject
}

export default function CollectionBox({ subjectData }: Props) {
  const { data, isLoading, mutate, error } = useUserSubjectCollections({ subject_id: subjectData.id.toString() });

  if (error && error instanceof HTTPError && error.status !== 404) throw error;
  if (isLoading) return null;

  const updateUserData = () => {
    mutate();
  };

  const componentProps = {
    subjectData,
    userSubjectData: data,
    mutate: updateUserData
  };

  return match(subjectData.type)
    .with(SubjectType.书籍, () => <BookBox {...componentProps} />)
    .with(SubjectType.动画, () => <AnimeBox {...componentProps} />)
    .with(SubjectType.音乐, () => <MusicBox {...componentProps} />)
    .with(SubjectType.游戏, () => <GameBox {...componentProps} />)
    .with(SubjectType.三次元, () => <RealBox {...componentProps} />)
    .otherwise(() => null);
}
