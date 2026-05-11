import { Metadata } from "next";
import Link from "next/link";
import { getGuides, getGuideQuestions } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides — Derb",
  description:
    "Thematic guides to Morocco: the medina, the riad, getting around, food, rituals, safety, and the cities.",
  alternates: { canonical: "https://derb.so/guides" },
};

export default function GuidesPage() {
  const guides = getGuides();

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <nav
        className="font-mono text-meta uppercase tracking-wide text-tertiary mb-8 flex items-center gap-2"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-accent transition-colors">Derb</Link>
        <span aria-hidden>/</span>
        <span>Guides</span>
      </nav>

      <header className="max-w-prose mb-16">
        <h1 className="font-serif text-5xl leading-tight text-ink mb-4">
          Guides
        </h1>
        <p className="text-lg text-secondary">
          Seven ways into Morocco — thematic entry points that group related
          questions, observations, and references.
        </p>
      </header>

      <ol className="border-t border-border">
        {guides.map((guide, i) => {
          const questions = getGuideQuestions(guide.slug);
          return (
            <li key={guide.slug} className="border-b border-border">
              <Link
                href={`/guides/${guide.slug}`}
                className="flex items-baseline gap-6 py-8 group"
              >
                <span className="font-mono text-meta text-tertiary w-10 shrink-0 pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 min-w-0 max-w-prose">
                  <span className="block font-serif text-2xl md:text-3xl text-ink group-hover:text-accent transition-colors">
                    {guide.title}
                  </span>
                  {guide.subtitle ? (
                    <span className="block font-serif italic text-tertiary mt-1">
                      {guide.subtitle}
                    </span>
                  ) : null}
                  {guide.description ? (
                    <span className="block text-secondary mt-2">
                      {guide.description}
                    </span>
                  ) : null}
                </span>
                <span className="font-mono text-meta uppercase tracking-wide text-tertiary shrink-0 pt-2">
                  {questions.length} obs
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
