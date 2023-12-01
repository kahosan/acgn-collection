export interface Comment {
  user: {
    href: string
    avatar: string
    name: string
  }
  stars?: number
  published: string
  comment: string
}

export type Comments = Comment[];
