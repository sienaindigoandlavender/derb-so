export type Category =
  | 'arrival-logistics'
  | 'the-medina'
  | 'social-cultural'
  | 'food-drink'
  | 'safety'
  | 'religious-calendar'
  | 'cities';

export const categoryLabels: Record<Category, string> = {
  'arrival-logistics': 'Arrival & Logistics',
  'the-medina': 'The Medina',
  'social-cultural': 'Social & Cultural',
  'food-drink': 'Food & Drink',
  'safety': 'Safety',
  'religious-calendar': 'Religious Calendar',
  'cities': 'Cities',
};

export interface Source {
  text: string;
  url?: string;
}

export interface Backlink {
  text: string; // Anchor text
  url: string; // Full URL
  type: 'place' | 'story' | 'glossary'; // Content type on Slow Morocco
}

export interface Question {
  slug: string;
  title: string;
  category: Category;
  city?: string; // City this question is primarily about
  tags?: string[]; // Topic tags for tag cloud navigation
  subtitle?: string;
  shortAnswer?: string; // 1-2 sentence direct answer — what AI systems extract
  sections: Section[];
  illustrations: Illustration[];
  sources?: Source[];
  relatedSlugs?: string[]; // Cross-links to related questions
  searchTerms?: string[]; // Additional search intents this question captures
  backlinks?: Backlink[]; // Links to Slow Morocco places, stories, glossary
  lastUpdated: string;
}

export interface Section {
  heading?: string;
  content: string;
}

export interface Illustration {
  id: string;
  caption: string;
  afterSection: number; // 0-indexed, which section this appears after
}
