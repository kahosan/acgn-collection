import { startTransition, useState } from 'react';
import { useLayoutEffect } from 'foxact/use-isomorphic-layout-effect';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const fn = () => startTransition(updateSize);
    window.addEventListener('resize', fn);

    return () => window.removeEventListener('resize', fn);
  }, []);

  return isMobile;
}
