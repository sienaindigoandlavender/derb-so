import Link from "next/link";
import HomeSearch from "@/components/HomeSearch";
import { getGuides } from "@/lib/guides";
import { getQuestions } from "@/lib/questions";
import { categoryLabels, Category } from "@/lib/types";

export default function Home() {
  const guides = getGuides();
  const questions = getQuestions();

  const byCategory = (Object.entries(categoryLabels) as [Category, string][]).map(([id, label]) => ({
    id,
    label,
    questions: questions.filter((q) => q.category === id),
  })).filter((c) => c.questions.length > 0);

  return (
    <div className="home-page">

      {/* MASTHEAD */}
      <div className="home-masthead">
        <div className="home-masthead-inner">
          <div className="home-masthead-top">
            <span className="home-masthead-tag">Urban Reference · Morocco</span>
            <span className="home-masthead-count">{questions.length} questions · {guides.length} guides</span>
          </div>
          <h1 className="home-masthead-title">
            What you notice.<br />
            <em>Explained.</em>
          </h1>
          <p className="home-masthead-sub">
            Why riads feel cooler. Why there are cats. Why Google Maps fails.
            The infrastructure, architecture, and culture behind everything you observe.
          </p>
          <div className="home-masthead-search">
            <HomeSearch />
          </div>
        </div>
      </div>

      {/* GUIDES NAV */}
      <nav className="home-guides-nav">
        <div className="home-guides-nav-inner">
          <span className="home-nav-label">Guides</span>
          <div className="home-guides-links">
            {guides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="home-guide-link">
                {g.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* QUESTION INDEX */}
      <div className="home-index">
        <div className="home-index-inner">
          {byCategory.map((cat) => (
            <section key={cat.id} className="home-category-block">
              <div className="home-category-header">
                <Link href={`/category/${cat.id}`} className="home-category-title">
                  {cat.label}
                </Link>
                <span className="home-category-rule" />
              </div>
              <ol className="home-question-list">
                {cat.questions.map((q, i) => (
                  <li key={q.slug} className="home-question-item">
                    <Link href={`/questions/${q.slug}`} className="home-question-link">
                      <span className="home-question-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="home-question-body">
                        <span className="home-question-title">{q.title}</span>
                        {q.shortAnswer && (
                          <span className="home-question-answer">{q.shortAnswer}</span>
                        )}
                      </span>
                      <span className="home-question-arrow">→</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="home-footer-note">
        <div className="home-footer-note-inner">
          <p>
            A <a href="https://www.slowmorocco.com">Slow Morocco</a> publication ·{" "}
            <a href="https://www.dancingwiththelions.com">Dancing with Lions</a>
          </p>
        </div>
      </div>

    </div>
  );
}
