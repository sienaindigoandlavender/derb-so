# Derb

An urban reference explaining the everyday realities of Marrakech.

**Website:** [derb.so](https://derb.so)

## About

Derb explains questions visitors are often ashamed to ask:

- Why are there cockroaches in Marrakech?
- Why do bathrooms sometimes smell in old houses?
- Why are there so many cats?
- Why is noise unpredictable?

This is not a travel guide. There are no recommendations, no hidden gems, no hospitality language. Derb explains infrastructure, ecology, and history in plain terms.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Content:** JSON (with optional Google Sheets CMS)
- **Hosting:** Vercel (static export)
- **Illustrations:** Inline SVGs

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

## Content Management

### Option 1: Edit JSON directly

Edit `data/questions.json` to add or modify content. Each question has:

```json
{
  "slug": "url-safe-identifier",
  "title": "Full question title?",
  "subtitle": "Optional subtitle",
  "sections": [
    { "content": "Introduction paragraph..." },
    { "heading": "Section Title", "content": "Section content..." }
  ],
  "illustrations": [
    { "id": "illustration-id", "caption": "Caption text", "afterSection": 1 }
  ],
  "lastUpdated": "2024-12"
}
```

### Option 2: Google Sheets CMS

See `SHEETS_SCHEMA.md` for setup instructions. Configure environment variables:

```env
GOOGLE_SHEET_ID=your-sheet-id
GOOGLE_SHEETS_API_KEY=your-api-key
```

## Adding Illustrations

Illustrations are defined as inline SVGs in `components/Illustration.tsx`. 

Design guidelines:
- Simple, diagrammatic style
- Neutral colors (use `currentColor`)
- No decorative elements
- Explain systems, not scenes
- 400x200 typical viewBox

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy (auto-detected as Next.js)

The site uses static export by default (`output: 'export'` in next.config.mjs).

### Manual Deployment

```bash
npm run build
# Output in /out directory - deploy to any static host
```

## Project Structure

```
derb/
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx             # Home page
│   ├── globals.css          # Design system
│   └── questions/
│       └── [slug]/page.tsx  # Question pages
├── components/
│   └── Illustration.tsx     # SVG illustrations
├── lib/
│   ├── questions.ts         # Content loader
│   ├── sheets.ts            # Google Sheets integration
│   └── types.ts             # TypeScript types
├── data/
│   └── questions.json       # Content data
└── public/
    └── illustrations/       # External assets (if needed)
```

## Content Guidelines

**Tone:**
- Adult, calm, factual
- Non-humorous, non-defensive, non-romanticized
- No tourism language, no "hidden gems"
- Explain systems, not experiences

**Structure:**
- 4-6 sections per question
- 100-200 words per section
- First section: no heading (introduction)
- Subsequent sections: clear descriptive headings

**Illustrations:**
- 1-3 per question
- Diagrammatic, instructional
- Placed after relevant sections

## Attribution

Produced by the team behind [Riad di Siena](https://riaddelasiena.com) / [Slow Morocco](https://slowmorocco.com)

---

*Derb is an independent urban reference. It is not a travel guide, hospitality site, or marketing material.*
