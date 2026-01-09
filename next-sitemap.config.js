/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://eureka-automation.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './out',
  trailingSlash: true,
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
    // Define all supported locales
    const locales = ['en', 'th', 'cn', 'jp', 'es'];
    
    // Check if path is valid
    if (!path) return null;

    // Find current locale in path
    const currentLocale = locales.find(l => path === `/${l}` || path.startsWith(`/${l}/`));
    
    if (!currentLocale) {
        // If no locale found (e.g. root or static assets), return as is
        return {
            loc: path,
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: new Date().toISOString(),
        };
    }

    // Get the path without locale
    // e.g. /th/about -> /about
    let purePath = path.substring(currentLocale.length + 1);
    if (!purePath.startsWith('/')) purePath = '/' + purePath;
    if (purePath === '//') purePath = '/'; // Fix root edge case

    // Generate alternate refs for all locales
    const alternateRefs = locales.map(locale => {
        // Construct new path
        const newPath = `/${locale}${purePath === '/' ? '' : purePath}`;
        return {
          href: `${config.siteUrl}${newPath}`,
          hreflang: locale,
        };
    });

    return {
      loc: path,
      changefreq: 'weekly',
      priority: purePath === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs,
    };
  },
};
