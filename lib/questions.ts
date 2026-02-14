import { Question } from "./types";
import questionsData from "@/data/questions.json";

export function getQuestions(): Question[] {
  return questionsData as Question[];
}

export function getQuestionBySlug(slug: string): Question | undefined {
  return getQuestions().find((q) => q.slug === slug);
}

export function getAllSlugs(): string[] {
  return getQuestions().map((q) => q.slug);
}

/**
 * Get related questions for a given slug.
 * Priority: explicit relatedSlugs > same category > random
 */
export function getRelatedQuestions(slug: string, count: number = 4): Question[] {
  const all = getQuestions();
  const current = all.find((q) => q.slug === slug);
  if (!current) return [];

  const related: Question[] = [];
  const seen = new Set<string>([slug]);

  // 1. Explicit related slugs
  if (current.relatedSlugs) {
    for (const rs of current.relatedSlugs) {
      if (seen.has(rs)) continue;
      const q = all.find((x) => x.slug === rs);
      if (q) {
        related.push(q);
        seen.add(rs);
      }
      if (related.length >= count) return related;
    }
  }

  // 2. Same category
  const sameCategory = all.filter(
    (q) => q.category === current.category && !seen.has(q.slug)
  );
  for (const q of sameCategory) {
    related.push(q);
    seen.add(q.slug);
    if (related.length >= count) return related;
  }

  // 3. Fill from other categories
  const rest = all.filter((q) => !seen.has(q.slug));
  for (const q of rest) {
    related.push(q);
    seen.add(q.slug);
    if (related.length >= count) return related;
  }

  return related;
}
