"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
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

      {/* Level 2: Legal */}
      <div className="bg-[#161616]">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <Link href="/privacy" className="text-white/85 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/85 hover:text-white transition-colors">Terms</Link>
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
    </footer>
  );
}
