'use client';

import { useEffect, useState } from 'react';

interface ContentSite {
  label: string;
  url: string;
}

export default function Footer() {
  const [contentSites, setContentSites] = useState<ContentSite[]>([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetch('/api/footer')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.contentSites) {
          setContentSites(data.contentSites);
        }
      })
      .catch((err) => console.error('Footer fetch error:', err));
  }, []);

  return (
    <footer className="footer-ombre">
      {/* Level 1: Methodology */}
      <div className="footer-level-1">
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 2rem' }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.55rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            opacity: 0.4,
            marginBottom: '0.75rem',
          }}>
            Methodology
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            fontWeight: 300,
            lineHeight: 1.7,
            opacity: 0.5,
            maxWidth: '40rem',
          }}>
            Derb is an independent urban reference. Content is based on direct observation,
            local residents, and research into how Morocco&apos;s cities actually work.
            Cockroaches, plumbing, heat, cats, and everything else.
          </p>
        </div>
      </div>

      {/* Level 2: Content Network (from Nexus) */}
      {contentSites.length > 0 && (
        <div className="footer-level-2">
          <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 2rem' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1.25rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              fontWeight: 300,
            }}>
              <span style={{
                fontSize: '0.55rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                opacity: 0.25,
              }}>
                Explore
              </span>
              {contentSites.map((site, idx) => (
                <a
                  key={idx}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ opacity: 0.4, transition: 'opacity 0.2s' }}
                >
                  {site.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Level 3: Navigation & Legal */}
      <div className="footer-level-3">
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 300 }}>
            <a href="/guides" style={{ opacity: 0.4, transition: 'opacity 0.2s' }}>Guides</a>
            <a href="/questions" style={{ opacity: 0.4, transition: 'opacity 0.2s' }}>All Questions</a>
            <a href="/about" style={{ opacity: 0.4, transition: 'opacity 0.2s' }}>About</a>
            <a href="/privacy" style={{ opacity: 0.4, transition: 'opacity 0.2s' }}>Privacy</a>
            <a href="/terms" style={{ opacity: 0.4, transition: 'opacity 0.2s' }}>Terms</a>
            <span style={{ opacity: 0.3 }}>
              © {currentYear} Derb. All rights reserved.
            </span>
          </div>
        </div>
      </div>

      {/* Level 4: Powered by */}
      <div className="footer-level-4">
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 2rem' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 300, opacity: 0.25 }}>
            Powered by{' '}
            <a
              href="https://slowmorocco.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ transition: 'opacity 0.2s' }}
            >
              Slow Morocco
            </a>
            {' · '}
            <a
              href="https://derb.so"
              style={{ transition: 'opacity 0.2s' }}
            >
              derb.so
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
