import { useSession } from 'next-auth/react';

export const useToken = () => {
  const { data } = useSession();
  return data?.token;
};
