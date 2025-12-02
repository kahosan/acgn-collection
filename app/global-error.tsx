'use client';

import { HTTPError } from '~/lib/fetcher';

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html ref={el => {
      if (!el) return;

      try {
        const localTheme = localStorage.getItem('theme');

        if (localTheme === 'dark') {
          el.classList.add('dark');
        } else {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          el.classList.remove(systemTheme);
        }
      } catch (e) {
        console.error('获取主题失败', e);
      }
    }}
    >
      <title>Error</title>
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
