import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vssnkwjwdzzbmpcoixol.supabase.co',
      },
      // Also allow localhost for development or placeholders if needed
    ],
  },
};

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);
export default withNextIntl(nextConfig);