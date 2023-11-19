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

import { match } from 'ts-pattern';
import { useCallback, useMemo, useState } from 'react';

import { useIsMobile } from '~/hooks/use-mobile';

import { useEpisodes } from '~/lib/bangumi/episodes/episodes';
import { useUserEpisodes, useUserEpisodesPatch } from '~/lib/bangumi/user';

import type { Subject } from '~/types/bangumi/subjects';
import type { UserCollection } from '~/types/bangumi/collection';
import { CollectionTypeForAnime } from '~/types/bangumi/collection';
import type { Episode, EpisodesPayload } from '~/types/bangumi/episodes';
import { EpisodesType, EpisodeCollectionType } from '~/types/bangumi/episodes';

interface Props {
  subject: Subject
  userCollection: UserCollection
  userCollectionMutate: () => void
}

export default function AnimeBox({ subject, userCollection, userCollectionMutate }: Props) {
  return (
    <div className="grid gap-4 sm:gap-0 h-full">
      <Episodes
        key={userCollection.ep_status}
        payload={{ subject_id: subject.id, type: EpisodesType.本篇 }}
        totalEpisode={subject.eps}
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
  totalEpisode: number
  watchedEpisode: number
  collectionType: CollectionTypeForAnime
  userCollectionMutate: () => void
}

function Episodes({ payload, totalEpisode, watchedEpisode, collectionType, userCollectionMutate }: EpisodesProps) {
  const { data, error } = useEpisodes(payload);
  const {
    data: userData,
    mutate: userDataMutate
  } = useUserEpisodes(payload, payload.subject_id);

  const { handleUpdate, isMutating } = useUserEpisodesPatch(payload.subject_id);

  const episodes = useMemo(() => {
    if (!data || !userData) return;
    const res: Array<Episode & { collectionType: EpisodeCollectionType }> = [];

    for (const ep of data.data) {
      const userEp = userData.data.find(e => e.episode.id === ep.id);
      if (userEp)
        res.push({ ...ep, collectionType: userEp.type });
    }

    return res;
  }, [data, userData]);

  const isMobile = useIsMobile();
  const [episode, setEpisode] = useState(watchedEpisode.toString());
  const [openState, setOpenState] = useState({
    isOpen: false,
    ep: 0
  });

  const handleUpdateEpisodeCollectionType = useCallback((key: EpisodeCollectionType, ep: number, type?: EpisodeCollectionType) => {
    if ((type && type === key) || isMutating)
      return;

    const refreshData = () => {
      userCollectionMutate();
      userDataMutate(
        userData
          ? {
            ...userData,
            data: userData.data.map(e => match(key)
              .when(
                k => EpisodeCollectionType.看到 === k && ep < watchedEpisode,
                () => ({ ...e, type: EpisodeCollectionType.看过 })
              )
              .when(
                k => EpisodeCollectionType.看到 === k && ep < watchedEpisode && ep < e.episode.ep,
                () => ({ ...e, type: EpisodeCollectionType.撤销 })
              )
              .when(
                () => e.episode.ep === ep,
                () => ({ ...e, type: key })
              )
              .otherwise(() => e))
          }
          : undefined
      );
    };

    match(key)
      .when(k => EpisodeCollectionType.看到 === k && ep < watchedEpisode, () => {
        // 集数小于当前观看进度时，将其它集数设为未收藏状态
        const episodeId = episodes?.filter(e => e.ep > ep).map(e => e.id) ?? [];
        handleUpdate({
          episode_id: episodeId,
          type: EpisodeCollectionType.撤销
        }, refreshData);
      })
      .when(k => EpisodeCollectionType.看到 === k, () => {
        const episodeId = episodes?.filter(e => e.ep <= ep).map(e => e.id) ?? [];
        handleUpdate({
          episode_id: episodeId,
          type: EpisodeCollectionType.看过
        }, refreshData);
      })
      .otherwise(() => {
        const id = episodes?.find(e => e.ep === ep)?.id;
        const episodeId = id ? [id] : [];
        handleUpdate({
          episode_id: episodeId,
          type: key
        }, refreshData);
      });
  }, [episodes, handleUpdate, isMutating, userCollectionMutate, userData, userDataMutate, watchedEpisode]);

  if (error) throw error;

  return (
    <div>
      <div className="text-small pb-1.5">观看进度管理</div>
      {
        !episodes
          ? <Skeleton className="rounded-lg h-[4rem] w-full" />
          : episodes.filter(e => e.type === EpisodesType.本篇).map(episode => (
            <Tooltip
              key={episode.id}
              isOpen={isMobile ? openState.isOpen && openState.ep === episode.ep : undefined}
              content={
                <div className="min-w-[12rem] max-w-[20rem] p-2">
                  <Link
                    href={`https://bgm.tv/ep/${episode.id}`}
                    color="foreground"
                    size="sm"
                    showAnchorIcon
                    isExternal
                  >
                    {episode.name || '暂无标题'}
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
                    {episode.name_cn ? <p>中文标题：{episode.name_cn}</p> : null}
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
                {
                  episode.ep >= 10
                    ? episode.ep
                    : `0${episode.ep}`
                }
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
                      <span className="text-small">/{totalEpisode}</span>
                    }
                    classNames={{
                      innerWrapper: 'items-baseline'
                    }}
                  />
                  <Button
                    radius="sm"
                    variant="faded"
                    isLoading={isMutating}
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
