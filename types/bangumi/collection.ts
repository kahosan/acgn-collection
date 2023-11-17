import type { SlimSubject, SubjectType } from './subjects';

export enum CollectionTypeForAnime {
  '想看' = 1,
  '看过' = 2,
  '在看' = 3,
  '搁置' = 4,
  '抛弃' = 5
}

export enum CollectionTypeForGame {
  '想玩' = 1,
  '玩过' = 2,
  '在玩' = 3,
  '搁置' = 4,
  '抛弃' = 5
}

export enum CollectionTypeForBook {
  '想读' = 1,
  '读过' = 2,
  '在读' = 3,
  '搁置' = 4,
  '抛弃' = 5
}

export enum CollectionTypeForMusic {
  '想听' = 1,
  '听过' = 2,
  '在听' = 3,
  '搁置' = 4,
  '抛弃' = 5
}

// Request

export interface UserCollectionsPayload {
  subject_type?: SubjectType
  type?: number
  limit?: number
  offset?: number
}

export interface UserCollectionModifyPayload {
  type?: number
  rate?: number
  ep_status?: number
  vol_status?: number
  comment?: string
  private?: boolean
  tags?: string[]
}

// Response

export interface UserCollections {
  data: UserCollection[]
  total: number
  limit: number
  offset: number
}

export interface UserCollection {
  updated_at: string
  comment?: string
  tags: string[]
  subject: SlimSubject
  subject_id: number
  vol_status: number
  ep_status: number
  subject_type: SubjectType
  type: number
  rate: number
  private: boolean
}
