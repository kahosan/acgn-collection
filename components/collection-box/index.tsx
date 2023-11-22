import { motion } from 'framer-motion';

import BookBox from './book';
import GameBox from './game';
import RealBox from './real';
import MusicBox from './music';
import AnimeBox from './anime';
import UnCollection from './un-collection';
import CollectionBoxSkeleton from './skeleton';

import { match } from 'ts-pattern';

import { useUserCollection } from '~/lib/bangumi/user';
import { HTTPError } from '~/lib/fetcher';

import { SubjectType } from '~/types/bangumi/subject';
import type { Subject } from '~/types/bangumi/subject';

interface Props {
  subject: Subject
}

export default function CollectionBox({ subject }: Props) {
  const { data, isLoading, mutate, error } = useUserCollection(subject.id);

  if (error && error instanceof HTTPError && error.status !== 404) throw error;
  if (isLoading) return <CollectionBoxSkeleton />;

  const componentProps = {
    subject,
    userCollectionMutate: mutate
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {
        !data
          ? <UnCollection subject={subject} mutate={mutate} />
          : match(subject.type)
            .with(SubjectType.书籍, () => <BookBox {...componentProps} userCollection={data} />)
            .with(SubjectType.动画, () => <AnimeBox {...componentProps} userCollection={data} />)
            .with(SubjectType.音乐, () => <MusicBox {...componentProps} userCollection={data} />)
            .with(SubjectType.游戏, () => <GameBox {...componentProps} userCollection={data} />)
            .with(SubjectType.三次元, () => <RealBox {...componentProps} userCollection={data} />)
            .otherwise(() => null)
      }
    </motion.div>
  );
}
