import { useSession } from 'next-auth/react';

export const useUser = () => {
  const { data } = useSession();
  return data?.user;
};
