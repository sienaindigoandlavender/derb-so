"use client";

import Link from "next/link";
import { useState } from "react";
import { Category, Question } from "@/lib/types";

interface CategoryGroup {
  id: Category;
  label: string;
  questions: Question[];
}

interface HomeCategoriesProps {
  groups: CategoryGroup[];
  defaultOpen?: boolean;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 text-tertiary transition-transform duration-300 ${
        open ? "rotate-180" : ""
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
  );
}

export default function HomeCategories({
  groups,
  defaultOpen = false,
}: HomeCategoriesProps) {
  const [openSet, setOpenSet] = useState<Set<string>>(
    () => new Set(defaultOpen ? groups.map((g) => g.id) : [])
  );

  const toggle = (id: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {groups.map((cat) => {
        const isOpen = openSet.has(cat.id);
        const panelId = `home-cat-${cat.id}`;
        return (
          <div key={cat.id}>
            <button
              type="button"
              onClick={() => toggle(cat.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-baseline gap-4 py-2 text-left group"
            >
              <span className="font-mono text-meta uppercase tracking-wide text-accent group-hover:opacity-70 transition-opacity">
                {cat.label}
              </span>
              <span className="flex-1 h-px bg-border" />
              <span className="font-mono text-meta text-tertiary">
                {cat.questions.length}
              </span>
              <ChevronIcon open={isOpen} />
            </button>

            <div
              id={panelId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
              aria-hidden={!isOpen}
            >
              <div className="overflow-hidden">
                <div className="pt-2 pb-1 flex items-center justify-end">
                  <Link
                    href={`/category/${cat.id}`}
                    className="font-mono text-meta uppercase tracking-wide text-tertiary hover:text-accent transition-colors"
                  >
                    View category →
                  </Link>
                </div>
                <ol className="border-t border-border">
                  {cat.questions.map((q, i) => (
                    <li key={q.slug} className="border-b border-border">
                      <Link
                        href={`/questions/${q.slug}`}
                        className="flex items-baseline gap-4 py-4 group"
                      >
                        <span className="font-mono text-meta text-tertiary w-8 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block font-serif text-lg text-ink group-hover:text-accent transition-colors">
                            {q.title}
                          </span>
                          {q.shortAnswer ? (
                            <span className="block text-sm text-secondary mt-1">
                              {q.shortAnswer}
                            </span>
                          ) : null}
                        </span>
                        <span className="font-mono text-meta text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
