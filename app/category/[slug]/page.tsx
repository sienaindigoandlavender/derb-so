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
    isPartOf: { "@type": "WebSite", name: "Derb", url: siteUrl },
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
      { "@type": "ListItem", position: 1, name: "Derb", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Questions", item: `${siteUrl}/questions` },
      { "@type": "ListItem", position: 3, name: meta.h1, item: `${siteUrl}/category/${slug}` },
    ],
  };

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav
        className="font-mono text-meta uppercase tracking-wide text-tertiary mb-8 flex items-center gap-2"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-accent transition-colors">Derb</Link>
        <span aria-hidden>/</span>
        <Link href="/questions" className="hover:text-accent transition-colors">Questions</Link>
        <span aria-hidden>/</span>
        <span>{meta.h1}</span>
      </nav>

      <header className="max-w-prose mb-12">
        <p className="font-mono text-meta uppercase tracking-wide text-accent mb-3">
          Category
        </p>
        <h1 className="font-serif text-5xl leading-tight text-ink mb-4">
          {meta.h1}
        </h1>
        <p className="text-lg text-secondary">{meta.intro}</p>
      </header>

      <ol className="border-t border-border">
        {questions.map((q, i) => (
          <li key={q.slug} className="border-b border-border">
            <Link
              href={`/questions/${q.slug}`}
              className="flex items-baseline gap-4 py-5 group"
            >
              <span className="font-mono text-meta text-tertiary w-8 shrink-0 pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 min-w-0 max-w-prose">
                <span className="block font-serif text-xl text-ink group-hover:text-accent transition-colors">
                  {q.title}
                </span>
                {q.shortAnswer && (
                  <span className="block text-secondary mt-1">
                    {q.shortAnswer.length > 160
                      ? q.shortAnswer.slice(0, 160) + "…"
                      : q.shortAnswer}
                  </span>
                )}
              </span>
              <span className="font-mono text-meta text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0 pt-2">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <nav className="mt-16 pt-8 border-t border-border">
        <p className="font-mono text-meta uppercase tracking-wide text-tertiary mb-4">
          Other categories
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {validCategories
            .filter((c) => c !== category)
            .map((c) => (
              <li key={c}>
                <Link
                  href={`/category/${c}`}
                  className="text-ink hover:text-accent border-b border-border hover:border-accent transition-colors"
                >
                  {categoryLabels[c]}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
