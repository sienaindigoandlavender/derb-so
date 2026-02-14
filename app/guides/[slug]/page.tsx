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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Not Found" };

  return {
    title: `${guide.title} — Derb`,
    description: guide.description,
    openGraph: {
      title: `${guide.title} — Derb`,
      description: guide.description,
      type: "article",
      url: `https://derb.so/guides/${guide.slug}`,
      siteName: "Derb",
    },
  };
}

// Convert [text](url) in content to clickable links
function renderInlineLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <a
          key={i}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="content-link"
        >
          {match[1]}
        </a>
      );
    }
    return part;
  });
}


type ZoneType = "white" | "terracotta" | "indigo" | "dark" | "terracotta-pale" | "sand";

interface Zone {
  type: ZoneType;
  entries: number[];
}

function buildZones(total: number): Zone[] {
  const zones: Zone[] = [];
  const colorCycle: ZoneType[] = ["terracotta", "indigo", "dark", "terracotta-pale"];
  let colorIdx = 0;
  let whiteBuffer: number[] = [];

  for (let i = 0; i < total; i++) {
    // Every 3rd entry starting from index 1 gets a colored zone
    if (i > 0 && i % 3 === 1) {
      // Flush white buffer
      if (whiteBuffer.length > 0) {
        zones.push({ type: "white", entries: [...whiteBuffer] });
        whiteBuffer = [];
      }
      // Add colored zone
      zones.push({
        type: colorCycle[colorIdx % colorCycle.length],
        entries: [i],
      });
      colorIdx++;
    } else {
      whiteBuffer.push(i);
    }
  }

  // Flush remaining white buffer
  if (whiteBuffer.length > 0) {
    zones.push({ type: "white", entries: [...whiteBuffer] });
  }

  return zones;
}

// Guide hero colors — matches homepage shelf
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

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const questions = getGuideQuestions(slug);
  const allGuides = getGuides();
  const currentIndex = allGuides.findIndex((g) => g.slug === slug);
  const nextGuide = allGuides[(currentIndex + 1) % allGuides.length];
  const prevGuide =
    allGuides[(currentIndex - 1 + allGuides.length) % allGuides.length];

  const zones = buildZones(questions.length);
  const heroColor = guideHeroColors[slug] || "#2a2725";

  return (
    <div className="guide-page">
      {/* Colored hero */}
      <div className="guide-hero" style={{ background: heroColor }}>
        <div className="guide-hero-inner">
          <nav className="guide-breadcrumb">
            <Link href="/">Derb</Link>
            <span>/</span>
            <Link href="/guides">Guides</Link>
          </nav>
          <p className="guide-number">
            Guide {String(currentIndex + 1).padStart(2, "0")} of{" "}
            {String(allGuides.length).padStart(2, "0")}
          </p>
          <h1 className="guide-title">{guide.title}</h1>
          <p className="guide-subtitle">{guide.subtitle}</p>
          <p className="guide-description">{guide.description}</p>
          <p className="guide-count">{questions.length} observations</p>
        </div>
      </div>

      {/* Multi-zone content */}
      <div className="guide-content">
        {zones.map((zone, zoneIdx) => {
          // Entry zones
          return (
            <div
              key={`zone-${zoneIdx}`}
              className={`guide-zone guide-zone--${zone.type}`}
            >
              <div className="guide-zone-inner">
                {zone.entries.map((entryIdx) => {
                  const q = questions[entryIdx];
                  if (!q) return null;

                  const isFeatured =
                    entryIdx === 0 ||
                    entryIdx === Math.floor(questions.length / 2);
                  const isPullQuote =
                    zone.type !== "white" || (entryIdx % 3 === 1 && entryIdx !== 0);
                  const entryClass = isFeatured
                    ? "guide-entry--featured"
                    : isPullQuote
                    ? "guide-entry--pullquote"
                    : "guide-entry--compact";

                  return (
                    <section
                      key={q.slug}
                      className={`guide-entry ${entryClass}`}
                      id={q.slug}
                    >
                      <span className="guide-entry-number">
                        {String(entryIdx + 1).padStart(2, "0")}
                      </span>

                      <h2 className="guide-entry-title">
                        <Link href={`/questions/${q.slug}`}>{q.title}</Link>
                      </h2>

                      {q.shortAnswer && (
                        <p
                          className={`guide-entry-answer ${
                            isPullQuote ? "guide-entry-answer--large" : ""
                          }`}
                        >
                          {renderInlineLinks(q.shortAnswer)}
                        </p>
                      )}

                      {isFeatured && q.sections[0] && (
                        <div className="guide-entry-body">
                          <p>{renderInlineLinks(q.sections[0].content)}</p>
                        </div>
                      )}

                      <Link
                        href={`/questions/${q.slug}`}
                        className="guide-entry-more"
                      >
                        Read more →
                      </Link>
                    </section>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dark navigation */}
      <nav className="guide-nav">
        <Link href={`/guides/${prevGuide.slug}`} className="guide-nav-link">
          <span className="guide-nav-label">Previous</span>
          <span className="guide-nav-title">{prevGuide.title}</span>
        </Link>
        <Link
          href={`/guides/${nextGuide.slug}`}
          className="guide-nav-link guide-nav-link--next"
        >
          <span className="guide-nav-label">Next</span>
          <span className="guide-nav-title">{nextGuide.title}</span>
        </Link>
      </nav>
    </div>
  );
}
