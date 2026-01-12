import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const isProd = process.env.NODE_ENV === 'production';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const BASE_PATH = (isProd || isGithubActions) ? '/EurekaAutomation_Site' : '';

const nextConfig: NextConfig = {
  output: 'export',
  // Only use basePath in production (GitHub Pages)
  basePath: BASE_PATH,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);
