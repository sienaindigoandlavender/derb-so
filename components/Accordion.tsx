"use client";

import { useState } from "react";
import { Question, Category, categoryLabels } from "@/lib/types";
import { Illustration } from "./Illustration";

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

interface AccordionProps {
  questions: Question[];
}

interface AccordionItemProps {
  question: Question;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-5 text-left hover:opacity-70 transition-opacity"
      >
        <span className="font-serif text-lg md:text-xl text-ink">
          {question.title}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 text-accent transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="overflow-hidden">
          <div className="pb-8 max-w-prose">
            {question.shortAnswer && (
              <p className="font-serif text-lg text-ink leading-relaxed mb-6 pb-6 border-b border-border">
                {renderInlineLinks(question.shortAnswer)}
              </p>
            )}

            {question.subtitle && !question.shortAnswer && (
              <p className="text-secondary italic mb-6">
                {renderInlineLinks(question.subtitle)}
              </p>
            )}

            <div className="prose-content">
              {question.sections.map((section, index) => (
                <div key={index}>
                  <div>
                    {section.heading && <h3>{section.heading}</h3>}
                    <p>{renderInlineLinks(section.content)}</p>
                  </div>

                  {question.illustrations
                    .filter((ill) => ill.afterSection === index)
                    .map((ill) => (
                      <Illustration key={ill.id} id={ill.id} caption={ill.caption} />
                    ))}
                </div>
              ))}
            </div>

            {question.sources && question.sources.length > 0 && (
              <div className="mt-6 pt-4 border-t border-border text-secondary text-sm">
                <span className="font-mono text-meta uppercase tracking-wide text-tertiary mr-2">
                  Sources:
                </span>
                {question.sources.map((source, idx) => (
                  <span key={idx}>
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-b border-border hover:text-accent hover:border-accent transition-colors"
                      >
                        {source.text}
                      </a>
                    ) : (
                      source.text
                    )}
                    {idx < question.sources!.length - 1 && " · "}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between font-mono text-meta uppercase tracking-wide text-tertiary">
              <span>Updated · {question.lastUpdated}</span>
              <a
                href={`/questions/${question.slug}`}
                className="text-accent hover:opacity-70 transition-opacity"
              >
                Read full answer →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ questions }: AccordionProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const handleToggle = (slug: string) => {
    setOpenSlug(openSlug === slug ? null : slug);
  };

  const categories = Object.keys(categoryLabels) as Category[];
  const questionsByCategory = categories
    .map((category) => ({
      category,
      label: categoryLabels[category],
      questions: questions.filter((q) => q.category === category),
    }))
    .filter((group) => group.questions.length > 0);

  return (
    <div className="space-y-12">
      {questionsByCategory.map((group) => (
        <div key={group.category}>
          <div className="flex items-baseline gap-4 mb-2">
            <h3 className="font-mono text-meta uppercase tracking-wide text-accent">
              {group.label}
            </h3>
            <span className="flex-1 h-px bg-border" />
            <span className="font-mono text-meta text-tertiary">
              {group.questions.length}
            </span>
          </div>
          <div className="border-t border-border">
            {group.questions.map((question) => (
              <AccordionItem
                key={question.slug}
                question={question}
                isOpen={openSlug === question.slug}
                onToggle={() => handleToggle(question.slug)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
