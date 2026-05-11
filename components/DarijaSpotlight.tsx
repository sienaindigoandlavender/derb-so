import darijaWords from "@/data/darija-words.json";

interface DarijaWord {
  darija: string;
  arabic: string;
  english: string;
  pronunciation: string;
  note: string;
}

export default function DarijaSpotlight() {
  const words = darijaWords as DarijaWord[];

  return (
    <section className="mb-20">
      <div className="flex items-baseline gap-4 mb-4">
        <h2 className="font-mono text-meta uppercase tracking-wide text-accent">
          Words you&rsquo;ll hear
        </h2>
        <span className="flex-1 h-px bg-border" />
      </div>
      <p className="text-secondary max-w-prose mb-8">
        Darija — Moroccan Arabic — is the language of the street, the souk, and
        the riad. These are the words you&rsquo;ll encounter walking through any
        Moroccan city.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-border">
        {words.map((w) => (
          <div
            key={w.darija}
            className="border-b border-border sm:[&:not(:nth-child(2n))]:border-r lg:[&:not(:nth-child(2n))]:border-r-0 lg:[&:not(:nth-child(3n))]:border-r border-border p-4"
          >
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-serif text-xl text-ink">{w.darija}</span>
              <span className="text-tertiary" dir="rtl">{w.arabic}</span>
            </div>
            <p className="font-mono text-meta uppercase tracking-wide text-accent mb-1">
              {w.pronunciation}
            </p>
            <p className="text-ink">{w.english}</p>
            {w.note ? (
              <p className="text-sm text-secondary mt-2">{w.note}</p>
            ) : null}
          </div>
        ))}
      </div>

      <p className="text-secondary mt-6">
        Explore 10,000+ words and 1,500+ phrases at{" "}
        <a
          href="https://darija.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink border-b border-accent hover:text-accent transition-colors"
        >
          darija.io
        </a>{" "}
        — the Darija dictionary.
      </p>
    </section>
  );
}
