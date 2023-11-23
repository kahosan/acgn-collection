import {
  Button,
  Divider,
  Input,
  Link,
  Skeleton,
  Tab,
  Tabs,
  Tooltip
} from '@nextui-org/react';

import Evaluation from './evaluation';
import CollectionModify from './collection-modify';

import { toast } from 'sonner';
import { match } from 'ts-pattern';
import { useCallback, useMemo, useState } from 'react';

import { useIsMobile } from '~/hooks/use-mobile';

import { useEpisodes } from '~/lib/bangumi/episodes/episodes';
import { useUserProgressUpdate } from '~/lib/bangumi/user/progress';
import { useUserEpisodes, useUserEpisodesPatch } from '~/lib/bangumi/user';

import type { Subject } from '~/types/bangumi/subject';
import type { UserCollection } from '~/types/bangumi/collection';
import { CollectionTypeForAnime } from '~/types/bangumi/collection';
import type { Episode, EpisodesPayload } from '~/types/bangumi/episode';
import { EpisodesType, EpisodeCollectionType } from '~/types/bangumi/episode';

interface Props {
  subject: Subject
  userCollection: UserCollection
  userCollectionMutate: () => void
}

export default function AnimeBox({ subject, userCollection, userCollectionMutate }: Props) {
  return (
    <div className="grid gap-4 sm:gap-2 h-full">
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
    </div>
  );
}

interface EpisodesProps {
  payload: EpisodesPayload
  watchedEpisode: number
  collectionType: CollectionTypeForAnime
  userCollectionMutate: () => void
}

function Episodes({ payload, watchedEpisode, collectionType, userCollectionMutate }: EpisodesProps) {
  const { data, error } = useEpisodes(payload);
  const {
    data: userData,
    mutate: userDataMutate
  } = useUserEpisodes(payload, payload.subject_id);

  const { handleUpdate, isMutating } = useUserEpisodesPatch(payload.subject_id);
  const { handleUpdate: progressUpdate, isMutating: isProgressMutating } = useUserProgressUpdate(payload.subject_id);

  const episodes = useMemo(() => {
    if (!data || !userData) return;
    const main: Array<Episode & { collectionType: EpisodeCollectionType }> = [];

    for (const ep of data.data) {
      const userEp = userData.data.find(e => e.episode.id === ep.id);
      if (userEp)
        main.push({ ...ep, collectionType: userEp.type });
    }

    return main;
  }, [data, userData]);

  const isMobile = useIsMobile();
  const [episode, setEpisode] = useState(watchedEpisode.toString());
  const [openState, setOpenState] = useState({
    isOpen: false,
    ep: 0
  });

  // TODO 这里不做 SP 的处理，因为用 v0 还是 legacy 的 API 都没办法对 SP 进行操作
  const handleUpdateEpisodeCollectionType = useCallback((key: EpisodeCollectionType, ep: number, type?: EpisodeCollectionType) => {
    if ((type && type === key) || isMutating || isProgressMutating)
      return;

    if (!Number.isInteger(ep)) {
      toast.error('请输入正确的集数');
      return;
    }

    const refreshData = () => {
      userCollectionMutate();
      userDataMutate();
    };

    if (key === EpisodeCollectionType.看到) {
      progressUpdate({
        watched_eps: ep
      }, refreshData);
    } else {
      const id = episodes?.find(e => e.ep === ep)?.id;
      const episodeId = id ? [id] : [];
      handleUpdate({
        episode_id: episodeId,
        type: key
      }, refreshData);
    }
  }, [episodes, handleUpdate, isMutating, isProgressMutating, progressUpdate, userCollectionMutate, userDataMutate]);

  if (error) throw error;

  return (
    <div>
      <div className="text-small pb-1.5">观看进度管理</div>
      {
        !episodes
          ? <Skeleton className="rounded-lg h-[4rem] w-full" />
          : episodes.map(episode => (
            <Tooltip
              key={episode.id}
              isOpen={isMobile ? openState.isOpen && openState.ep === episode.ep : undefined}
              content={
                <div className="min-w-[12rem] max-w-[20rem] p-2">
                  <Link
                    href={`https://bgm.tv/ep/${episode.id}`}
                    color="foreground"
                    className="w-full gap-1"
                    size="sm"
                    showAnchorIcon
                    isExternal
                  >
                    <span className="truncate w-full">{episode.name || '暂无标题'}</span>
                  </Link>
                  <Divider className="my-2" />
                  <div>
                    {
                      collectionType === CollectionTypeForAnime.在看
                        ? (
                          <Tabs
                            selectedKey={episode.collectionType.toString()}
                            onSelectionChange={key => handleUpdateEpisodeCollectionType(+key, episode.ep, episode.collectionType)}
                            size="sm"
                            variant="bordered"
                            className="mb-2"
                            classNames={{
                              tabList: 'rounded-md'
                            }}
                          >
                            {
                              Object.keys(EpisodeCollectionType)
                                .filter(type => Number.isInteger(Number.parseInt(type, 10)))
                                .map(type => Number.parseInt(type, 10))
                                .map(type => (
                                  episode.collectionType === EpisodeCollectionType.撤销 && type === 0
                                    ? <Tab key={type} title="未收藏" />
                                    : <Tab key={type} title={EpisodeCollectionType[type]} />
                                ))
                            }
                          </Tabs>
                        )
                        : null
                    }
                    {episode.name_cn ? <p className="truncate">中文标题：{episode.name_cn}</p> : null}
                    <p>首播：{episode.airdate}</p>
                    {episode.duration ? <p>时长：{episode.duration}</p> : null}
                  </div>
                </div>
              }>
              <Button
                className="m-1 min-h-unit-3.5 min-w-max"
                size="sm"
                radius="sm"
                color={
                  match(episode.collectionType)
                    .returnType<'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'>()
                    .with(EpisodeCollectionType.看过, () => 'primary')
                    .with(EpisodeCollectionType.想看, () => 'danger')
                    .with(EpisodeCollectionType.抛弃, () => 'secondary')
                    .otherwise(() => 'default')
                }
                onPress={() => {
                  setOpenState(p => ({
                    isOpen: p.ep === episode.ep ? !p.isOpen : true,
                    ep: episode.ep
                  }));
                }}
              >
                {episode.ep >= 10 ? episode.ep : `0${episode.ep}`}
              </Button>
            </Tooltip>
          ))
      }
      {
        collectionType !== CollectionTypeForAnime.想看
          ? (
            <>
              <Divider className="mt-2 mb-3 w-52" />
              <div className="w-[10.5rem]">
                <div className="flex gap-2">
                  <Input
                    labelPlacement="outside"
                    value={episode /** 太草台了，input 不能给 number */}
                    onValueChange={v => setEpisode(v)}
                    variant="faded"
                    radius="sm"
                    endContent={
                      <span className="text-small">/{episodes?.length}</span>
                    }
                    classNames={{
                      innerWrapper: 'items-baseline'
                    }}
                  />
                  <Button
                    radius="sm"
                    variant="faded"
                    isLoading={isMutating || isProgressMutating}
                    onPress={() => handleUpdateEpisodeCollectionType(EpisodeCollectionType.看到, Number.parseInt(episode, 10))}
                  >
                    更新
                  </Button>
                </div>
              </div>
            </>
          )
          : null
      }
    </div>
  );
}
