import { createClient } from "@supabase/supabase-js";

// ============================================================
// Nexus Supabase — shared config across all brands
// Replaces old Google Sheets–based nexus
// ============================================================

const nexusUrl = process.env.NEXUS_SUPABASE_URL || "https://placeholder.supabase.co";
const nexusKey = process.env.NEXUS_SUPABASE_ANON_KEY || "placeholder";

const nexus = createClient(nexusUrl, nexusKey);

const SITE_ID = process.env.SITE_ID || "riad-di-siena";

// ============================================================
// Site Configuration
// ============================================================

export interface SiteConfig {
  site_id: string;
  site_name: string;
  site_url: string;
  legal_entity: string;
  contact_email: string;
  contact_phone: string | null;
  whatsapp: string | null;
  jurisdiction_country: string;
  jurisdiction_city: string;
  address_line1: string;
  address_line2: string;
  site_type: string;
  parent_brand: string | null;
}

let siteConfigCache: SiteConfig | null = null;
let siteConfigCacheTime = 0;
const CACHE_TTL = 60 * 60 * 1000;

export async function getSiteConfig(): Promise<SiteConfig | null> {
  if (siteConfigCache && Date.now() - siteConfigCacheTime < CACHE_TTL) {
    return siteConfigCache;
  }
  try {
    const { data, error } = await nexus
      .from("nexus_sites")
      .select("*")
      .eq("site_id", SITE_ID)
      .single();
    if (error) {
      console.error("[Nexus] Site config error:", error.message);
      return null;
    }
    siteConfigCache = data as SiteConfig;
    siteConfigCacheTime = Date.now();
    return siteConfigCache;
  } catch (err) {
    console.error("[Nexus] Site config fetch failed:", err);
    return null;
  }
}

// ============================================================
// Template Variable Resolution
// ============================================================

export async function replaceTemplateVariables(content: string): Promise<string> {
  const siteConfig = await getSiteConfig();
  if (!siteConfig) {
    const fallbackVars: Record<string, string> = {
      "{{site_name}}": "Riad di Siena",
      "{{site_url}}": "https://www.riaddisiena.com",
      "{{legal_entity}}": "Riad di Siena",
      "{{contact_email}}": "happy@riaddisiena.com",
      "{{jurisdiction_country}}": "Morocco",
      "{{jurisdiction_city}}": "Marrakech",
      "{{address_line1}}": "37 Derb Fhal Zefriti, Laksour",
      "{{address_line2}}": "Marrakech 40000, Morocco",
    };
    let result = content;
    for (const [placeholder, value] of Object.entries(fallbackVars)) {
      result = result.replace(new RegExp(placeholder.replace(/[{}]/g, "\\$&"), "g"), value);
    }
    return result;
  }
  const templateVars: Record<string, string> = {
    "{{site_name}}": siteConfig.site_name,
    "{{site_url}}": siteConfig.site_url,
    "{{legal_entity}}": siteConfig.legal_entity,
    "{{contact_email}}": siteConfig.contact_email || "",
    "{{contact_phone}}": siteConfig.contact_phone || "",
    "{{whatsapp}}": siteConfig.whatsapp || "",
    "{{jurisdiction_country}}": siteConfig.jurisdiction_country || "",
    "{{jurisdiction_city}}": siteConfig.jurisdiction_city || "",
    "{{address_line1}}": siteConfig.address_line1 || "",
    "{{address_line2}}": siteConfig.address_line2 || "",
  };
  let result = content;
  for (const [placeholder, value] of Object.entries(templateVars)) {
    result = result.replace(new RegExp(placeholder.replace(/[{}]/g, "\\$&"), "g"), value);
  }
  return result;
}

// ============================================================
// Legal Pages
// ============================================================

export async function getLegalPageContent(pageId: string): Promise<{
  title: string;
  sections: { title: string; content: string }[];
}> {
  try {
    const { data, error } = await nexus
      .from("nexus_legal_pages")
      .select("*")
      .eq("page_id", pageId)
      .order("section_order", { ascending: true });
    if (error || !data || data.length === 0) {
      return { title: "", sections: [] };
    }
    const title = data[0].page_title;
    const sections = await Promise.all(
      data.map(async (s: any) => ({
        title: s.section_title,
        content: await replaceTemplateVariables(s.section_content),
      }))
    );
    return { title, sections };
  } catch (err) {
    console.error("[Nexus] Legal page error:", err);
    return { title: "", sections: [] };
  }
}

export async function getLegalPageBySlug(slug: string): Promise<{ title: string; content: string } | null> {
  try {
    const pageContent = await getLegalPageContent(slug);
    if (!pageContent.title && pageContent.sections.length === 0) return null;
    const content = pageContent.sections
      .map((s) => `<h2>${s.title}</h2>\n${s.content}`)
      .join("\n\n");
    return { title: pageContent.title, content };
  } catch (error) {
    console.error(`[Nexus] Error fetching legal page ${slug}:`, error);
    return null;
  }
}

// ============================================================
// Content Sites Network (shared footer)
// ============================================================

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

// ============================================================
// Helpers
// ============================================================

export function getSiteId(): string {
  return SITE_ID;
}

export { nexus };
