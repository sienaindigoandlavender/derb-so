import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";

const siteUrl = "https://derb.so";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1c1917" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1917" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Derb — Understanding Morocco | Urban Reference Guide",
    template: "%s | Derb",
  },
  description:
    "Why do riads feel cooler? Why are there cockroaches? Why does time feel different? Derb explains the everyday realities of Morocco's cities—infrastructure, climate, culture—without tourism language.",
  keywords: [
    "Marrakech", "Morocco", "medina", "riad",
    "why cockroaches Marrakech", "why cats Marrakech", "riad bathroom smell",
    "Marrakech plumbing", "medina navigation", "Jemaa el-Fna",
    "Moroccan architecture", "riad cooling", "saltpetre walls",
    "efflorescence riad", "Marrakech heat", "medina streets",
    "Moroccan culture explained", "Morocco travel guide",
    "urban systems", "infrastructure Morocco",
  ],
  authors: [{ name: "Derb", url: siteUrl }],
  creator: "Slow Morocco",
  publisher: "Slow Morocco",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Derb",
    title: "Derb — Understanding Morocco",
    description: "An urban reference explaining cockroaches, cats, plumbing, heat, and time in Morocco. Systems, not stories.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Derb - Understanding Marrakech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Derb — Understanding Morocco",
    description: "Why riads feel cooler. Why there are cats everywhere. Why Google Maps fails. The everyday realities of Morocco, explained.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: siteUrl },
  category: "travel",
  other: {
    "geo.region": "MA-MAR",
    "geo.placename": "Marrakech",
    "geo.position": "31.6295;-7.9811",
    ICBM: "31.6295, -7.9811",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Derb",
  alternateName: "Derb Marrakech Guide",
  url: siteUrl,
  description: "An urban reference explaining the everyday realities of Morocco's cities.",
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Derb",
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  parentOrganization: { "@type": "Organization", name: "Dancing with Lions", url: "https://www.dancingwiththelions.com" },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="Derb — Urban Reference for Morocco" href="/feed.xml" />
        {/* GEO / AI citation metadata */}
        <meta name="citation_title" content="Derb — Understanding Morocco: Urban Reference Guide" />
        <meta name="citation_author" content="Slow Morocco, Dancing with Lions" />
        <meta name="citation_language" content="en" />
        <meta name="citation_keywords" content="Morocco, Marrakech, medina, riad, urban infrastructure, cultural guide" />
        <meta name="dc.title" content="Derb — Understanding Morocco" />
        <meta name="dc.creator" content="Dancing with Lions" />
        <meta name="dc.subject" content="Morocco; Urban Systems; Cultural Infrastructure; Travel Reference" />
        <meta name="dc.language" content="en" />
        <meta name="dc.type" content="Text" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MS7XFWC2NP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MS7XFWC2NP');
          `}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="site-header">
            <div className="site-header-inner">
              <a href="/" className="site-logo">Derb</a>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
