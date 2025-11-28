/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://eureka-automation.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './out',
  exclude: ['/404'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  transform: async (config, path) => {
    // Add alternateRefs for multilingual support
    return {
      loc: path,
      changefreq: 'weekly',
      priority: path === '/' || path === '/en' || path === '/th' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `${config.siteUrl}/en${path.replace('/th', '').replace('/en', '')}`,
          hreflang: 'en',
        },
        {
          href: `${config.siteUrl}/th${path.replace('/th', '').replace('/en', '')}`,
          hreflang: 'th',
        },
      ],
    };
  },
};
