import { NextResponse } from "next/server";
import { getNexusContentSites } from "@/lib/nexus";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const contentSites = await getNexusContentSites();

    return NextResponse.json({
      success: true,
      contentSites: contentSites.map((s) => ({
        label: s.site_label,
        url: s.site_url,
      })),
    });
  } catch (error) {
    console.error("Footer API error:", error);
    return NextResponse.json({ success: true, contentSites: [] });
  }
}
