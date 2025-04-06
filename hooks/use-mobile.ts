import { startTransition, useState } from 'react';
import { useLayoutEffect } from 'foxact/use-isomorphic-layout-effect';
import { isBrowser } from '~/utils';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    if (isBrowser)
      setIsMobile(window.innerWidth < 768);

    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const fn = () => startTransition(updateSize);
    window.addEventListener('resize', fn);

    return () => window.removeEventListener('resize', fn);
  }, []);

  return isMobile;
}
