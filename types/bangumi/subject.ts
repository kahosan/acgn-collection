export enum SubjectType {
  '书籍' = 1,
  '动画' = 2,
  '音乐' = 3,
  '游戏' = 4,
  '三次元' = 6
}

// request
export interface SearchPayload {
  keyword: string
  sort?: 'match' | 'heat' | 'rank' | 'score'
  filter?: {
    type?: SubjectType[]
    tag?: string[] // example: List [ "童年", "原创" ]
    air_date?: string[] // example: List [ ">=2020-07-01", "<2020-10-01" ]
    rating?: string[] // example: List [ ">=6", "<8" ]
    rank?: string[] // example: List [ ">10", "<=18" ]
    nsfw?: boolean // 默认或者 null 会返回包含 R18 的所有搜索结果。true 只会返回 R18 条目。false 只会返回非 R18 条目。
  }
}

// response

export type Calendar = Array<{
  weekday: {
    en: string
    cn: string
    ja: string
    id: number
  }
  items: LegacySubject[]
}>;

export interface LegacySubject {
  id: number
  url: string
  type: SubjectType
  name: string
  name_cn: string
  summary: string
  air_date: string
  air_weekday: number
  images?: {
    large: string
    common: string
    medium: string
    small: string
    grid: string
  }
  collection?: {
    doing: number
  }
  rating?: {
    total: number
    count: {
      '10': number
      '9': number
      '8': number
      '7': number
      '6': number
      '5': number
      '4': number
      '3': number
      '2': number
      '1': number
    }
    score: number
  }
  rank?: number
}

export interface Subject {
  date: string
  platform: string
  images: {
    small: string
    grid: string
    large: string
    medium: string
    common: string
  }
  summary: string
  name: string
  name_cn: string
  tags: Array<{
    name: string
    count: number
  }>
  infobox: Array<{
    key: string
    value: string | Array<Record<'v', string>>
  }>
  rating: {
    rank: number
    total: number
    count: {
      '1': number
      '2': number
      '3': number
      '4': number
      '5': number
      '6': number
      '7': number
      '8': number
      '9': number
      '10': number
    }
    score: number
  }
  total_episodes: number
  collection: {
    on_hold: number
    dropped: number
    wish: number
    collect: number
    doing: number
  }
  id: number
  eps: number
  volumes: number
  locked: boolean
  nsfw: boolean
  type: SubjectType
}

export type SlimSubject = Pick<Subject, 'id' | 'type' | 'name' | 'name_cn' | 'date' | 'images' | 'volumes' | 'eps' | 'tags'> & {
  short_summary: string
  collection_total: number
  score: number
};

export interface SearchSubject {
  data: Array<{
    date: string
    image: string
    type: number
    summary: string
    name: string
    name_cn: string
    tags: Array<{
      name: string
      count: number
    }>
    score: number
    id: number
    rank: number
  }>
  total: number
  limit: number
  offset: number
}

export interface LegacySearchSubject {
  results: number
  list: Array<{
    id: number
    url: string
    type: number
    name: string
    name_cn: string
    summary: string
    air_date: string
    air_weekday: number
    images: {
      large: string
      common: string
      medium: string
      small: string
      grid: string
    }
  }>
}
