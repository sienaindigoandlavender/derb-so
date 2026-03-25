'use client';

import { useState } from 'react';
import { Question, Category, categoryLabels } from '@/lib/types';
import { Illustration } from './Illustration';

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
    <div className="accordion-item">
      <button
        onClick={onToggle}
        className="accordion-trigger"
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{question.title}</span>
        <span className="accordion-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        className={`accordion-content ${isOpen ? 'accordion-content-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="accordion-body">
          {question.shortAnswer && (
            <p className="accordion-short-answer">{renderInlineLinks(question.shortAnswer)}</p>
          )}

          {question.subtitle && !question.shortAnswer && (
            <p className="accordion-subtitle">{renderInlineLinks(question.subtitle)}</p>
          )}

          <div className="prose">
            {question.sections.map((section, index) => (
              <div key={index}>
                <div className="mb-6">
                  {section.heading && <h3>{section.heading}</h3>}
                  <p>{renderInlineLinks(section.content)}</p>
                </div>

                {/* Illustrations after this section */}
                {question.illustrations
                  .filter((ill) => ill.afterSection === index)
                  .map((ill) => (
                    <Illustration key={ill.id} id={ill.id} caption={ill.caption} />
                  ))}
              </div>
            ))}
          </div>

          {/* Sources */}
          {question.sources && question.sources.length > 0 && (
            <div className="accordion-sources">
              <span className="accordion-sources-label">Sources:</span>
              {question.sources.map((source, idx) => (
                <span key={idx}>
                  {source.url ? (
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.text}
                    </a>
                  ) : (
                    source.text
                  )}
                  {idx < question.sources!.length - 1 && ' · '}
                </span>
              ))}
            </div>
          )}

          <div className="accordion-footer">
            <span className="accordion-meta">
              Last updated: {question.lastUpdated}
            </span>
            <a
              href={`/questions/${question.slug}`}
              className="accordion-page-link"
            >
              Read full answer →
            </a>
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

  // Group questions by category
  const categories = Object.keys(categoryLabels) as Category[];
  const questionsByCategory = categories
    .map((category) => ({
      category,
      label: categoryLabels[category],
      questions: questions.filter((q) => q.category === category),
    }))
    .filter((group) => group.questions.length > 0);

  return (
    <div className="accordion-groups">
      {questionsByCategory.map((group) => (
        <div key={group.category} className="accordion-group">
          <h3 className="accordion-group-title">{group.label}</h3>
          <div className="accordion">
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
