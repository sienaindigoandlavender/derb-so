import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getQuestionBySlug,
  getAllSlugs,
  getRelatedQuestions,
} from "@/lib/questions";
import { getGuideForQuestion } from "@/lib/guides";
import { categoryLabels } from "@/lib/types";
import { Illustration } from "@/components/Illustration";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = "https://derb.so";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);

  if (!question) {
    return { title: "Not Found" };
  }

  const description =
    question.shortAnswer ||
    question.subtitle ||
    question.sections[0]?.content.slice(0, 160);

  const pageUrl = `${siteUrl}/questions/${question.slug}`;

  return {
    title: question.title,
    description,
    keywords: question.searchTerms || [],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: question.title,
      description,
      type: "article",
      url: pageUrl,
      siteName: "Derb",
      locale: "en_US",
      modifiedTime: question.lastUpdated,
      section: categoryLabels[question.category],
      authors: ["Derb"],
    },
    twitter: {
      card: "summary_large_image",
      title: question.title,
      description,
    },
  };
}

function generateQuestionSchema(question: ReturnType<typeof getQuestionBySlug>) {
  if (!question) return null;

  const pageUrl = `${siteUrl}/questions/${question.slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Derb", item: siteUrl },
        { "@type": "ListItem", position: 2, name: categoryLabels[question.category], item: `${siteUrl}/category/${question.category}` },
        { "@type": "ListItem", position: 3, name: question.title, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": pageUrl,
      url: pageUrl,
      headline: question.title,
      description: question.shortAnswer || question.subtitle || question.sections[0]?.content.slice(0, 200),
      articleSection: categoryLabels[question.category],
      dateModified: question.lastUpdated,
      datePublished: question.lastUpdated,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: "Derb", url: siteUrl },
      publisher: { "@type": "Organization", name: "Slow Morocco", url: "https://slowmorocco.com" },
      author: { "@type": "Organization", name: "Derb", url: siteUrl },
      about: { "@type": "Place", name: "Marrakech, Morocco", geo: { "@type": "GeoCoordinates", latitude: 31.6295, longitude: -7.9811 } },
      ...(question.sources && question.sources.length > 0
        ? { citation: question.sources.map((s) => ({ "@type": "CreativeWork", name: s.text, ...(s.url ? { url: s.url } : {}) })) }
        : {}),
      ...(question.backlinks && question.backlinks.length > 0
        ? {
            relatedLink: question.backlinks.map((bl) => bl.url),
            significantLink: question.backlinks.filter((bl) => bl.type === "place" || bl.type === "story").map((bl) => bl.url),
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "QAPage",
      mainEntity: {
        "@type": "Question",
        name: question.title,
        text: question.subtitle || question.title,
        answerCount: 1,
        acceptedAnswer: {
          "@type": "Answer",
          text: question.shortAnswer || question.sections[0]?.content || "",
          url: pageUrl,
          dateModified: question.lastUpdated,
        },
      },
    },
  ];
}

function renderInlineLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="content-link">
          {match[1]}
        </a>
      );
    }
    return part;
  });
}

// Guide hero colors — matches guide pages and homepage shelf
const guideHeroColors: Record<string, string> = {
  "the-medina": "#a0522d",
  "inside-the-riad": "#6b4226",
  "the-senses": "#1a5c5a",
  "getting-around": "#1a3c8f",
  "food-and-drink": "#8b6914",
  "the-rituals": "#2d6a4f",
  "staying-safe": "#8b3a2a",
  "the-cities": "#2d2d2d",
};

export default async function QuestionPage({ params }: PageProps) {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);

  if (!question) {
    notFound();
  }

  const related = getRelatedQuestions(slug, 4);
  const schemas = generateQuestionSchema(question);
  const guide = getGuideForQuestion(slug);
  const heroColor = guide ? guideHeroColors[guide.slug] || "#2a2725" : "#2a2725";

  const renderContent = () => {
    const elements: React.ReactNode[] = [];

    question.sections.forEach((section, index) => {
      elements.push(
        <div key={`section-${index}`} className="mb-8">
          {section.heading && <h2>{section.heading}</h2>}
          <p>{renderInlineLinks(section.content)}</p>
        </div>
      );

      const illustrationsAfter = question.illustrations.filter(
        (ill) => ill.afterSection === index
      );

      illustrationsAfter.forEach((ill) => {
        elements.push(
          <Illustration key={ill.id} id={ill.id} caption={ill.caption} />
        );
      });
    });

    return elements;
  };

  return (
    <div className="question-page">
      {/* JSON-LD */}
      {schemas &&
        schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

      {/* ZONE 1 — Guide-colored hero */}
      <div className="question-hero" style={{ background: heroColor }}>
        <div className="question-hero-inner">
          <nav className="question-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Derb</a>
            <span>/</span>
            {guide ? (
              <a href={`/guides/${guide.slug}`}>{guide.title}</a>
            ) : (
              <a href={`/category/${question.category}`}>
                {categoryLabels[question.category]}
              </a>
            )}
          </nav>

          <h1 className="question-title">{question.title}</h1>
          {question.subtitle && (
            <p className="question-subtitle">{question.subtitle}</p>
          )}
        </div>
      </div>

      {/* ZONE 2 — Terracotta-pale short answer */}
      {question.shortAnswer && (
        <div className="question-short-answer">
          <div className="question-short-answer-inner">
            <p className="question-short-answer-label">The short answer</p>
            <p className="question-short-answer-text">{question.shortAnswer}</p>
          </div>
        </div>
      )}

      {/* ZONE 3 — White body */}
      <div className="question-body">
        <div className="question-body-inner">
          <div className="prose">{renderContent()}</div>
        </div>
      </div>

      {/* ZONE 4 — White footer content */}
      <div className="question-footer-zone">
        <div className="question-footer-inner">
          {/* Sources */}
          {question.sources && question.sources.length > 0 && (
            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--rule)' }}>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.55rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--fg-faded)',
                marginBottom: '0.75rem',
              }}>
                Sources
              </p>
              <ul style={{ listStyle: 'none' }}>
                {question.sources.map((source, idx) => (
                  <li key={idx} style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                    fontWeight: 300,
                    color: 'var(--fg-soft)',
                    marginBottom: '0.35rem',
                  }}>
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'underline', textUnderlineOffset: '2px', transition: 'color 0.2s' }}
                      >
                        {source.text}
                      </a>
                    ) : (
                      source.text
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Backlinks */}
          {question.backlinks && question.backlinks.length > 0 && (
            <nav className="backlinks-section" aria-label="Go deeper on Slow Morocco">
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.55rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--fg-faded)',
                marginBottom: '1rem',
              }}>
                Go deeper
              </p>
              <div className="backlinks-grid">
                {question.backlinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="backlink-item"
                  >
                    <span className="backlink-type-badge" data-type={link.type}>
                      {link.type === 'glossary' ? 'Term' : link.type === 'place' ? 'Place' : 'Link'}
                    </span>
                    <span className="backlink-text">{link.text}</span>
                    <span className="backlink-source">Slow Morocco</span>
                  </a>
                ))}
              </div>
            </nav>
          )}

          {/* Related */}
          {related.length > 0 && (
            <nav className="related-questions" aria-label="Related questions">
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.55rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--fg-faded)',
                marginBottom: '1rem',
              }}>
                Related
              </p>
              <div className="related-grid">
                {related.map((rq) => (
                  <a key={rq.slug} href={`/questions/${rq.slug}`} className="related-link">
                    <span className="related-link-title">{rq.title}</span>
                    <span className="related-link-category">{categoryLabels[rq.category]}</span>
                  </a>
                ))}
              </div>
            </nav>
          )}

          {/* Footer */}
          <footer style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--rule)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span></span>
            <a
              href="/questions"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--terracotta)' }}
            >
              ← All questions
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
