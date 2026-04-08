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
    <section className="darija-section">
      <div className="darija-section-inner">
        <div className="darija-header">
          <span className="darija-label">Words You&rsquo;ll Hear</span>
          <span className="home-category-rule" />
        </div>
        <p className="darija-intro">
          Darija — Moroccan Arabic — is the language of the street, the souk, and the riad.
          These are the words you&rsquo;ll encounter walking through any Moroccan city.
        </p>

        <div className="darija-grid">
          {words.map((w) => (
            <div key={w.darija} className="darija-card">
              <div className="darija-card-top">
                <span className="darija-word">{w.darija}</span>
                <span className="darija-arabic">{w.arabic}</span>
              </div>
              <span className="darija-pron">{w.pronunciation}</span>
              <span className="darija-english">{w.english}</span>
              {w.note && <p className="darija-note">{w.note}</p>}
            </div>
          ))}
        </div>

        <div className="darija-cta">
          <p>
            Explore 10,000+ words and 1,500+ phrases at{" "}
            <a href="https://darija.io" target="_blank" rel="noopener noreferrer">
              darija.io
            </a>{" "}
            — the Darija dictionary.
          </p>
        </div>
      </div>
    </section>
  );
}
