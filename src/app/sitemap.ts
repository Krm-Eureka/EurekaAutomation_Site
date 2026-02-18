import { MetadataRoute } from 'next';
export const dynamic = 'force-static';

const locales = ['en', 'th'];
const pages = [
  '',
  '/about',
  '/services',
  '/solutions',
  '/products',
  '/careers',
  '/custom-machines',
  '/robotics',
  '/logistics',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://th.eurekaautomation.co.th';

  const basePath = ''; // Keeping it clean for the main domain

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}${basePath}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: (page === '/blog' ? 'weekly' : 'monthly'),
        priority: page === '' ? 1.0 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
