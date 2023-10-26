import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';

import { tokenAtom } from '~/hooks/use-token';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = useAtomValue(tokenAtom);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token)
      router.push('/login');
    else if (pathname === '/login' && token)
      router.push('/');
  }, [pathname, router, token]);

  return children;
}
