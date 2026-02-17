import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const isProd = process.env.NODE_ENV === 'production';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

/**
 * DEPLOY_TARGET:
 * - 'github': Use /EurekaAutomation_Site prefix (for GitHub Pages testing)
 * - 'hostneverdie': Use '' root path (for production)
 */
const DEPLOY_TARGET = process.env.DEPLOY_TARGET || (isGithubActions ? 'github' : 'hostneverdie');
const BASE_PATH = DEPLOY_TARGET === 'github' ? '/EurekaAutomation_Site' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: BASE_PATH,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // @ts-ignore
  allowedDevOrigins: ['192.168.10.100', 'localhost:3000'],
};

export default withNextIntl(nextConfig);
