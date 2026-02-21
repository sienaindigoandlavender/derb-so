"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { IconChevronDown } from "@/components/icons";

const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "it", label: "IT", name: "Italiano" },
  { code: "pt", label: "PT", name: "Português" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "ar", label: "AR", name: "العربية" },
  { code: "zh", label: "ZH", name: "中文" },
  { code: "ja", label: "JA", name: "日本語" },
];

export default function Footer() {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const langRef = useRef<HTMLDivElement>(null);
  const [contentSites, setContentSites] = useState<{ label: string; url: string }[]>([]);

  useEffect(() => {
    fetch("/api/footer")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.contentSites) {
          setContentSites(data.contentSites);
        }
      })
      .catch((err) => console.error("Failed to fetch content sites:", err));
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("click", handleClick);

    if (!document.getElementById("google-translate-script")) {
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google-translate-hidden"
        );
      };
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => document.removeEventListener("click", handleClick);
  }, []);

  const translateTo = (langCode: string, label: string) => {
    setCurrentLang(label);
    setLangOpen(false);

    if (langCode === "en") {
      const frame = document.querySelector(".goog-te-banner-frame") as HTMLIFrameElement;
      if (frame) {
        const closeBtn = frame.contentDocument?.querySelector(".goog-close-link") as HTMLElement;
        closeBtn?.click();
      }
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
      window.location.reload();
      return;
    }

    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${window.location.hostname}`;

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  return (
    <footer>
      {/* Level 1: Navigation + Methodology + Content Network */}
      <div className="bg-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center gap-6 text-xs mb-4">
            <Link href="/guides" className="text-white/90 hover:text-white transition-colors uppercase tracking-[0.1em]">Guides</Link>
            <Link href="/questions" className="text-white/90 hover:text-white transition-colors uppercase tracking-[0.1em]">All Questions</Link>
            <Link href="/about" className="text-white/90 hover:text-white transition-colors uppercase tracking-[0.1em]">About</Link>
          </div>

          <p className="text-xs text-white/70 max-w-xl leading-relaxed mb-4">
            <span className="text-white/80 text-[10px] tracking-[0.2em] uppercase block mb-2">Methodology</span>
            Derb is an independent urban reference. Content is based on direct observation, local residents, and research into how Morocco&apos;s cities actually work. Cockroaches, plumbing, heat, cats, and everything else.
          </p>

          {contentSites.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="text-[9px] tracking-[0.2em] uppercase text-white/70">Explore</span>
                {contentSites.map((site, idx) => (
                  <a
                    key={idx}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-white/85 hover:text-white transition-colors"
                  >
                    {site.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Level 2: Legal + Language */}
      <div className="bg-[#161616]">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex flex-wrap items-center gap-6 text-xs">
              <Link href="/privacy" className="text-white/85 hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="text-white/85 hover:text-white transition-colors">Terms</Link>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 text-white/85 hover:text-white transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>{currentLang}</span>
                  <IconChevronDown size={10} />
                </button>
                {langOpen && (
                  <div className="absolute bottom-full mb-2 right-0 bg-[#292524] border border-white/10 py-1 min-w-[120px] shadow-lg">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => translateTo(l.code, l.label)}
                        className={`block w-full text-left px-3 py-1.5 transition-colors ${
                          currentLang === l.label ? "text-white/90" : "text-white/70 hover:text-white/90"
                        }`}
                      >
                        <span className="inline-block w-6">{l.label}</span>
                        <span className="text-white/50 ml-1">{l.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div id="google-translate-hidden" className="hidden" />
            </div>
          </div>
        </div>
      </div>

      {/* Level 3: Powered by */}
      <div className="bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <p className="text-[9px] tracking-[0.15em] uppercase text-white/70 text-center">
            A <a href="https://www.slowmorocco.com" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors">Slow Morocco</a> project / Powered by <a href="https://www.dancingwiththelions.com" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors">Dancing with Lions</a>
          </p>
        </div>
      </div>

      <style jsx global>{`
        .goog-te-banner-frame,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        .goog-tooltip,
        .goog-tooltip:hover,
        .goog-text-highlight,
        #google-translate-hidden,
        .skiptranslate {
          display: none !important;
        }
        body { top: 0 !important; }
      `}</style>
    </footer>
  );
}
