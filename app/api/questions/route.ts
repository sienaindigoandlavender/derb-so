import { NextResponse } from "next/server";
import { getQuestions } from "@/lib/questions";

export const revalidate = 3600; // Cache 1 hour

export async function GET() {
  const questions = getQuestions();

  const response = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Derb — Urban Reference for Marrakech",
    description:
      "Structured explanations of everyday realities in Marrakech: infrastructure, climate, architecture, culture, and navigation.",
    url: "https://derb.so",
    numberOfItems: questions.length,
    publisher: {
      "@type": "Organization",
      name: "Slow Morocco",
      url: "https://slowmorocco.com",
    },
    itemListElement: questions.map((q, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Article",
        "@id": `https://derb.so/questions/${q.slug}`,
        url: `https://derb.so/questions/${q.slug}`,
        headline: q.title,
        description: q.subtitle || q.sections[0]?.content.slice(0, 200),
        articleSection: q.category,
        dateModified: q.lastUpdated ,
        mainEntityOfPage: `https://derb.so/questions/${q.slug}`,
      },
    })),
  };

  return NextResponse.json(response, {
    headers: {
      "Content-Type": "application/ld+json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
