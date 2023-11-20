export enum PersonType {
  '个人' = 1,
  '公司' = 2,
  '组合' = 3
}

export interface Person {
  id: number
  name: string
  type: PersonType
  career: Array<'producer' | 'mangaka' | 'artist' | 'seiyu' | 'writer' | 'illustrator' | 'actor'>
  images: {
    large: string
    medium: string
    small: string
    grid: string
  }
  short_summary: string
  locked: boolean
}
