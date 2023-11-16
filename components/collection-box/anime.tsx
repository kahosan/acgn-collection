import {
  Button,
  ButtonGroup,
  Chip,
  Divider,
  Input,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Tab,
  Tabs,
  Tooltip,
  useDisclosure
} from '@nextui-org/react';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';

import { match } from 'ts-pattern';
import { useMemo, useState } from 'react';

import { useIsMobile } from '~/hooks/use-mobile';

import { useEpisodes } from '~/lib/bangumi/episodes/episodes';
import { useModifyUserCollection, useUserEpisodes, useUserEpisodesPatch } from '~/lib/bangumi/user';

import type { Subject } from '~/types/bangumi/subjects';
import { CollectionTypeForAnime } from '~/types/bangumi/collection';
import type { UserSubjectCollection, UserSubjectCollectionModifyPayload } from '~/types/bangumi/collection';
import type { Episode, EpisodesPayload } from '~/types/bangumi/episodes';
import { EpisodesType, EpisodeCollectionType } from '~/types/bangumi/episodes';
import ModifyModal from './modal';

interface Props {
  subjectData: Subject
  userSubjectData: UserSubjectCollection
  mutate: () => void
}

export default function AnimeBox({ subjectData, userSubjectData, mutate }: Props) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { handleModify, isMutating } = useModifyUserCollection(subjectData.id);

  const handleUpdate = (payload: UserSubjectCollectionModifyPayload, cb: () => void) => {
    handleModify(payload, () => {
      mutate();
      cb();
    });
  };

  return (
    <div className="grid gap-4 sm:gap-0 h-full">
      <Episodes payload={{ subject_id: subjectData.id }} totalEpisode={subjectData.eps} collectionType={userSubjectData.type} />

      <div>
        <div className="text-sm pb-1.5">我的评价</div>
        <Rate
          className="[&_li.rc-rate-star-zero.rc-rate-star]:text-[#f8b0405c] [&_li.rc-rate-star.rc-rate-star-half]:text-[#f8b0405c]"
          value={userSubjectData.rate / 2}
          count={10}
          character={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
          }
          disabled
          allowHalf
        />
      </div>

      <div>
        <div className="text-sm pb-1.5">社区评价</div>
        <div className="flex flex-row gap-2">
          <Chip radius="sm" color="primary" startContent={<div className="p-2">评分数</div>}>{subjectData.rating.total}</Chip>
          <Chip radius="sm" color="secondary" startContent={<div className="p-2">排名</div>}>{subjectData.rating.rank}</Chip>
          <Chip radius="sm" color="danger" startContent={<div className="p-2">用户评分</div>}>{subjectData.rating.score}</Chip>
        </div>
        <Divider className="my-2 max-w-96" />
        <Link href={`https://bgm.tv/subject/${subjectData.id}/stats`} isExternal showAnchorIcon size="sm">全站用户评价</Link>
      </div>

      <div className="self-end">
        <ButtonGroup fullWidth radius="sm">
          <Button variant="faded" onClick={onOpen}>修改</Button>
          <Popover>
            <PopoverTrigger>
              <Button color="danger">删除</Button>
            </PopoverTrigger>
            <PopoverContent className="p-4 px-6">
              <div>API 没实现啦，呜呜呜</div>
              {/* <div>确定要删除收藏吗？</div>
              <Divider className="my-2" />
              <ButtonGroup size="sm" radius="sm" fullWidth>
                <Button color="primary" isLoading={isMutating}>确定</Button>
              </ButtonGroup> */}
            </PopoverContent>
          </Popover>
        </ButtonGroup>
      </div>

      <ModifyModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        userSubjectData={userSubjectData}
        handleUpdate={handleUpdate}
        isMutating={isMutating}
      />
    </div>
  );
}

interface EpisodesProps {
  payload: EpisodesPayload
  totalEpisode: number
  collectionType: CollectionTypeForAnime
}

function Episodes({ payload, totalEpisode, collectionType }: EpisodesProps) {
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
  const [episode, setEpisode] = useState('');
  const [openState, setOpenState] = useState({
    isOpen: false,
    ep: 0
  });

  const handleUpdateEpisodeCollectionType = (key: EpisodeCollectionType, ep: number, type?: EpisodeCollectionType) => {
    if ((type && type === key) || isMutating)
      return;

    const refreshData = () => {
      userDataMutate(
        userData
          ? {
            ...userData,
            data: userData.data.map(e => {
              if (e.episode.ep === ep)
                return { ...e, type: key };
              return e;
            })
          }
          : undefined
      );
    };

    if (key === EpisodeCollectionType.看到) {
      const episodeId = episodes?.filter(e => e.ep <= ep).map(e => e.id) ?? [];
      handleUpdate({
        episode_id: episodeId,
        type: EpisodeCollectionType.看过
      }, refreshData);
    } else {
      const id = episodes?.find(e => e.ep === ep)?.id;
      const episodeId = id ? [id] : [];
      handleUpdate({
        episode_id: episodeId,
        type: key
      }, refreshData);
    }
  };

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
                onClick={() => {
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
              <div className="w-48">
                <div className="flex gap-2">
                  <Input
                    labelPlacement="outside"
                    placeholder="剧集"
                    value={episode /** 太草台了，input 不能给 number */}
                    onValueChange={v => setEpisode(v)}
                    variant="faded"
                    radius="sm"
                    endContent={
                      <div className="text-sm min-w-max">/{totalEpisode}</div>
                    }
                  />
                  <Button
                    radius="sm"
                    variant="faded"
                    isLoading={isMutating}
                    onClick={() => handleUpdateEpisodeCollectionType(EpisodeCollectionType.看到, Number.parseInt(episode, 10))}
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
