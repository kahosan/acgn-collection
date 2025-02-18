import { useSession } from 'next-auth/react';

export function useToken() {
  const { data } = useSession();
  return data?.token;
}
