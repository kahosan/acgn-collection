export interface AnitabiLite {
  id: number
  cn: string
  title: string
  city?: string
  cover: string
  color?: string
  geo?: number[]
  zoom?: number
  modified: number
  litePoints: Array<{
    id: string
    cn?: string
    name: string
    image?: string
    ep?: number
    s?: number
    geo: number[]
  }>
  pointsLength: number
  imagesLength: number
}
