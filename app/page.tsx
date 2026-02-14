import Link from "next/link";
import HomeSearch from "@/components/HomeSearch";
import { getGuides, getGuideQuestions } from "@/lib/guides";
import { getQuestions } from "@/lib/questions";
import { categoryLabels } from "@/lib/types";

export default function Home() {
  const guides = getGuides();
  const questions = getQuestions();

  // FAQPage schema for AI systems
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.shortAnswer || q.sections[0]?.content || "",
        url: `https://derb.so/questions/${q.slug}`,
      },
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Derb",
    url: "https://derb.so",
    description: "Practical knowledge for visitors to Morocco — the things you notice but can't explain.",
    publisher: {
      "@type": "Organization",
      name: "Slow Morocco",
      url: "https://slowmorocco.com",
    },
  };

  // Pick a featured question — first question from first guide
  const firstGuide = guides[0];
  const firstGuideQuestions = getGuideQuestions(firstGuide.slug);
  const featured = firstGuideQuestions[0];

  const recent = [...questions]
    .sort(
      (a, b) =>
        new Date(b.lastUpdated ).getTime() -
        new Date(a.lastUpdated ).getTime()
    )
    .slice(0, 5);

  return (
    <div className="home-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* ZONE 1 — Dark hero */}
      <div className="home-hero">
        <div className="home-hero-inner">
          <HomeSearch />
        </div>
      </div>

      {/* ZONE 2 — Terracotta feature */}
      {featured && (
        <Link href={`/questions/${featured.slug}`} className="home-feature-strip">
          <div className="home-feature-inner">
            <span className="home-feature-label">Featured observation</span>
            <h2 className="home-feature-title">{featured.title}</h2>
            {featured.shortAnswer && (
              <p className="home-feature-answer">{featured.shortAnswer}</p>
            )}
            <span className="home-feature-link">Read more →</span>
          </div>
        </Link>
      )}

      {/* ZONE 4 — Guide shelf */}
      <section className="home-shelf">
        <div className="home-shelf-grid">
          {guides.map((guide, i) => {
            const qCount = getGuideQuestions(guide.slug).length;
  const colors = [
              "terracotta", "clay", "teal", "majorelle",
              "saffron", "emerald", "orange-red", "dark-gray"
            ];
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className={`shelf-spine shelf-spine--${colors[i]}`}
              >
                <span className="shelf-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="shelf-title">{guide.title}</h2>
                <div className="shelf-bottom">
                  <span className="shelf-count">{qCount}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ZONE 5 — Indigo quote strip */}
      <div className="home-indigo-strip">
        <div className="home-indigo-inner">
          <p className="home-indigo-quote">
            Cockroaches, plumbing, heat, cats, and everything else.
          </p>
          <p className="home-indigo-attr">
            {questions.length} questions across {guides.length} guides · Morocco&apos;s cities
          </p>
        </div>
      </div>

      {/* ZONE 6 — Sand recent */}
      <section className="home-recent">
        <div className="home-recent-inner">
          <p className="home-section-label">Recently added</p>
          <div className="recent-list">
            {recent.map((q) => (
              <Link
                key={q.slug}
                href={`/questions/${q.slug}`}
                className="recent-item"
              >
                <span className="recent-item-title">{q.title}</span>
                <span className="recent-item-meta">
                  <span>{categoryLabels[q.category]}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
