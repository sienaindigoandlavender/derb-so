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

  // Close dropdown on outside click + load Google Translate
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("click", handleClick);

    // Inject Google Translate script
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
      {/* Level 1: Methodology */}
      <div className="bg-[#1C1917] text-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-xs tracking-wide text-[#A8A29E] max-w-xl leading-relaxed">
            <span className="text-[#78716C] text-[10px] tracking-[0.2em] uppercase block mb-3">Methodology</span>
            Derb is an independent urban reference. Content is based on direct observation, local residents, and research into how Morocco&apos;s cities actually work. Cockroaches, plumbing, heat, cats, and everything else.
          </p>
        </div>
      </div>

      {/* Level 2: Navigation + Content Network */}
      <div className="bg-[#292524] text-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
            {/* Site Nav */}
            <div className="flex flex-wrap gap-6 text-xs">
              <Link href="/guides" className="text-[#A8A29E] hover:text-[#FAF9F6] transition-colors">Guides</Link>
              <Link href="/questions" className="text-[#A8A29E] hover:text-[#FAF9F6] transition-colors">All Questions</Link>
              <Link href="/about" className="text-[#A8A29E] hover:text-[#FAF9F6] transition-colors">About</Link>
            </div>
          </div>

          {/* Content Network */}
          {contentSites.length > 0 && (
            <div className="mt-6 pt-6 border-t border-[#FAF9F6]/10">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#FAF9F6]/20">
                  Explore
                </span>
                {contentSites.map((site, idx) => (
                  <a
                    key={idx}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-wide text-[#78716C] hover:text-[#A8A29E] transition-colors"
                  >
                    {site.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Level 3: Legal + Language */}
      <div className="bg-[#1C1917] text-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 text-xs">
              <Link href="/privacy" className="text-[#78716C] hover:text-[#A8A29E] transition-colors">Privacy</Link>
              <Link href="/terms" className="text-[#78716C] hover:text-[#A8A29E] transition-colors">Terms</Link>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-4 text-xs">
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 text-[#78716C] hover:text-[#A8A29E] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>{currentLang}</span>
                  <IconChevronDown size={10} />
                </button>
                {langOpen && (
                  <div className="absolute bottom-full mb-2 right-0 bg-[#292524] border border-[#FAF9F6]/10 py-1 min-w-[120px] shadow-lg">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => translateTo(l.code, l.label)}
                        className={`block w-full text-left px-3 py-1.5 transition-colors ${
                          currentLang === l.label ? "text-[#FAF9F6]/90" : "text-[#78716C] hover:text-[#FAF9F6]/90"
                        }`}
                      >
                        <span className="inline-block w-6">{l.label}</span>
                        <span className="text-[#78716C]/60 ml-1">{l.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Hidden Google Translate container */}
              <div id="google-translate-hidden" className="hidden" />
            </div>
          </div>
        </div>
      </div>

      {/* Level 4: Copyright */}
      <div className="bg-[#0e0e0e] text-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <p className="text-[#78716C] text-xs">
              © {new Date().getFullYear()} Derb. All rights reserved.
            </p>
            <p className="text-[#78716C]/60 text-xs">
              Powered by{" "}
              <a href="https://slowmorocco.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A8A29E] transition-colors">Slow Morocco</a>
              {" · "}
              <a href="https://derb.so" className="hover:text-[#A8A29E] transition-colors">derb.so</a>
            </p>
          </div>
        </div>
      </div>

      {/* Hide Google Translate bar and artifacts */}
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
