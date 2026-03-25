import guidesData from "@/data/guides.json";
import { getQuestionBySlug } from "./questions";

export interface Guide {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  questions: string[];
}

export function getGuides(): Guide[] {
  return guidesData as Guide[];
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guidesData.find((g: any) => g.slug === slug) as Guide | undefined;
}

export function getGuideQuestions(guideSlug: string) {
  const guide = getGuideBySlug(guideSlug);
  if (!guide) return [];
  return guide.questions
    .map((slug) => getQuestionBySlug(slug))
    .filter(Boolean);
}

export function getGuideForQuestion(questionSlug: string): Guide | undefined {
  return guidesData.find((g: any) =>
    g.questions.includes(questionSlug)
  ) as Guide | undefined;
}
