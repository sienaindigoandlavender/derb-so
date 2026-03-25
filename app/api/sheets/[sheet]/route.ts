import { NextResponse } from "next/server";
import { getLegalPageContent, getNexusContentSites } from "@/lib/nexus";

export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sheet: string }> }
) {
  try {
    const { sheet } = await params;

    if (sheet === "nexus-footer") {
      const contentSites = await getNexusContentSites();
      return NextResponse.json({
        success: true,
        contentSites: contentSites.map((s) => ({
          label: s.site_label,
          url: s.site_url,
        })),
      });
    }

    if (sheet === "nexus-legal") {
      const { searchParams } = new URL(request.url);
      const page = searchParams.get("page");

      if (!page) {
        return NextResponse.json({ error: "page parameter required" }, { status: 400 });
      }

      const pageContent = await getLegalPageContent(page);

      if (pageContent.sections.length === 0) {
        return NextResponse.json({ error: "Page not found" });
      }

      return NextResponse.json(pageContent);
    }

    return NextResponse.json({ error: "Unknown sheet" }, { status: 404 });
  } catch (error: any) {
    console.error("API sheets error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
