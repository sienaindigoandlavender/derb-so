import { getQuestions } from "@/lib/questions";

const siteUrl = "https://derb.so";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const questions = getQuestions();

  // Sort by lastUpdated descending
  const sorted = [...questions].sort(
    (a, b) =>
      new Date(b.lastUpdated ).getTime() -
      new Date(a.lastUpdated ).getTime()
  );

  const items = sorted
    .map((q) => {
      const description =
        q.shortAnswer || q.sections[0]?.content.slice(0, 300) || "";
      const pubDate = new Date(q.lastUpdated ).toUTCString();

      return `    <item>
      <title>${escapeXml(q.title)}</title>
      <link>${siteUrl}/questions/${q.slug}</link>
      <guid isPermaLink="true">${siteUrl}/questions/${q.slug}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(q.category)}</category>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Derb — Urban Reference for Morocco</title>
    <link>${siteUrl}</link>
    <description>Everyday realities of Morocco's cities explained: infrastructure, climate, architecture, culture, and navigation.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>hello@slowmorocco.com (Slow Morocco)</managingEditor>
    <webMaster>hello@slowmorocco.com (Slow Morocco)</webMaster>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
