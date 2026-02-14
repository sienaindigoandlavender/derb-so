import { createClient } from "@supabase/supabase-js";

const nexusUrl = process.env.NEXUS_SUPABASE_URL || "https://placeholder.supabase.co";
const nexusKey = process.env.NEXUS_SUPABASE_ANON_KEY || "placeholder";

const nexus = createClient(nexusUrl, nexusKey);

export interface NexusContentSite {
  id: number;
  site_label: string;
  site_url: string;
  display_order: number;
  is_active: boolean;
}

export async function getNexusContentSites(): Promise<NexusContentSite[]> {
  try {
    const { data, error } = await nexus
      .from("nexus_content_sites")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("[Nexus] Content sites error:", error.message);
      return [];
    }
    return (data as NexusContentSite[]) || [];
  } catch (err) {
    console.error("[Nexus] Content sites fetch failed:", err);
    return [];
  }
}

export { nexus };
