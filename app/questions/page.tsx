import { getQuestions } from "@/lib/questions";
import QuestionsClient from "@/components/QuestionsClient";

export const metadata = {
  title: "Questions",
  description:
    "Browse questions about Morocco: buildings, daily life, getting around, and cultural observations explained.",
};

export default function QuestionsPage() {
  const questions = getQuestions();

  return (
    <div>
      {/* Dark header */}
      <div className="questions-index-header">
        <div className="questions-index-header-inner">
          <h1 className="questions-index-title">Questions</h1>
          <p className="questions-index-subtitle">
            Observations about Morocco that deserve explanation.
          </p>
        </div>
      </div>

      {/* White content */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '2.5rem 2rem' }}>
        <QuestionsClient questions={questions} />
      </div>
    </div>
  );
}
