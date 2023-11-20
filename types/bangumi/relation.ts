import type { SubjectType } from './subjects';

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
