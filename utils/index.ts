import { atom } from 'jotai';

import { SubjectType } from '~/types/bangumi/subjects';

export const isBrowser = typeof window !== 'undefined';

export const compose = <T>(...args: [...composer: Array<((arg: T) => T) | false>, init: T]) => {
  if (args.length === 0) throw new TypeError('compose requires at least one argument');
  const last = args.pop() as T;
  return (args as Array<((arg: T) => T)>).filter(Boolean).reduceRight((prev, fn) => fn(prev), last);
};

export const atomWithLocalStorage = <T extends string | null>(key: string) => {
  const baseAtom = atom(isBrowser ? localStorage.getItem(key) : null);
  return atom(
    (get) => get(baseAtom),
    (_get, set, value: T) => {
      if (isBrowser && value) {
        set(baseAtom, value);
        localStorage.setItem(key, value);
      } else if (isBrowser) {
        set(baseAtom, null);
        localStorage.removeItem(key);
      }
    }
  );
};

export const transformSubjectTypeToJSX = <T>(cb: (type: number) => T, other: Record<string, string> = {}) => {
  return Object.keys({ ...SubjectType, ...other })
    .filter(type => Number.isInteger(Number.parseInt(type, 10)))
    .map(type => Number.parseInt(type, 10))
    .map(type => cb(type))
    .reverse();
};
