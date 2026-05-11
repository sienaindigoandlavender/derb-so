"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Question, Category, categoryLabels } from "@/lib/types";
import Accordion from "./Accordion";

interface QuestionsClientProps {
  questions: Question[];
}

function tagButtonClasses(active: boolean) {
  return [
    "inline-flex items-center px-3 py-1 font-mono text-meta uppercase tracking-wide border transition-colors",
    active
      ? "border-accent text-accent"
      : "border-border text-tertiary hover:border-accent hover:text-accent",
  ].join(" ");
}

function QuestionsInner({ questions }: QuestionsClientProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = (searchParams.get("c") as Category) || "";
  const initialTag = searchParams.get("tag") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<Category | "">(initialCategory);
  const [activeTag, setActiveTag] = useState(initialTag);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  const applyFilters = useCallback(
    (query: string, category: Category | "", tag: string) => {
      let result = questions;

      if (query.trim()) {
        const lower = query.toLowerCase();
        result = result.filter((q) => {
          if (q.title.toLowerCase().includes(lower)) return true;
          if (q.shortAnswer?.toLowerCase().includes(lower)) return true;
          if (q.sections.some((s) => s.content.toLowerCase().includes(lower))) return true;
          if (q.sections.some((s) => s.heading?.toLowerCase().includes(lower))) return true;
          if (q.searchTerms?.some((t) => t.toLowerCase().includes(lower))) return true;
          if (q.tags?.some((t) => t.toLowerCase().includes(lower))) return true;
          return false;
        });
      }

      if (category) {
        result = result.filter((q) => q.category === category);
      }

      if (tag) {
        result = result.filter((q) => q.tags?.includes(tag));
      }

      setFilteredQuestions(result);
    },
    [questions]
  );

  useEffect(() => {
    applyFilters(searchQuery, activeCategory, activeTag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, activeCategory, activeTag);
  };

  const handleCategoryChange = (category: Category | "") => {
    setActiveCategory(category);
    setActiveTag("");
    applyFilters(searchQuery, category, "");
  };

  const clearTag = () => {
    setActiveTag("");
    applyFilters(searchQuery, activeCategory, "");
  };

  return (
    <div>
      {/* Search */}
      <div className="max-w-prose mb-6">
        <input
          type="text"
          placeholder="Search questions, terms, places…"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Search questions"
          className="w-full bg-transparent border-b border-border py-2 font-serif italic text-ink placeholder:text-tertiary focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Active tag */}
      {activeTag && (
        <div className="flex items-center gap-2 mb-4 font-mono text-meta uppercase tracking-wide text-tertiary">
          <span>Filtered by</span>
          <button
            type="button"
            onClick={clearTag}
            className="inline-flex items-center gap-2 border border-accent px-3 py-1 text-accent"
          >
            {activeTag}
            <span aria-hidden>×</span>
          </button>
        </div>
      )}

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          type="button"
          onClick={() => handleCategoryChange("")}
          className={tagButtonClasses(activeCategory === "")}
        >
          All
        </button>
        {(Object.keys(categoryLabels) as Category[]).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryChange(cat)}
            className={tagButtonClasses(activeCategory === cat)}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Results */}
      <section>
        <h2 className="font-mono text-meta uppercase tracking-wide text-tertiary mb-6">
          {filteredQuestions.length === questions.length
            ? `${questions.length} questions`
            : `${filteredQuestions.length} result${filteredQuestions.length !== 1 ? "s" : ""}`}
        </h2>
        {filteredQuestions.length > 0 ? (
          <Accordion questions={filteredQuestions} />
        ) : (
          <p className="text-secondary py-8">No questions match your search.</p>
        )}
      </section>
    </div>
  );
}

export default function QuestionsClient({ questions }: QuestionsClientProps) {
  return (
    <Suspense fallback={<div className="text-tertiary">Loading…</div>}>
      <QuestionsInner questions={questions} />
    </Suspense>
  );
}
