'use client';

import { useEffect, useState } from 'react';
import { HTTPError } from '~/lib/fetcher';

export default function GlobalError({ error }: { error: Error }) {
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'dark') {
      setTheme('dark');
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    }
  }, []);

  return (
    <html className={theme ?? ''}>
      <body>
        <div className="mt-40 max-w-xl mx-auto p-4">
          <div>
            <h2 className="font-bold text-2xl text-blue-300 mb-2">
              嘟嘟噜
              <br />
              冈伦，网页坏掉啦!
            </h2>
            <div className="opacity-75">
              报错信息在这里哦：<p className="font-mono break-words break-all">{error instanceof HTTPError ? error.data.description : error.message}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
