import Providers from '~/providers';

import Header from '~/components/header';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'ACGN Collection',
  description: '使用 Bangumi API 的 ACGN 收藏夹',
  icons: 'https://unpkg.com/xfb/favicon/favicon.ico'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <main className="max-w-8xl mx-auto py-4 px-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
