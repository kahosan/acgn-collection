import { Suspense } from 'react';

import Search from '.';

export default function Page() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
