import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';

import { tokenAtom } from '~/hooks/use-token';

import { fetcher } from '~/lib/fetcher';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = useAtomValue(tokenAtom);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token) {
      fetcher(['/login/api', { method: 'DELETE', base: '/' }]);
      router.push('/login');
    } else if (pathname === '/login' && token) {
      router.push('/');
    }
  }, [pathname, router, token]);

  return children;
}
