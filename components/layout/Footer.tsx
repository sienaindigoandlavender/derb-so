"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ContentSite {
  label: string;
  url: string;
}

export default function Footer() {
  const [contentSites, setContentSites] = useState<ContentSite[]>([]);

  useEffect(() => {
    fetch("/api/footer")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.contentSites) {
          setContentSites(data.contentSites);
        }
      })
      .catch(() => {});
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-24">
      {/* ksour-style light content section */}
      <div className="max-w-content mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-meta text-tertiary">
        <div>
          <p className="font-serif text-base text-ink mb-2">Derb</p>
          <p>
            An independent urban reference for Morocco — infrastructure,
            architecture, and culture explained without tourism language.
          </p>
        </div>
        <div>
          <p className="text-ink mb-2 font-mono uppercase tracking-wide">Browse</p>
          <ul className="space-y-1">
            <li><Link href="/guides">Guides</Link></li>
            <li><Link href="/questions">All questions</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-ink mb-2 font-mono uppercase tracking-wide">Legal</p>
          <ul className="space-y-1">
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>

      {/* Dark ombre — Level 1 */}
      <div className="bg-[#1f1f1f] text-white/80">
        <div className="max-w-content mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-meta">
          <p>
            © {year} Slow Morocco · Reference text for Morocco&rsquo;s cities.
          </p>
          {contentSites.length > 0 ? (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono uppercase tracking-wide">
              <span className="text-white/40">Network</span>
              {contentSites.map((site) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {site.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Dark ombre — Level 2 (deeper) */}
      <div className="bg-[#0e0e0e] text-white/70">
        <div className="max-w-content mx-auto px-6 py-4 text-meta font-mono uppercase tracking-wide flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
          <span>
            A{" "}
            <a
              href="https://www.slowmorocco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-colors"
            >
              Slow Morocco
            </a>{" "}
            project
          </span>
          <span aria-hidden>/</span>
          <span>
            <a
              href="https://darija.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-colors"
            >
              Darija Dictionary
            </a>
          </span>
          <span aria-hidden>/</span>
          <span>
            <a
              href="https://www.riaddisiena.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-colors"
            >
              Riad di Siena
            </a>
          </span>
          <span aria-hidden>/</span>
          <span>
            Powered by{" "}
            <a
              href="https://dancewithlions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-colors"
            >
              Dancing with Lions
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
