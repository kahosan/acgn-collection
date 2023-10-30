export type TimelineScope = 'all' | 'me';

export const timelineTypeMap: Array<{ label: TimelineType, text: string }> = [
  {
    label: '',
    text: '默认'
  },
  {
    label: 'all',
    text: '全部'
  },
  {
    label: 'say',
    text: '吐槽'
  },
  {
    label: 'subject',
    text: '收藏'
  },
  {
    label: 'progress',
    text: '进度'
  },
  {
    label: 'blog',
    text: '日志'
  },
  {
    label: 'mono',
    text: '人物'
  },
  {
    label: 'relation',
    text: '好友'
  },
  {
    label: 'group',
    text: '小组'
  },
  {
    label: 'wiki',
    text: '维基'
  },
  {
    label: 'index',
    text: '目录'
  }
];

/**
 * @description The label and value of TimelineType are as follows:
 * - 'all': 全站
 * - 'say': 吐槽
 * - 'subject': 收藏
 * - 'progress': 进度
 * - 'blog': 日志
 * - 'mono': 人物
 * - 'relation': 好友
 * - 'group': 小组
 * - 'wiki': 维基
 * - 'index': 目录
 */
export type TimelineType =
  | 'all'
  | 'say'
  | 'subject'
  | 'progress'
  | 'blog'
  | 'mono'
  | 'relation'
  | 'group'
  | 'wiki'
  | 'index'
  | '';

export interface TimelinePayload {
  userId?: string
  /**
 * @description The label and value of TimelineType are as follows:
 * - 'all': 全站
 * - 'say': 吐槽
 * - 'subject': 收藏
 * - 'progress': 进度
 * - 'blog': 日志
 * - 'mono': 人物
 * - 'relation': 好友
 * - 'group': 小组
 * - 'wiki': 维基
 * - 'index': 目录
 */
  type: TimelineType
  page: number
}

export type Timeline = Array<{
  date: string
  items: TimelineItem[]
}>;

export interface TimelineItem {
  user: {
    name: string
    href: string // 只有第一个 ul 中的 li 才有
    avatar: string
  }
  time: string
  reply: {
    content: string
    text: string
    href: string
  }
  action: {
    type: string
    desc: string
  }
  contents: Array<Record<'name' | 'url', string>>
}
