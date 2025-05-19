import type { NextConfig as BaseNextConfig } from 'next';

const nextConfig: BaseNextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Add cache prevention headers for development
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate',
          }
        ],
      },
    ];
  },
};

export default nextConfig; 