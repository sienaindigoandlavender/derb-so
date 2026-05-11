"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/questions${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`
    );
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search questions, terms, places…"
        aria-label="Search questions"
        className="w-full bg-transparent border-b border-border py-2 pr-8 font-serif italic text-ink placeholder:text-tertiary focus:outline-none focus:border-accent transition-colors"
      />
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute right-0 top-1/2 -translate-y-1/2 text-tertiary pointer-events-none"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </form>
  );
}
