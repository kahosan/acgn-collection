export interface UserInfo {
  avatar: Avatar
  sign: string
  username: string
  nickname: string
  id: number
  user_group: number
}

export interface SlimUser {
  avatar: Avatar
  group: number
  id: number
  joinedAt: number
  nickname: string
  sign: string
  username: string
}

export interface Avatar {
  large: string
  medium: string
  small: string
}
