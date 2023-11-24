import type { LegacySubject, Subject } from './subject';

export enum Weekday {
  '周日' = 7,
  '周一' = 1,
  '周二' = 2,
  '周三' = 3,
  '周四' = 4,
  '周五' = 5,
  '周六' = 6
}

export type CalendarItem = LegacySubject & Pick<Subject, 'eps'>;
export type Calendar = Array<{
  weekday: {
    en: string
    cn: '星期天' | '星期一' | '星期二' | '星期三' | '星期四' | '星期五' | '星期六'
    ja: string
    id: number
  }
  items: CalendarItem[]
}>;
