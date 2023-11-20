import type { SubjectType } from './subject';

export interface Relation {
  id: number
  type: SubjectType
  name: string
  name_cn: string
  images: {
    large: string
    common: string
    medium: string
    small: string
    grid: string
  }
  relation: string
}

export type Relations = Relation[];
