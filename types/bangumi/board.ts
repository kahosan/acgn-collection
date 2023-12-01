export type Board = Array<{
  id: number
  title: string
  user: {
    href: string
    name: string
  }
  replies: number
  time: string
}>;
