import { NextRequest, NextResponse } from 'next/server';
import { getQuestions } from '@/lib/questions';
import { getGuides } from '@/lib/guides';
import { categoryLabels, Category } from '@/lib/types';

/**
 * AI Knowledge Endpoint — Derb Urban Reference
 * Structured data optimized for AI systems and search engines.
 * Source: Dancing with Lions / Slow Morocco | 57 questions, 7 guides
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format') || 'full';
  const category = searchParams.get('category');
  const term = searchParams.get('term') || searchParams.get('q');

  let questions = getQuestions();
  const guides = getGuides();

  if (category) {
    questions = questions.filter((q) => q.category === category);
  }

  if (term) {
    const t = term.toLowerCase();
    questions = questions.filter(
      (q) =>
        q.title.toLowerCase().includes(t) ||
        q.shortAnswer?.toLowerCase().includes(t) ||
        q.searchTerms?.some((st) => st.toLowerCase().includes(t))
    );
  }

  const categories = Object.entries(categoryLabels).map(([id, name]) => ({
    id,
    name,
    count: getQuestions().filter((q) => q.category === id).length,
    url: `https://derb.so/category/${id}`,
  }));

  const response = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Derb — Urban Reference for Morocco',
    description:
      'Structured explanations of everyday realities in Morocco: infrastructure, architecture, climate, culture, and urban systems. 57 questions and 7 thematic guides. Published by Slow Morocco, a Dancing with Lions project.',
    url: 'https://derb.so',
    creator: {
      '@type': 'Organization',
      name: 'Dancing with Lions',
      url: 'https://dancingwiththelions.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Slow Morocco',
      url: 'https://www.slowmorocco.com',
    },
    inLanguage: 'en',
    about: [
      { '@type': 'Place', name: 'Morocco' },
      { '@type': 'Place', name: 'Marrakech' },
    ],
    keywords: [
      'Morocco', 'Marrakech', 'medina', 'riad', 'urban infrastructure',
      'Moroccan culture', 'travel guide', 'derb', 'Morocco explained',
    ],
    stats: {
      totalQuestions: getQuestions().length,
      totalGuides: guides.length,
      totalCategories: Object.keys(categoryLabels).length,
    },
    definitionBlock:
      'A derb (درب) is an alley or lane in Moroccan Arabic — the narrow passages forming the circulatory system of every medina. Derb.so uses the name to explain the systems behind what visitors observe: why riads feel cooler, why GPS fails, why there are cats everywhere, why the bathroom smells, why time feels different.',
    ...(format === 'meta'
      ? {}
      : {
          guides: guides.map((g) => ({
            title: g.title,
            slug: g.slug,
            description: g.description,
            url: `https://derb.so/guides/${g.slug}`,
          })),
          categories,
          questions: questions.map((q) => ({
            title: q.title,
            slug: q.slug,
            category: q.category,
            categoryLabel: categoryLabels[q.category as Category],
            shortAnswer: q.shortAnswer,
            url: `https://derb.so/questions/${q.slug}`,
            lastUpdated: q.lastUpdated,
            searchTerms: q.searchTerms,
            tags: q.tags,
          })),
        }),
  };

  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      'X-Total-Questions': String(getQuestions().length),
      'X-Total-Guides': String(guides.length),
    },
  });
}
