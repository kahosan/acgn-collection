import type { SlimSubject, SubjectType } from './subjects';

export enum CollectionType {
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

// Request

export interface UserCollectionPayload {
  subject_type?: SubjectType
  type?: CollectionType
  limit?: number
  offset?: number
}

export interface UserSubjectCollectionPayload {
  subject_id: string
}

export interface UserSubjectCollectionModifyPayload {
  type?: CollectionType
  rate?: number
  ep_status?: number
  vol_status?: number
  comment?: string
  private?: boolean
  tags?: string[]
}

// Response

export interface UserCollection {
  data: UserSubjectCollection[]
  total: number
  limit: number
  offset: number
}

export interface UserSubjectCollection {
  updated_at: string
  comment?: string
  tags: string[]
  subject: SlimSubject
  subject_id: number
  vol_status: number
  ep_status: number
  subject_type: SubjectType
  type: CollectionType
  rate: number
  private: boolean
}

export type UserSubjectCollectionModify = null;
