import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig as BaseNextConfig } from 'next';

const nextConfig: BaseNextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig); 