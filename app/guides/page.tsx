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
    <div className="guides-index">
      {/* Header */}
      <div className="guides-index-header">
        <div className="guides-index-header-inner">
          <nav className="guide-breadcrumb">
            <Link href="/">Derb</Link>
          </nav>
          <h1 className="guides-index-title">Guides</h1>
          <p className="guides-index-subtitle">
            Seven ways into Morocco
          </p>
        </div>
      </div>

      {/* List */}
      <div className="guides-list-wrap">
        <ol className="guides-list">
          {guides.map((guide, i) => {
            const questions = getGuideQuestions(guide.slug);
            return (
              <li key={guide.slug} className={`guides-list-item ${i === 0 ? "guides-list-item--lead" : ""}`}>
                <Link href={`/guides/${guide.slug}`} className="guides-list-link">
                  <span className="guides-list-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="guides-list-body">
                    <span className="guides-list-title">{guide.title}</span>
                    <span className="guides-list-sub">{guide.subtitle}</span>
                    <span className="guides-list-desc">{guide.description}</span>
                  </span>
                  <span className="guides-list-meta">
                    <span className="guides-list-count">{questions.length}</span>
                    <span className="guides-list-arrow">→</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
