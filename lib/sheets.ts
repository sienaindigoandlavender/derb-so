/**
 * Google Sheets Integration (Optional)
 * 
 * To use Sheets as a CMS:
 * 1. Create a sheet following SHEETS_SCHEMA.md
 * 2. Make sheet public or use service account
 * 3. Set GOOGLE_SHEET_ID and GOOGLE_SHEETS_API_KEY in .env.local
 * 4. Replace the import in lib/questions.ts
 */

import { Question, Section, Illustration, Category } from "./types";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

interface SheetRow {
  [key: string]: string;
}

async function fetchSheet(tabName: string): Promise<SheetRow[]> {
  if (!SHEET_ID || !API_KEY) {
    throw new Error("Google Sheets credentials not configured");
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${tabName}?key=${API_KEY}`;
  const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
  
  if (!res.ok) {
    throw new Error(`Failed to fetch sheet: ${res.statusText}`);
  }

  const data = await res.json();
  const rows = data.values as string[][];
  
  if (!rows || rows.length < 2) {
    return [];
  }

  const headers = rows[0];
  return rows.slice(1).map((row) => {
    const obj: SheetRow = {};
    headers.forEach((header, i) => {
      obj[header] = row[i] || "";
    });
    return obj;
  });
}

export async function fetchQuestionsFromSheets(): Promise<Question[]> {
  const [questionsRows, sectionsRows, illustrationsRows] = await Promise.all([
    fetchSheet("Questions"),
    fetchSheet("Sections"),
    fetchSheet("Illustrations"),
  ]);

  return questionsRows.map((q) => {
    const sections: Section[] = sectionsRows
      .filter((s) => s.questionSlug === q.slug)
      .sort((a, b) => parseInt(a.order) - parseInt(b.order))
      .map((s) => ({
        heading: s.heading || undefined,
        content: s.content,
      }));

    const illustrations: Illustration[] = illustrationsRows
      .filter((i) => i.questionSlug === q.slug)
      .map((i) => ({
        id: i.id,
        caption: i.caption,
        afterSection: parseInt(i.afterSection),
      }));

    return {
      slug: q.slug,
      title: q.title,
      category: (q.category || 'the-medina') as Category,
      subtitle: q.subtitle || undefined,
      sections,
      illustrations,
      lastUpdated: q.lastUpdated,
    };
  });
}
