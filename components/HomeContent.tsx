'use client';

import { useState } from 'react';
import { Question } from '@/lib/types';
import Accordion from './Accordion';
import Search from './Search';

interface HomeContentProps {
  questions: Question[];
}

export default function HomeContent({ questions }: HomeContentProps) {
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  return (
    <>
      {/* Search */}
      <Search questions={questions} onFilter={setFilteredQuestions} />

      {/* Questions */}
      <section>
        <h2 className="text-small font-medium text-muted uppercase tracking-wide mb-6">
          {filteredQuestions.length === questions.length
            ? 'Questions'
            : `${filteredQuestions.length} result${filteredQuestions.length !== 1 ? 's' : ''}`}
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
