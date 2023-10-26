import { useAtom } from 'jotai';

import { atomWithLocalStorage } from '~/utils';

import { LOCAL_STORAGE_KEYS } from '~/lib/constant';

export const tokenAtom = atomWithLocalStorage<string | null>(LOCAL_STORAGE_KEYS.TOKEN);

export const useToken = () => useAtom(tokenAtom);
