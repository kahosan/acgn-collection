import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lain.bgm.tv'
      },
      {
        protocol: 'http',
        hostname: 'lain.bgm.tv'
      },
      {
        protocol: 'https',
        hostname: 'placehold.co'
      }
    ]
  }
};

export default nextConfig;
