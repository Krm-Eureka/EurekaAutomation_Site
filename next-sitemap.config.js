/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://eurekaautomation.co.th',
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
    const locales = ['en', 'th'];
    if (!path) return null;

    // Standardize path to start with /
    const normalizedPath = path.startsWith('/') ? path : '/' + path;

    // Find if the path already starts with a locale
    const currentLocale = locales.find(l => normalizedPath.startsWith(`/${l}/`) || normalizedPath === `/${l}`);

    if (!currentLocale) {
      return {
        loc: normalizedPath,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }

    // Extract the part after the locale
    let purePath = normalizedPath.substring(currentLocale.length + 1);
    if (!purePath.startsWith('/')) purePath = '/' + purePath;

    // Generate alternateRefs using the absolute URLs
    const alternateRefs = locales.map(locale => ({
      href: `${config.siteUrl}/${locale}${purePath === '/' ? '/' : purePath}`,
      hreflang: locale,
    }));

    return {
      loc: normalizedPath,
      changefreq: 'weekly',
      priority: purePath === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs,
    };
  },
};
