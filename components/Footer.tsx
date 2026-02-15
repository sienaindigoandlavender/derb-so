"use client";

import Link from "next/link";
import { useCurrency, Currency } from "./CurrencyContext";
import { useState, useRef, useEffect } from "react";
import { IconInstagram, IconChevronDown } from "@/components/icons";

const PinterestIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v8M9 17c1-2 1.5-4 2-6M15 17c-1-2-1.5-4-2-6" />
  </svg>
);

const TumblrIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 4h6v4h4v4h-4v4c0 1 1 2 2 2h2v4h-4c-3 0-6-2-6-6v-4H6V8h3V4z" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const FALLBACK_LANGUAGES = [
  { code: "EN", label: "English", native: "English", rtl: false },
  { code: "FR", label: "French", native: "Français", rtl: false },
  { code: "ES", label: "Spanish", native: "Español", rtl: false },
  { code: "DE", label: "German", native: "Deutsch", rtl: false },
];

const FALLBACK_CURRENCIES = [
  { code: "EUR", symbol: "€", label: "€ (EUR)" },
  { code: "USD", symbol: "$", label: "$ (USD)" },
  { code: "GBP", symbol: "£", label: "£ (GBP)" },
  { code: "MAD", symbol: "DH", label: "DH (MAD)" },
];

interface NexusLanguage {
  code: string;
  label: string;
  native: string;
  rtl: boolean;
}

interface NexusCurrency {
  code: string;
  symbol: string;
  label: string;
}

export default function Footer() {
  const { currency, setCurrency } = useCurrency();
  const [language, setLanguage] = useState("EN");
  const [langOpen, setLangOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const currRef = useRef<HTMLDivElement>(null);

  const [languages, setLanguages] = useState<NexusLanguage[]>(FALLBACK_LANGUAGES);
  const [currencies, setCurrencies] = useState<NexusCurrency[]>(FALLBACK_CURRENCIES);
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
      if (currRef.current && !currRef.current.contains(e.target as Node)) {
        setCurrOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const currentLang = languages.find(l => l.code === language) || languages[0];
  const currentCurr = currencies.find(c => c.code === currency) || currencies[0];

  return (
    <footer>
      {/* Level 1: Brand Content */}
      <div className="bg-[#e8e0d4] text-[#2a2520]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo & Tagline */}
            <div>
              <div className="flex flex-col items-start leading-tight mb-4">
                <span className="text-sm tracking-[0.3em] font-light">RIAD</span>
                <span className="text-sm tracking-[0.3em] font-light">DI SIENA</span>
              </div>
              <p className="text-[#2a2520]/75 text-sm leading-relaxed max-w-xs mb-6">
                Old walls, steady and sure. A place that keeps you safe from the city&apos;s rush.
              </p>
              <div className="flex gap-4">
                <span className="text-[#2a2520]/50">
                  <IconInstagram size={18} />
                </span>
                <span className="text-[#2a2520]/50">
                  <PinterestIcon />
                </span>
                <span className="text-[#2a2520]/50">
                  <TumblrIcon />
                </span>
              </div>
            </div>

            {/* Stay */}
            <div>
              <span className="text-xs tracking-widest mb-6 block">STAY</span>
              <ul className="space-y-2">
                <li><Link href="/the-riad" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">The House</Link></li>
                <li><Link href="/rooms" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">Rooms</Link></li>
                <li><Link href="/amenities" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">Amenities</Link></li>
                <li><Link href="/philosophy" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">Philosophy</Link></li>
                <li><Link href="/faq" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Experience */}
            <div>
              <span className="text-xs tracking-widest mb-6 block">EXPERIENCE</span>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.slowmorocco.com/places" target="_blank" rel="noopener noreferrer" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">
                    Places
                  </a>
                </li>
                <li>
                  <a href="https://www.slowmorocco.com/stories" target="_blank" rel="noopener noreferrer" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">
                    Stories
                  </a>
                </li>
                <li>
                  <a href="https://www.slowmorocco.com/day-trips" target="_blank" rel="noopener noreferrer" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">
                    Day Trips
                  </a>
                </li>
                <li>
                  <a href="https://www.slowmorocco.com/glossary" target="_blank" rel="noopener noreferrer" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">
                    Moroccan Glossary
                  </a>
                </li>
                <li>
                  <a href="https://derb.so" target="_blank" rel="noopener noreferrer" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">
                    Derb — City Guide
                  </a>
                </li>
              </ul>
            </div>

            {/* Beyond the Walls */}
            <div>
              <Link href="/beyond-the-walls" className="text-xs tracking-widest mb-6 block hover:text-[#2a2520]/70 transition-colors">
                BEYOND THE WALLS
              </Link>
              <ul className="space-y-2">
                <li><Link href="/the-douaria" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">The Douaria</Link></li>
                <li><Link href="/the-kasbah" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">The Kasbah</Link></li>
                <li><Link href="/the-desert-camp" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">The Desert Camp</Link></li>
                <li><Link href="/the-farm" className="text-[#2a2520]/75 text-sm hover:text-[#2a2520] transition-colors">The Farm</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Content Network (from Nexus Supabase) */}
      {contentSites.length > 0 && (
        <div className="bg-[#ddd5c8]">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#2a2520]/40">
                Explore
              </span>
              {contentSites.map((site, idx) => (
                <a
                  key={idx}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-wide text-[#2a2520]/75 hover:text-[#2a2520]  transition-colors"
                >
                  {site.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Level 3: Legal + Language/Currency */}
      <div className="bg-[#d2c9bb]">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 text-xs">
              <Link href="/privacy" className="text-[#2a2520]/75 hover:text-[#2a2520]  transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-[#2a2520]/75 hover:text-[#2a2520]  transition-colors">Terms of Service</Link>
              <Link href="/disclaimer" className="text-[#2a2520]/75 hover:text-[#2a2520]  transition-colors">Before You Book</Link>
              <Link href="/booking-conditions" className="text-[#2a2520]/75 hover:text-[#2a2520]  transition-colors">Booking Conditions</Link>
              <Link href="/house-rules" className="text-[#2a2520]/75 hover:text-[#2a2520]  transition-colors">House Rules</Link>
            </div>

            {/* Language & Currency */}
            <div className="flex items-center gap-4 text-xs">
              {/* Language Dropdown */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => { setLangOpen(!langOpen); setCurrOpen(false); }}
                  className="flex items-center gap-1 text-[#2a2520]/75 hover:text-[#2a2520]  transition-colors"
                >
                  <GlobeIcon />
                  <span>{currentLang.code}</span>
                  <IconChevronDown size={10} />
                </button>
                {langOpen && (
                  <div className="absolute bottom-full mb-2 right-0 bg-[#e8e0d4] border border-[#2a2520]/10 py-1 min-w-[100px] shadow-sm">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                        className={`block w-full text-left px-3 py-1.5 transition-colors ${
                          language === l.code ? "text-[#2a2520]/90" : "text-[#2a2520]/75 hover:text-[#2a2520] "
                        }`}
                      >
                        {l.code}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Currency Dropdown */}
              <div ref={currRef} className="relative">
                <button
                  onClick={() => { setCurrOpen(!currOpen); setLangOpen(false); }}
                  className="flex items-center gap-1 text-[#2a2520]/75 hover:text-[#2a2520]  transition-colors"
                >
                  <span>{currentCurr.symbol} {currentCurr.code}</span>
                  <IconChevronDown size={10} />
                </button>
                {currOpen && (
                  <div className="absolute bottom-full mb-2 right-0 bg-[#e8e0d4] border border-[#2a2520]/10 py-1 min-w-[80px] shadow-sm">
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => { setCurrency(c.code as Currency); setCurrOpen(false); }}
                        className={`block w-full text-left px-3 py-1.5 transition-colors ${
                          currency === c.code ? "text-[#2a2520]/90" : "text-[#2a2520]/75 hover:text-[#2a2520] "
                        }`}
                      >
                        {c.symbol} {c.code}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level 4: Copyright */}
      <div className="bg-[#c8bfb0]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-[#2a2520]/70 text-xs">
              © {new Date().getFullYear()} Riad di Siena. All rights reserved.
            </p>
            {/* Hidden directions links */}
            <div className="flex items-center gap-2 mr-20">
              <Link href="/directions" className="w-2.5 h-2.5 rounded-full bg-[#2a2520]/20 hover:bg-[#2a2520]/40 transition-colors" aria-label="Directions to No. 37" />
              <Link href="/directions?building=annex" className="w-2.5 h-2.5 rounded-full bg-[#2a2520]/20 hover:bg-[#2a2520]/40 transition-colors" aria-label="Directions to No. 35" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
