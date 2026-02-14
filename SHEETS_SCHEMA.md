# Google Sheets Schema for Derb

This document describes how to set up Google Sheets as a lightweight CMS for Derb content.

## Sheet Structure

Create a Google Sheet with the following tabs:

### Tab 1: Questions

| Column | Type | Description |
|--------|------|-------------|
| slug | text | URL-safe identifier (e.g., `why-are-there-cockroaches`) |
| title | text | Full question title |
| subtitle | text | Optional subtitle/summary |
| lastUpdated | text | Date in YYYY-MM format |

### Tab 2: Sections

| Column | Type | Description |
|--------|------|-------------|
| questionSlug | text | Links to Questions.slug |
| order | number | Section order (1, 2, 3...) |
| heading | text | Section heading (optional for intro) |
| content | text | Section body text |

### Tab 3: Illustrations

| Column | Type | Description |
|--------|------|-------------|
| id | text | Unique illustration ID |
| questionSlug | text | Links to Questions.slug |
| caption | text | Figure caption |
| afterSection | number | Which section this appears after (0-indexed) |

## Example Data

### Questions Tab

| slug | title | subtitle | lastUpdated |
|------|-------|----------|-------------|
| why-are-there-cockroaches | Why are there cockroaches in Marrakech? | Climate, infrastructure, and the ecology of an ancient city | 2024-12 |
| why-do-bathrooms-smell | Why do bathrooms sometimes smell in old houses? | Plumbing systems, trap design, and the physics of sewer gas | 2024-12 |

### Sections Tab

| questionSlug | order | heading | content |
|--------------|-------|---------|---------|
| why-are-there-cockroaches | 1 | | Cockroaches exist in Marrakech for the same reason... |
| why-are-there-cockroaches | 2 | Climate factors | Marrakech sits at the edge of the Sahara... |
| why-are-there-cockroaches | 3 | Architectural conditions | The medina is a continuous urban mass... |

### Illustrations Tab

| id | questionSlug | caption | afterSection |
|----|--------------|---------|--------------|
| drainage-paths | why-are-there-cockroaches | Simplified diagram of interconnected drainage... | 2 |
| temperature-zones | why-are-there-cockroaches | Temperature and humidity gradients... | 1 |

## Publishing Workflow

1. **Make sheet public** (read-only) or use a service account
2. **Get Sheet ID** from the URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
3. **Set environment variable**: `GOOGLE_SHEET_ID=your-sheet-id`
4. **Rebuild site** to pull latest content

## Fetching Data

The site can fetch from Sheets at build time using the Sheets API:

```typescript
// lib/sheets.ts
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

export async function fetchQuestions() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Questions?key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  // Transform rows to Question objects
}
```

## Local Development

For local development, the site uses static JSON in `/data/questions.json`. 
To switch to Sheets:

1. Add environment variables to `.env.local`
2. Modify `lib/questions.ts` to use the Sheets fetcher
3. Run build to pull latest content

## Content Guidelines

- **Tone**: Adult, calm, factual. No humor, no defensiveness.
- **Length**: 4-6 sections per question, 100-200 words per section.
- **Headings**: Clear, descriptive. First section has no heading.
- **Updates**: Note lastUpdated when content changes significantly.
