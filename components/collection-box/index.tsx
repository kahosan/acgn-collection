import { motion } from 'framer-motion';

import BookBox from './book';
import GameBox from './game';
import RealBox from './real';
import MusicBox from './music';
import AnimeBox from './anime';
import UnCollection from './un-collection';
import CollectionBoxSkeleton from './skeleton';

import { match } from 'ts-pattern';

import { useUserSubjectCollections } from '~/lib/bangumi/user';
import { HTTPError } from '~/lib/fetcher';

import { SubjectType } from '~/types/bangumi/subjects';
import type { Subject } from '~/types/bangumi/subjects';

interface Props {
  subjectData: Subject
}

export default function CollectionBox({ subjectData }: Props) {
  const { data, isLoading, mutate, error } = useUserSubjectCollections({ subject_id: subjectData.id.toString() });

  if (error && error instanceof HTTPError && error.status !== 404) throw error;
  if (isLoading) return <CollectionBoxSkeleton />;

  const componentProps = {
    subjectData,
    mutate
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {
        !data
          ? <UnCollection subjectId={subjectData.id} subjectType={subjectData.type} mutate={mutate} />
          : match(subjectData.type)
            .with(SubjectType.书籍, () => <BookBox {...componentProps} userSubjectData={data} />)
            .with(SubjectType.动画, () => <AnimeBox {...componentProps} userSubjectData={data} />)
            .with(SubjectType.音乐, () => <MusicBox {...componentProps} userSubjectData={data} />)
            .with(SubjectType.游戏, () => <GameBox {...componentProps} userSubjectData={data} />)
            .with(SubjectType.三次元, () => <RealBox {...componentProps} userSubjectData={data} />)
            .otherwise(() => null)
      }
    </motion.div>
  );
}
