import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',
  // GitHub Pages - ถ้า repo อยู่ที่ root domain ไม่ต้องใส่ basePath
  // basePath: '/repo-name',
  // assetPrefix: '/repo-name/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);
