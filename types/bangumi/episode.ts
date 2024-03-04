export enum EpisodesType {
  本篇 = 0,
  SP = 1,
  OP = 2,
  ED = 3,
  '预告/宣传/广告' = 4,
  MAD = 5,
  其他 = 6
}

export enum EpisodeCollectionType {
  撤销 = 0, // 未收藏
  想看 = 1,
  看过 = 2,
  看到 = 5,
  抛弃 = 3
}

export interface EpisodesPayload {
  subject_id: number
  type?: EpisodesType
  // default 100
  limit?: number
  offset?: number
}

export interface Episodes {
  total: number
  limit: number
  offset: number
  data: Episode[]
}

export interface Episode {
  id: number
  type: EpisodesType
  name: string
  name_cn: string
  sort: number
  ep: number
  airdate: string
  comment: number
  duration: string
  desc: string
  disc: number
  duration_seconds: number
}

export type UserEpisodePayload = Omit<EpisodesPayload, 'subject_id'>;

export interface UserEpisode {
  total: number
  limit: number
  offset: number
  data: Array<{
    episode: Episode
    type: EpisodeCollectionType
  }>
}

export interface UserEpisodePatchPayload {
  episode_id: number[]
  type: EpisodeCollectionType
}

export interface UserProgressPayload {
  watched_eps: number
  watched_vols?: number
}
