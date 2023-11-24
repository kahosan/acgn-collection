/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

module.exports = nextConfig;
