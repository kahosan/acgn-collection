export type Reviews = Review[];

export interface Review {
  id: number
  title: string
  user: {
    href: string
    avatar: string
    name: string
  }
  time: string
  replies: number
  content: string
}
