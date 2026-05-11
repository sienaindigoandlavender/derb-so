import { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://derb.so";

export const metadata: Metadata = {
  title: "About — Derb",
  description: "An independent urban reference for Morocco. Published by Slow Morocco.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About — Derb",
    description: "An independent urban reference for Morocco. Published by Slow Morocco.",
    url: `${siteUrl}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Derb",
    url: `${siteUrl}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "Derb",
      url: siteUrl,
      description: "An independent urban reference for Morocco.",
      parentOrganization: { "@type": "Organization", name: "Dancing with Lions", url: "https://www.dancingwiththelions.com" },
    },
  };

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <nav
        className="font-mono text-meta uppercase tracking-wide text-tertiary mb-8 flex items-center gap-2"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-accent transition-colors">Derb</Link>
        <span aria-hidden>/</span>
        <span>About</span>
      </nav>

      <header className="max-w-prose mb-12">
        <p className="font-mono text-meta uppercase tracking-wide text-accent mb-3">
          Methodology
        </p>
        <h1 className="font-serif text-5xl leading-tight text-ink mb-4">
          About Derb
        </h1>
        <p className="text-lg text-secondary">
          An independent urban reference for Morocco.
        </p>
      </header>

      <article className="prose-content">
        <p>
          Derb explains the everyday realities of Morocco&rsquo;s cities —
          infrastructure, climate, architecture, culture, and navigation. The
          questions visitors actually have but that travel guides don&rsquo;t
          address.
        </p>
        <p>
          This is not a travel blog, a review site, or a recommendation engine.
          No hotel rankings, no restaurant ratings, no experience scores. Derb
          explains how things work.
        </p>
        <p>
          Published by{" "}
          <a
            href="https://www.slowmorocco.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Slow Morocco
          </a>
          . If you find an error,{" "}
          <a
            href="https://www.slowmorocco.com/contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            let us know
          </a>
          .
        </p>
      </article>

      <footer className="mt-16 pt-8 border-t border-border max-w-prose">
        <Link
          href="/questions"
          className="font-mono text-meta uppercase tracking-wide text-accent hover:opacity-70 transition-opacity"
        >
          ← Browse all questions
        </Link>
      </footer>
    </div>
  );
}
