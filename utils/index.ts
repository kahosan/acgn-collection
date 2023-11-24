import { atom } from 'jotai';
import { match } from 'ts-pattern';
import { CollectionTypeForAnime, CollectionTypeForBook, CollectionTypeForGame, CollectionTypeForMusic } from '~/types/bangumi/collection';

import { SubjectType } from '~/types/bangumi/subject';

export const isBrowser = typeof window !== 'undefined';

export const convertSpecialChar = (str: string) => {
  return str.replaceAll('&nbsp;', ' ')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', '\'');
};

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
    .map(type => cb(type));
};

export const getCollectionTypeBySubjectType = (subjectType: SubjectType) => match<1 | 2 | 3 | 4 | 6>(subjectType)
  .with(6, () => CollectionTypeForAnime) // Real
  .with(2, () => CollectionTypeForAnime)
  .with(1, () => CollectionTypeForBook)
  .with(3, () => CollectionTypeForMusic)
  .with(4, () => CollectionTypeForGame)
  .exhaustive();

export const transformCollectionTypeToJSX = <T extends React.ReactNode>(cb: (type: number, label: string) => T, subjectType: SubjectType, other: Record<string, string> = {}) => {
  const collectionType = getCollectionTypeBySubjectType(subjectType);
  return Object.keys({ ...collectionType, ...other })
    .filter(type => Number.isInteger(Number.parseInt(type, 10)))
    .map(type => Number.parseInt(type, 10))
    .map(type => cb(type, collectionType[type]));
};
