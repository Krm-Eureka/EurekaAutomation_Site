import { MetadataRoute } from 'next';

const locales = ['en', 'th'];
const pages = [
  '',
  '/about',
  '/services',
  '/solutions',
  '/products',
  '/careers',
  '/contact',
  '/blog',
  '/custom-machines',
  '/ai-solutions',
  '/robotics',
  '/logistics',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://eureka-automation.com';
  // If deployed to a subdirectory like GitHub Pages, uncomment the line below or adjust as needed
  // const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const basePath = ''; // Keeping it clean for the main domain

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}${basePath}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: (page === '/blog' ? 'weekly' : 'monthly') as any,
        priority: page === '' ? 1.0 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
