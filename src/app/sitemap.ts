import type { MetadataRoute } from 'next';
import { getCases } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const cases = getCases();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/portfolio`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const caseRoutes: MetadataRoute.Sitemap = cases.map((caseItem) => ({
    url: `${SITE_URL}/portfolio/${caseItem.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseRoutes];
}
