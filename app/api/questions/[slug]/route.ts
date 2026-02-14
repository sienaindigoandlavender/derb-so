import { NextRequest, NextResponse } from "next/server";
import { getQuestionBySlug } from "@/lib/questions";

export const revalidate = 3600;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);

  if (!question) {
    return NextResponse.json(
      { error: "Question not found" },
      { status: 404 }
    );
  }

  const fullText = question.sections
    .map((s) => [s.heading ? `## ${s.heading}` : "", s.content].filter(Boolean).join("\n"))
    .join("\n\n");

  const response = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://derb.so/questions/${question.slug}`,
    url: `https://derb.so/questions/${question.slug}`,
    headline: question.title,
    description: question.subtitle || question.sections[0]?.content.slice(0, 200),
    articleSection: question.category,
    dateModified: question.lastUpdated ,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "Slow Morocco",
      url: "https://slowmorocco.com",
    },
    author: {
      "@type": "Organization",
      name: "Derb",
      url: "https://derb.so",
    },
    about: {
      "@type": "Place",
      name: "Marrakech",
      geo: {
        "@type": "GeoCoordinates",
        latitude: 31.6295,
        longitude: -7.9811,
      },
    },
    mainEntity: {
      "@type": "Question",
      name: question.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: question.shortAnswer || fullText,
        dateModified: question.lastUpdated ,
      },
    },
    shortAnswer: question.shortAnswer || null,
    articleBody: fullText,
    sections: question.sections.map((s, i) => ({
      position: i + 1,
      heading: s.heading || null,
      content: s.content,
    })),
    ...(question.sources && question.sources.length > 0
      ? {
          citation: question.sources.map((s) => ({
            "@type": "CreativeWork",
            name: s.text,
            ...(s.url ? { url: s.url } : {}),
          })),
        }
      : {}),
    ...(question.relatedSlugs
      ? {
          relatedQuestions: question.relatedSlugs.map((rs) => ({
            url: `https://derb.so/questions/${rs}`,
            "@id": `https://derb.so/questions/${rs}`,
          })),
        }
      : {}),
    ...(question.searchTerms
      ? { keywords: question.searchTerms }
      : {}),
    ...(question.backlinks && question.backlinks.length > 0
      ? {
          relatedLink: question.backlinks.map((bl) => ({
            url: bl.url,
            name: bl.text,
            type: bl.type,
            publisher: "Slow Morocco",
          })),
        }
      : {}),
  };

  return NextResponse.json(response, {
    headers: {
      "Content-Type": "application/ld+json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
