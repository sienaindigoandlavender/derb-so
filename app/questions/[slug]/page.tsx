import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import Link from "next/link";
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
      images: [{ url: "https://derb.so/og-image.png", width: 1200, height: 630, alt: question.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: question.title,
      description,
      images: ["https://derb.so/og-image.png"],
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
      publisher: { "@type": "Organization", name: "Slow Morocco", url: "https://www.slowmorocco.com" },
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
          text: [
            question.shortAnswer,
            ...question.sections.map((s) => s.content),
          ]
            .filter(Boolean)
            .join(" "),
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

export default async function QuestionPage({ params }: PageProps) {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);

  if (!question) {
    // Deleted/renamed question. 301 to the index instead of a 404 so
    // removals never accumulate in the GSC "Not found" report.
    permanentRedirect("/questions");
  }

  const related = getRelatedQuestions(slug, 4);
  const schemas = generateQuestionSchema(question);
  const guide = getGuideForQuestion(slug);

  const renderContent = () => {
    const elements: React.ReactNode[] = [];

    question.sections.forEach((section, index) => {
      elements.push(
        <div key={`section-${index}`}>
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
    <article className="max-w-content mx-auto px-6 py-16">
      {schemas &&
        schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

      {/* Breadcrumb */}
      <nav
        className="font-mono text-meta uppercase tracking-wide text-tertiary mb-8 flex flex-wrap items-center gap-x-2"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-accent transition-colors">Derb</Link>
        <span aria-hidden>/</span>
        {guide ? (
          <Link href={`/guides/${guide.slug}`} className="hover:text-accent transition-colors">
            {guide.title}
          </Link>
        ) : (
          <Link
            href={`/category/${question.category}`}
            className="hover:text-accent transition-colors"
          >
            {categoryLabels[question.category]}
          </Link>
        )}
      </nav>

      {/* Title */}
      <header className="max-w-prose mb-10">
        <p className="font-mono text-meta uppercase tracking-wide text-accent mb-3">
          {categoryLabels[question.category]}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight text-ink mb-4">
          {question.title}
        </h1>
        {question.subtitle && (
          <p className="text-lg text-secondary">{question.subtitle}</p>
        )}
      </header>

      {/* Short answer */}
      {question.shortAnswer && (
        <aside className="max-w-prose mb-12 border-l-2 border-accent pl-5 py-1">
          <p className="font-mono text-meta uppercase tracking-wide text-accent mb-2">
            The short answer
          </p>
          <p className="font-serif text-lg text-ink leading-relaxed">
            {question.shortAnswer}
          </p>
        </aside>
      )}

      {/* Body */}
      <div className="prose-content">{renderContent()}</div>

      {/* Sources */}
      {question.sources && question.sources.length > 0 && (
        <section className="max-w-prose mt-12 pt-8 border-t border-border">
          <p className="font-mono text-meta uppercase tracking-wide text-tertiary mb-3">
            Sources
          </p>
          <ul className="space-y-2 text-secondary">
            {question.sources.map((source, idx) => (
              <li key={idx}>
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-border hover:text-accent hover:border-accent transition-colors"
                  >
                    {source.text}
                  </a>
                ) : (
                  source.text
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Backlinks */}
      {question.backlinks && question.backlinks.length > 0 && (
        <section className="max-w-prose mt-10 pt-8 border-t border-border">
          <p className="font-mono text-meta uppercase tracking-wide text-tertiary mb-3">
            Go deeper
          </p>
          <ul className="flex flex-wrap gap-2">
            {question.backlinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border px-3 py-1 text-sm hover:border-accent hover:text-accent transition-colors"
                >
                  <span className="font-mono text-meta uppercase tracking-wide text-tertiary">
                    {link.type === "glossary" ? "Term" : link.type === "place" ? "Place" : "Link"}
                  </span>
                  <span>{link.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-10 pt-8 border-t border-border">
          <p className="font-mono text-meta uppercase tracking-wide text-tertiary mb-4">
            Related
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {related.map((rq) => (
              <li key={rq.slug}>
                <Link
                  href={`/questions/${rq.slug}`}
                  className="block group border-t border-border pt-3"
                >
                  <p className="font-serif text-lg text-ink group-hover:text-accent transition-colors">
                    {rq.title}
                  </p>
                  <p className="font-mono text-meta uppercase tracking-wide text-tertiary mt-1">
                    {categoryLabels[rq.category]}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="mt-16 pt-6 border-t border-border flex items-center justify-between font-mono text-meta uppercase tracking-wide text-tertiary">
        <span>Last updated · {question.lastUpdated}</span>
        <Link href="/questions" className="hover:text-accent transition-colors">
          ← All questions
        </Link>
      </footer>
    </article>
  );
}
