import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getQuestions } from "@/lib/questions";
import { Category, categoryLabels } from "@/lib/types";

const siteUrl = "https://derb.so";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryMeta: Record<
  Category,
  { description: string; h1: string; intro: string }
> = {
  "arrival-logistics": {
    description:
      "Taxis, trains, buses, ride-hailing apps, the tourist tax, and getting from the airport to your riad door.",
    h1: "Arrival & Logistics",
    intro:
      "Getting around Morocco — how transport works, what to expect on arrival, and why your taxi can't take you to the door.",
  },
  "the-medina": {
    description:
      "GPS errors, bathroom smells, cold riads, loud prayer calls, cockroaches, and the architecture behind it all.",
    h1: "The Medina",
    intro:
      "What confuses, surprises, or unsettles visitors about life inside the old walled city — and the infrastructure behind it.",
  },
  "social-cultural": {
    description:
      "Tea etiquette, dress codes, photography, bargaining, public affection, and the social codes of Morocco.",
    h1: "Social & Cultural",
    intro:
      "The unwritten rules — what's expected, what's rude, what's illegal, and what's just different.",
  },
  "food-drink": {
    description:
      "Tap water, shared tagines, hammams, mint tea, vegan food, alcohol, and why your stomach might need a day to adjust.",
    h1: "Food & Drink",
    intro:
      "What to eat, how to eat it, what to drink, and what your body might need a couple of days to get used to.",
  },
  "safety": {
    description:
      "Henna scams, fake guides, tourist police, horse carriages, and navigating the medina at night.",
    h1: "Safety",
    intro:
      "What to watch for, who to trust, and where to go when something goes wrong.",
  },
  "religious-calendar": {
    description:
      "Ramadan, Eid al-Adha, public holidays, and how the religious calendar affects daily life in Morocco.",
    h1: "Religious Calendar",
    intro:
      "The dates and observances that shape the rhythm of Moroccan life — and what they mean for visitors.",
  },
  "cities": {
    description:
      "Marrakech mosques, Casablanca's Art Deco, Agadir's earthquake, Rabat as capital, and Taghazout's surf culture.",
    h1: "Cities",
    intro:
      "City-specific questions — what makes each place different and what visitors most often ask.",
  },
};

const validCategories = Object.keys(categoryLabels) as Category[];

export async function generateStaticParams() {
  return validCategories.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slug as Category;

  if (!validCategories.includes(category)) {
    return { title: "Not Found" };
  }

  const meta = categoryMeta[category];
  const pageUrl = `${siteUrl}/category/${slug}`;

  return {
    title: meta.h1,
    description: meta.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${meta.h1} — Derb`,
      description: meta.description,
      url: pageUrl,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = slug as Category;

  if (!validCategories.includes(category)) {
    notFound();
  }

  const questions = getQuestions().filter((q) => q.category === category);
  const meta = categoryMeta[category];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: meta.h1,
    description: meta.description,
    url: `${siteUrl}/category/${slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Derb",
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: questions.length,
      itemListElement: questions.map((q, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteUrl}/questions/${q.slug}`,
        name: q.title,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Derb",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Questions",
        item: `${siteUrl}/questions`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: meta.h1,
        item: `${siteUrl}/category/${slug}`,
      },
    ],
  };

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-prose">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-small text-muted">
            <li>
              <a href="/" className="hover:opacity-70 transition-opacity">
                Derb
              </a>
            </li>
            <li className="opacity-40">/</li>
            <li>
              <a
                href="/questions"
                className="hover:opacity-70 transition-opacity"
              >
                Questions
              </a>
            </li>
            <li className="opacity-40">/</li>
            <li className="opacity-70">{meta.h1}</li>
          </ol>
        </nav>

        <header className="mb-10">
          <h1 className="text-display font-serif mb-4">{meta.h1}</h1>
          <p className="text-body text-muted">{meta.intro}</p>
        </header>

        <div className="category-question-list">
          {questions.map((q) => (
            <Link
              key={q.slug}
              href={`/questions/${q.slug}`}
              className="category-question-item"
            >
              <span className="category-question-title">{q.title}</span>
              {q.shortAnswer && (
                <span className="category-question-short">
                  {q.shortAnswer.length > 120
                    ? q.shortAnswer.slice(0, 120) + "…"
                    : q.shortAnswer}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Other categories */}
        <nav className="mt-16 pt-8 border-t border-border">
          <p className="text-small font-medium text-muted uppercase tracking-wide mb-4">
            Other categories
          </p>
          <div className="flex flex-wrap gap-2">
            {validCategories
              .filter((c) => c !== category)
              .map((c) => (
                <Link
                  key={c}
                  href={`/category/${c}`}
                  className="tag hover:opacity-70 transition-opacity"
                >
                  {categoryLabels[c]}
                </Link>
              ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
