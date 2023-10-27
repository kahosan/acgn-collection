import { Suspense } from 'react';
import Collection from './collection';

export default function Page() {
  /**
   * Fix Entire page deopted into client-side rendering
   * @link https://nextjs.org/docs/messages/deopted-into-client-rendering
   */
  return (
    <Suspense>
      <Collection />
    </Suspense>
  );
}
