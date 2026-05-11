import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuideBySlug, getGuides, getGuideQuestions } from "@/lib/guides";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = getGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Not Found" };

  return {
    title: `${guide.title} — Derb`,
    description: guide.description,
    alternates: { canonical: `https://derb.so/guides/${guide.slug}` },
    openGraph: {
      title: `${guide.title} — Derb`,
      description: guide.description,
      type: "article",
      url: `https://derb.so/guides/${guide.slug}`,
      siteName: "Derb",
      images: [{ url: "https://derb.so/og-image.png", width: 1200, height: 630, alt: guide.title }],
    },
  };
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

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const questions = getGuideQuestions(slug);
  const allGuides = getGuides();
  const currentIndex = allGuides.findIndex((g) => g.slug === slug);
  const nextGuide = allGuides[(currentIndex + 1) % allGuides.length];
  const prevGuide = allGuides[(currentIndex - 1 + allGuides.length) % allGuides.length];

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <nav
        className="font-mono text-meta uppercase tracking-wide text-tertiary mb-8 flex items-center gap-2"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-accent transition-colors">Derb</Link>
        <span aria-hidden>/</span>
        <Link href="/guides" className="hover:text-accent transition-colors">Guides</Link>
      </nav>

      <header className="max-w-prose mb-12">
        <p className="font-mono text-meta uppercase tracking-wide text-accent mb-3">
          Guide {String(currentIndex + 1).padStart(2, "0")} / {String(allGuides.length).padStart(2, "0")}
        </p>
        <h1 className="font-serif text-5xl leading-tight text-ink mb-3">
          {guide.title}
        </h1>
        {guide.subtitle ? (
          <p className="font-serif italic text-xl text-tertiary mb-4">
            {guide.subtitle}
          </p>
        ) : null}
        {guide.description ? (
          <p className="text-lg text-secondary">{guide.description}</p>
        ) : null}
        <p className="font-mono text-meta uppercase tracking-wide text-tertiary mt-6 pt-4 border-t border-border">
          {questions.length} observations
        </p>
      </header>

      <ol className="border-t border-border">
        {questions.map((q, i) => {
          if (!q) return null;
          const isFeatured = i === 0;
          return (
            <li key={q.slug} id={q.slug} className="border-b border-border">
              <Link
                href={`/questions/${q.slug}`}
                className={`flex items-baseline gap-6 group ${isFeatured ? "py-8" : "py-6"}`}
              >
                <span className="font-mono text-meta text-tertiary w-10 shrink-0 pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 min-w-0 max-w-prose">
                  <span
                    className={`block font-serif text-ink group-hover:text-accent transition-colors ${
                      isFeatured ? "text-2xl md:text-3xl" : "text-xl"
                    }`}
                  >
                    {q.title}
                  </span>
                  {q.shortAnswer ? (
                    <span className="block text-secondary mt-2">
                      {renderInlineLinks(q.shortAnswer)}
                    </span>
                  ) : null}
                  {isFeatured && q.sections[0] ? (
                    <span className="block text-tertiary mt-3 border-l border-border pl-4">
                      {q.sections[0].content.slice(0, 220)}
                      {q.sections[0].content.length > 220 ? "…" : ""}
                    </span>
                  ) : null}
                </span>
                <span className="font-mono text-meta text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0 pt-2">
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <nav className="mt-16 grid grid-cols-1 md:grid-cols-2 border-t border-border">
        <Link
          href={`/guides/${prevGuide.slug}`}
          className="block py-6 md:pr-8 md:border-r border-border group"
        >
          <p className="font-mono text-meta uppercase tracking-wide text-tertiary mb-1">
            ← Previous guide
          </p>
          <p className="font-serif text-xl text-ink group-hover:text-accent transition-colors">
            {prevGuide.title}
          </p>
        </Link>
        <Link
          href={`/guides/${nextGuide.slug}`}
          className="block py-6 md:pl-8 md:text-right group"
        >
          <p className="font-mono text-meta uppercase tracking-wide text-tertiary mb-1">
            Next guide →
          </p>
          <p className="font-serif text-xl text-ink group-hover:text-accent transition-colors">
            {nextGuide.title}
          </p>
        </Link>
      </nav>
    </div>
  );
}
