import { useAtom } from 'jotai';

import { LOCAL_STORAGE_KEYS } from '~/lib/constant';

import { atomWithLocalStorage } from '~/utils';

export const tokenAtom = atomWithLocalStorage<string | null>(LOCAL_STORAGE_KEYS.TOKEN);

export const useToken = () => useAtom(tokenAtom);
