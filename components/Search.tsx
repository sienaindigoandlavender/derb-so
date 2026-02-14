'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/lib/types';

interface SearchProps {
  questions: Question[];
  onFilter: (filtered: Question[]) => void;
  initialQuery?: string;
}

export default function Search({ questions, onFilter, initialQuery = '' }: SearchProps) {
  const [query, setQuery] = useState(initialQuery);

  const performSearch = (value: string) => {
    if (!value.trim()) {
      onFilter(questions);
      return;
    }

    const lower = value.toLowerCase();
    const filtered = questions.filter((q) => {
      // Search in title
      if (q.title.toLowerCase().includes(lower)) return true;
      // Search in short answer
      if (q.shortAnswer?.toLowerCase().includes(lower)) return true;
      // Search in subtitle
      if (q.subtitle?.toLowerCase().includes(lower)) return true;
      // Search in section content
      if (q.sections.some((s) => s.content.toLowerCase().includes(lower))) return true;
      // Search in section headings
      if (q.sections.some((s) => s.heading?.toLowerCase().includes(lower))) return true;
      // Search in search terms
      if (q.searchTerms?.some((t) => t.toLowerCase().includes(lower))) return true;
      return false;
    });

    onFilter(filtered);
  };

  // Apply initial query on mount
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    performSearch(value);
  };

  return (
    <div className="mb-8">
      <input
        type="text"
        className="search-input"
        placeholder="Questions or keywords..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        aria-label="Search questions"
      />
    </div>
  );
}
