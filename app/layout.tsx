import Providers from '~/providers';

import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';

import Header from '~/components/header';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'ACGN Collection',
  description: '使用 Bangumi API 的 ACGN 收藏夹',
  keywords: [
    'ACGN Collection',
    'ACGN 收藏',
    'Bangumi',
    '班固米',
    '番组计划'
  ],
  authors: [{
    name: 'kahosan',
    url: 'https://hitorinbc.com'
  }],
  creator: 'kahosan',
  metadataBase: new URL('https://acgn-collection.vercel.app/'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    title: 'ACGN Collection',
    description: '使用 Bangumi API 的 ACGN 收藏夹',
    siteName: 'ACGN Collection'
  },
  icons: 'https://unpkg.com/xfb/favicon/favicon.ico'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.baiwulin.com/font/harmonyos-fonts/css/harmonyos_sans_sc.css" />
      </head>
      <body className="font-['HarmonyOS_Sans_SC']">
        <Providers>
          <Header />
          <Suspense>
            <main className="mx-auto py-4 px-6">
              {children}
              <Analytics />
            </main>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
