import { Button, Input } from '@nextui-org/react';

import Evaluation from './evaluation';
import CollectionModify from './collection-modify';

import { useState } from 'react';

import { useUserProgressUpdate } from '~/lib/bangumi/user/progress';

import type { Subject } from '~/types/bangumi/subject';
import type { UserCollection } from '~/types/bangumi/collection';
import type { EpisodesPayload } from '~/types/bangumi/episode';

interface Props {
  subject: Subject
  userCollection: UserCollection
  userCollectionMutate: () => void
}

export default function BookBox({ subject, userCollection, userCollectionMutate }: Props) {
  return (
    <div className="grid gap-4 sm:gap-0 h-full">
      {
        userCollection.type === 1
          ? null
          : (
            <Episodes
              key={userCollection.ep_status + userCollection.vol_status}
              payload={{ subject_id: subject.id }}
              totalEpisode={subject.eps}
              watchedEpisode={userCollection.ep_status}
              totalVolume={subject.volumes}
              watchedVolume={userCollection.vol_status}
              userCollectionMutate={userCollectionMutate}
            />
          )
      }

      <Evaluation subject={subject} userCollection={userCollection} />

      <div className="self-end">
        <CollectionModify subject={subject} userCollection={userCollection} userCollectionMutate={userCollectionMutate} />
      </div>
    </div>
  );
}

interface EpisodesProps {
  payload: EpisodesPayload
  totalEpisode: number
  watchedEpisode: number
  totalVolume: number
  watchedVolume: number
  userCollectionMutate: () => void
}

function Episodes({ payload, totalEpisode, watchedEpisode, totalVolume, watchedVolume, userCollectionMutate }: EpisodesProps) {
  const { handleUpdate, isMutating } = useUserProgressUpdate(payload.subject_id);

  const [episode, setEpisode] = useState(watchedEpisode.toString());
  const [volume, setVolume] = useState(watchedVolume.toString());

  const handleSave = () => {
    if (isMutating) return;

    handleUpdate({
      watched_eps: +episode,
      watched_vols: +volume
    }, userCollectionMutate);
  };

  // TODO fix api

  return (
    <div>
      <div className="text-small pb-1.5">观看进度管理</div>
      <div className="w-[14rem]">
        {['Chap', 'Vol'].map(type => (
          <div className="flex gap-2 m-1" key={type}>
            <Input
              labelPlacement="outside"
              value={type === 'Chap' ? episode : volume}
              onValueChange={v => (type === 'Chap' ? setEpisode(v) : setVolume(v))}
              variant="faded"
              radius="sm"
              startContent={
                <span className="text-xs min-w-[1.85rem]">{type}</span>
              }
              endContent={
                <span className="text-small">/{type === 'Chap' ? totalEpisode : totalVolume}</span>
              }
              className="w-[8rem]"
              classNames={{
                innerWrapper: 'items-baseline'
              }}
            />
            {type === 'Vol'
              ? (
                <Button
                  radius="sm"
                  variant="faded"
                  isLoading={isMutating}
                  onPress={() => handleSave()}
                >
                  保存
                </Button>
              )
              : null}
          </div>
        ))}
      </div>
    </div>
  );
}
