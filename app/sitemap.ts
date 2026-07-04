import { MetadataRoute } from 'next';
import { getQuestions } from '@/lib/questions';
import { getGuides } from '@/lib/guides';
import { Category, categoryLabels } from '@/lib/types';

// NOTE: no manual XML escaping here — Next.js escapes sitemap XML itself;
// pre-escaping & to &amp; would double-escape to &amp;amp; and break URLs.

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://derb.so';
  const questions = getQuestions();
  const guides = getGuides();

  const questionUrls = questions.map((q) => ({
    url: `${baseUrl}/questions/${q.slug}`,
    lastModified: new Date(q.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const guideUrls = guides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date("2026-04-24"),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const categories = Object.keys(categoryLabels) as Category[];
  const categoryUrls = categories.map((c) => ({
    url: `${baseUrl}/category/${c}`,
    lastModified: new Date("2026-04-24"),
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
