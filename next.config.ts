import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const isProd = process.env.NODE_ENV === 'production';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  // Only use basePath in production (GitHub Pages)
  basePath: (isProd || isGithubActions) ? '/EurekaAutomation_Site' : '',
  assetPrefix: (isProd || isGithubActions) ? '/EurekaAutomation_Site/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);
