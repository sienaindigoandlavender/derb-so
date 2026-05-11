"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Section {
  title: string;
  content: string;
}

interface LegalContent {
  title: string;
  sections: Section[];
}

interface NexusLegalPageProps {
  pageId: string;
  fallbackTitle: string;
  localApiEndpoint?: string;
}

export default function NexusLegalPage({
  pageId,
  fallbackTitle,
  localApiEndpoint,
}: NexusLegalPageProps) {
  const [content, setContent] = useState<LegalContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/sheets/nexus-legal?page=${pageId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Nexus not available");
        return res.json();
      })
      .then((data) => {
        if (data.sections && data.sections.length > 0) {
          setContent(data);
          setLoading(false);
        } else {
          throw new Error("No Nexus content");
        }
      })
      .catch(() => {
        if (localApiEndpoint) {
          fetch(localApiEndpoint)
            .then((res) => res.json())
            .then((data) => {
              if (Array.isArray(data)) {
                setContent({
                  title: fallbackTitle,
                  sections: data.map(
                    (s: { Title: string; Content: string }) => ({
                      title: s.Title,
                      content: s.Content,
                    })
                  ),
                });
              }
              setLoading(false);
            })
            .catch(() => setLoading(false));
        } else {
          setLoading(false);
        }
      });
  }, [pageId, localApiEndpoint, fallbackTitle]);

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <nav
        className="font-mono text-meta uppercase tracking-wide text-tertiary mb-8 flex items-center gap-2"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-accent transition-colors">Derb</Link>
        <span aria-hidden>/</span>
        <span>{content?.title || fallbackTitle}</span>
      </nav>

      <header className="max-w-prose mb-12">
        <p className="font-mono text-meta uppercase tracking-wide text-accent mb-3">
          Legal
        </p>
        <h1 className="font-serif text-5xl leading-tight text-ink">
          {content?.title || fallbackTitle}
        </h1>
      </header>

      {loading ? (
        <div className="max-w-prose pt-8 border-t border-border space-y-3 animate-pulse">
          <div className="h-3 bg-border rounded w-3/4" />
          <div className="h-3 bg-border rounded w-1/2" />
          <div className="h-3 bg-border rounded w-5/6" />
        </div>
      ) : content?.sections && content.sections.length > 0 ? (
        <div className="space-y-10 max-w-prose pt-8 border-t border-border">
          {content.sections.map((section, index) => (
            <section key={index}>
              {section.title && section.title !== "Intro" && (
                <h2 className="font-serif text-2xl text-ink mb-3">
                  {section.title}
                </h2>
              )}
              <p className="text-secondary whitespace-pre-line">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      ) : (
        <p className="text-secondary max-w-prose">Content not available.</p>
      )}
    </div>
  );
}
