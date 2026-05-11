import Link from "next/link";
import { getQuestions } from "@/lib/questions";
import QuestionsClient from "@/components/QuestionsClient";

export const metadata = {
  title: "Questions",
  description:
    "Browse questions about Morocco: buildings, daily life, getting around, and cultural observations explained.",
  alternates: { canonical: "https://derb.so/questions" },
};

export default function QuestionsPage() {
  const questions = getQuestions();

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <nav
        className="font-mono text-meta uppercase tracking-wide text-tertiary mb-8 flex items-center gap-2"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-accent transition-colors">Derb</Link>
        <span aria-hidden>/</span>
        <span>Questions</span>
      </nav>

      <header className="max-w-prose mb-12">
        <h1 className="font-serif text-5xl leading-tight text-ink mb-4">
          Questions
        </h1>
        <p className="text-lg text-secondary">
          Observations about Morocco that deserve explanation. Search, filter,
          or browse {questions.length} questions across {7} categories.
        </p>
      </header>

      <QuestionsClient questions={questions} />
    </div>
  );
}
