import type { SlimUser } from './user';

export interface Notify {
  data: Notice[]
  total: number
}

export interface Notice {
  createdAt: number // unix timestamp in seconds
  id: number
  postID: number
  sender: SlimUser
  title: string
  topicID: number
  type: number
  unread: boolean
}
