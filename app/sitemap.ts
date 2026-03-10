import { MetadataRoute } from 'next';
import { getQuestions } from '@/lib/questions';
import { getGuides } from '@/lib/guides';
import { Category, categoryLabels } from '@/lib/types';

// Safely encode URL segments
function safeSitemapUrl(url: string): string {
  return url.replace(/&/g, '&amp;');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://derb.so';
  const questions = getQuestions();
  const guides = getGuides();

  const questionUrls = questions.map((q) => ({
    url: safeSitemapUrl(`${baseUrl}/questions/${q.slug}`),
    lastModified: new Date(q.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const guideUrls = guides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const categories = Object.keys(categoryLabels) as Category[];
  const categoryUrls = categories.map((c) => ({
    url: `${baseUrl}/category/${c}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/questions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...guideUrls,
    ...categoryUrls,
    ...questionUrls,
  ];
}
