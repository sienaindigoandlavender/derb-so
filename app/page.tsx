import Link from "next/link";
import HomeSearch from "@/components/HomeSearch";
import HomeCategories from "@/components/HomeCategories";
import DarijaSpotlight from "@/components/DarijaSpotlight";
import { getGuides } from "@/lib/guides";
import { getQuestions } from "@/lib/questions";
import { categoryLabels, Category } from "@/lib/types";

export default function Home() {
  const guides = getGuides();
  const questions = getQuestions();

  const byCategory = (Object.entries(categoryLabels) as [Category, string][]).map(
    ([id, label]) => ({
      id,
      label,
      questions: questions.filter((q) => q.category === id),
    })
  ).filter((c) => c.questions.length > 0);

  const recentQuestions = [...questions]
    .filter((q) => q.lastUpdated)
    .sort((a, b) => (b.lastUpdated || "").localeCompare(a.lastUpdated || ""))
    .slice(0, 4);

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      {/* HERO */}
      <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="max-w-prose">
          <p className="font-mono text-meta uppercase tracking-wide text-tertiary mb-6">
            Urban Reference · Morocco
          </p>
          <h1 className="font-serif text-5xl leading-tight text-ink mb-6">
            What you notice, explained.
          </h1>
          <p className="text-lg text-secondary">
            Why riads feel cooler. Why there are cats. Why Google Maps fails.
            Derb is a reference for the infrastructure, architecture, and
            culture behind the everyday details of Morocco&rsquo;s cities.
          </p>
        </div>
        <div>
          <div className="border border-border p-6">
            <p className="font-mono text-meta uppercase tracking-wide text-tertiary mb-3">
              Search the reference
            </p>
            <HomeSearch />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-meta uppercase tracking-wide text-tertiary">
            <span>{questions.length} questions · {guides.length} guides</span>
            <Link href="/questions" className="hover:text-accent transition-colors">
              All questions →
            </Link>
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section className="mb-20">
        <h2 className="font-mono text-meta uppercase tracking-wide text-tertiary mb-6">
          Guides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="block group">
              <p className="font-serif text-xl text-ink group-hover:text-accent transition-colors mb-1">
                {g.title}
              </p>
              {g.subtitle ? (
                <p className="text-sm text-secondary italic mb-1">{g.subtitle}</p>
              ) : null}
              {g.description ? (
                <p className="text-sm text-secondary">{g.description}</p>
              ) : null}
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORIES + QUESTION INDEX */}
      <section className="mb-20">
        <h2 className="font-mono text-meta uppercase tracking-wide text-tertiary mb-6">
          By category
        </h2>
        <HomeCategories groups={byCategory} />
      </section>

      {/* RECENT */}
      {recentQuestions.length > 0 && (
        <section className="mb-20">
          <h2 className="font-mono text-meta uppercase tracking-wide text-tertiary mb-6">
            Recently updated
          </h2>
          <ul className="space-y-6">
            {recentQuestions.map((q) => (
              <li key={q.slug}>
                <Link
                  href={`/questions/${q.slug}`}
                  className="block group max-w-prose"
                >
                  <p className="font-serif text-2xl text-ink group-hover:text-accent transition-colors mb-1">
                    {q.title}
                  </p>
                  {q.shortAnswer ? (
                    <p className="text-secondary mb-2">{q.shortAnswer}</p>
                  ) : null}
                  <p className="text-meta text-tertiary font-mono uppercase tracking-wide">
                    {categoryLabels[q.category]} · {q.lastUpdated}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* DARIJA */}
      <DarijaSpotlight />

      <section className="border-t border-border pt-12 mt-20 font-mono text-meta uppercase tracking-wide text-tertiary">
        <p>
          {questions.length} questions · {guides.length} guides ·
          {" "}
          {byCategory.length} categories indexed
        </p>
      </section>
    </div>
  );
}
