import type { Person } from './person';

export enum CharacterType {
  '角色' = 1,
  '机体' = 2,
  '舰船' = 3,
  '组织' = 4
}

export interface Character {
  id: number
  name: string
  type: CharacterType
  images: {
    large: string
    medium: string
    small: string
    grid: string
  }
  relation: string
  actors: Person[]
}

export type Characters = Character[];
