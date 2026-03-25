"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Question, Category, categoryLabels } from "@/lib/types";
import Accordion from "./Accordion";

interface QuestionsClientProps {
  questions: Question[];
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
    <>
      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          className="search-input"
          placeholder="Questions or keywords..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Search questions"
        />
      </div>

      {/* Active tag indicator */}
      {activeTag && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-muted uppercase tracking-wide">Filtered by</span>
          <button
            onClick={clearTag}
            className="tag opacity-100 flex items-center gap-1"
          >
            {activeTag}
            <span className="text-muted ml-1">×</span>
          </button>
        </div>
      )}

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => handleCategoryChange("")}
          className={`tag transition-opacity ${activeCategory === "" ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
        >
          All
        </button>
        {(Object.keys(categoryLabels) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`tag transition-opacity ${activeCategory === cat ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Questions */}
      <section>
        <h2 className="text-small font-medium text-muted uppercase tracking-wide mb-6">
          {filteredQuestions.length === questions.length
            ? `${questions.length} Questions`
            : `${filteredQuestions.length} result${filteredQuestions.length !== 1 ? "s" : ""}`}
        </h2>
        {filteredQuestions.length > 0 ? (
          <Accordion questions={filteredQuestions} />
        ) : (
          <p className="text-muted py-8">No questions match your search.</p>
        )}
      </section>
    </>
  );
}

export default function QuestionsClient({ questions }: QuestionsClientProps) {
  return (
    <Suspense fallback={<div className="text-muted">Loading...</div>}>
      <QuestionsInner questions={questions} />
    </Suspense>
  );
}
