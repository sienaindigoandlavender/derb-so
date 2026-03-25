import { NextRequest, NextResponse } from "next/server";
import { getQuestions } from "@/lib/questions";
import { getGuides } from "@/lib/guides";
import { categoryLabels, Category } from "@/lib/types";

const BASE_URL = "https://derb.so";
const GOOGLE_INDEXING_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!clientEmail || !privateKey) throw new Error("Missing credentials");

  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = { iss: clientEmail, scope: "https://www.googleapis.com/auth/indexing", aud: GOOGLE_TOKEN_ENDPOINT, iat: now, exp: now + 3600 };
  const encode = (obj: object) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const unsignedToken = `${encode(header)}.${encode(payload)}`;
  const crypto = await import("crypto");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(unsignedToken);
  const signature = sign.sign(privateKey, "base64url");

  const tokenRes = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsignedToken}.${signature}` }),
  });
  if (!tokenRes.ok) throw new Error(`Token failed: ${await tokenRes.text()}`);
  return (await tokenRes.json()).access_token;
}

async function submitUrl(accessToken: string, url: string) {
  try {
    const res = await fetch(GOOGLE_INDEXING_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ url, type: "URL_UPDATED" }),
    });
    if (res.ok) return { url, success: true, status: res.status };
    return { url, success: false, status: res.status, error: await res.text() };
  } catch (e) {
    return { url, success: false, error: e instanceof Error ? e.message : "Unknown" };
  }
}

export async function GET() {
  const questions = getQuestions();
  const guides = getGuides();
  const categories = Object.keys(categoryLabels) as Category[];

  const staticUrls = [BASE_URL, `${BASE_URL}/questions`, `${BASE_URL}/guides`, `${BASE_URL}/about`];
  const guideUrls = guides.map(g => `${BASE_URL}/guides/${g.slug}`);
  const categoryUrls = categories.map(c => `${BASE_URL}/category/${c}`);
  const questionUrls = questions.map(q => `${BASE_URL}/questions/${q.slug}`);

  return NextResponse.json({
    status: "ready",
    counts: { static: staticUrls.length, guides: guideUrls.length, categories: categoryUrls.length, questions: questionUrls.length, total: staticUrls.length + guideUrls.length + categoryUrls.length + questionUrls.length },
  });
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.GOOGLE_INDEX_SECRET;
  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = parseInt(new URL(request.url).searchParams.get("limit") || "200", 10);

  const questions = getQuestions();
  const guides = getGuides();
  const categories = Object.keys(categoryLabels) as Category[];

  const allUrls = [
    BASE_URL, `${BASE_URL}/questions`, `${BASE_URL}/guides`, `${BASE_URL}/about`,
    ...guides.map(g => `${BASE_URL}/guides/${g.slug}`),
    ...categories.map(c => `${BASE_URL}/category/${c}`),
    ...questions.map(q => `${BASE_URL}/questions/${q.slug}`),
  ];

  const cappedUrls = allUrls.slice(0, Math.min(limit, 200));
  let accessToken: string;
  try { accessToken = await getAccessToken(); } catch (e) {
    return NextResponse.json({ error: "Auth failed", detail: String(e) }, { status: 500 });
  }

  let successCount = 0, failCount = 0, quotaExceeded = false;
  const results: Awaited<ReturnType<typeof submitUrl>>[] = [];

  for (const url of cappedUrls) {
    if (quotaExceeded) break;
    const result = await submitUrl(accessToken, url);
    results.push(result);
    if (result.success) successCount++; else { failCount++; if (result.status === 429) quotaExceeded = true; }
    await new Promise(r => setTimeout(r, 50));
  }

  return NextResponse.json({ success: !quotaExceeded, submitted: successCount, failed: failCount, quotaExceeded, totalAvailable: allUrls.length, capped: cappedUrls.length, remaining: allUrls.length - cappedUrls.length });
}
