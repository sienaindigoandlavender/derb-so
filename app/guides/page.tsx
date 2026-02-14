import { Metadata } from "next";
import Link from "next/link";
import { getGuides, getGuideQuestions } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides — Derb",
  description:
    "Thematic guides to Morocco: the medina, the riad, getting around, food, rituals, safety, and the cities.",
};

// Assign color accents to specific guide positions for visual rhythm
const cardColors: Record<number, string> = {
  1: "terracotta",   // Inside the Riad
  4: "indigo",       // Food & Drink
  6: "dark",         // Staying Safe
};

export default function GuidesPage() {
  const guides = getGuides();

  return (
    <div className="guides-index">
      {/* Dark header */}
      <div className="guides-index-header">
        <div className="guides-index-header-inner">
          <nav className="guide-breadcrumb">
            <Link href="/">Derb</Link>
          </nav>
          <h1 className="guides-index-title">Guides</h1>
          <p className="guides-index-subtitle">
            Eight ways into Morocco
          </p>
        </div>
      </div>

      {/* Cards with color accents */}
      <div className="guides-grid">
        {guides.map((guide, i) => {
          const questions = getGuideQuestions(guide.slug);
          const isLarge = i === 0 || i === 3;
          const colorClass = cardColors[i] ? `guides-card--${cardColors[i]}` : "";

          return (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className={`guides-card ${isLarge ? "guides-card--large" : ""} ${colorClass}`}
            >
              <span className="guides-card-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="guides-card-title">{guide.title}</h2>
              <p className="guides-card-subtitle">{guide.subtitle}</p>
              <p className="guides-card-description">{guide.description}</p>
              <span className="guides-card-count">
                {questions.length} observations
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
