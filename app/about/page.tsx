import { Metadata } from "next";

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
      parentOrganization: { "@type": "Organization", name: "Slow Morocco", url: "https://slowmorocco.com" },
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* Dark hero */}
      <div className="about-hero">
        <div className="about-hero-inner">
          <h1 className="about-title">About</h1>
          <p className="about-subtitle">
            An independent urban reference for Morocco.
          </p>
        </div>
      </div>

      {/* White body */}
      <div className="about-body">
        <div className="about-body-inner">
          <article className="prose">
            <div className="mb-8">
              <p>
                Derb explains the everyday realities of Morocco&rsquo;s cities &mdash;
                infrastructure, climate, architecture, culture, and navigation.
                The questions visitors actually have but that travel guides
                don&rsquo;t address.
              </p>
            </div>

            <div className="mb-8">
              <p>
                This is not a travel blog, a review site, or a recommendation
                engine. No hotel rankings, no restaurant ratings, no experience
                scores. Derb explains how things work.
              </p>
            </div>

            <div className="mb-8">
              <p>
                Published by{" "}
                <a href="https://slowmorocco.com" target="_blank" rel="noopener noreferrer">
                  Slow Morocco
                </a>
                . If you find an error,{" "}
                <a href="https://slowmorocco.com/contact" target="_blank" rel="noopener noreferrer">
                  let us know
                </a>
                .
              </p>
            </div>
          </article>

          <footer style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--rule)' }}>
            <a
              href="/questions"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--terracotta)' }}
            >
              &larr; Browse all questions
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
