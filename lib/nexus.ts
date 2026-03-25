// ============================================
// Formerly Nexus — now self-contained
// All legal content hardcoded with Derb values
// No external Supabase dependency
// ============================================

// ============================================================
// Site Configuration (hardcoded)
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

const SITE_CONFIG: SiteConfig = {
  site_id: "derb",
  site_name: "Derb",
  site_url: "https://derb.so",
  legal_entity: "Derb",
  contact_email: "hello@derb.so",
  contact_phone: null,
  whatsapp: null,
  jurisdiction_country: "Morocco",
  jurisdiction_city: "Marrakech",
  address_line1: "37 Derb Fhal Zefriti, Laksour",
  address_line2: "Marrakech 40000, Morocco",
  site_type: "content",
  parent_brand: "slow-morocco",
};

export async function getSiteConfig(): Promise<SiteConfig> {
  return SITE_CONFIG;
}

// ============================================================
// Template Variable Resolution (no-op — already resolved)
// ============================================================

export async function replaceTemplateVariables(content: string): Promise<string> {
  return content;
}

// ============================================================
// Legal Pages (hardcoded)
// ============================================================

const LEGAL_PAGES: Record<string, { title: string; sections: { title: string; content: string }[] }> = {
  terms: {
    title: "Terms of Service",
    sections: [
      { title: "Agreement", content: "By accessing or using https://derb.so, operated by Derb, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services." },
      { title: "Services", content: "Derb provides services as described on our website. All content, features, and functionality are owned by Derb and are protected by international copyright, trademark, and other intellectual property laws." },
      { title: "User Responsibilities", content: "You agree to provide accurate and complete information, maintain the confidentiality of your account, comply with all applicable laws, and not misuse or attempt to disrupt our services." },
      { title: "Intellectual Property", content: "All content on this site, including text, graphics, logos, images, photography, videos, and design, is the property of Derb and is protected by copyright laws." },
      { title: "Limitation of Liability", content: "To the maximum extent permitted by law, Derb shall not be liable for indirect, incidental, or consequential damages arising from use of our services." },
      { title: "Governing Law", content: "These terms are governed by the laws of Morocco. Any disputes shall be resolved in the courts of Marrakech." },
      { title: "Contact", content: "Derb, 37 Derb Fhal Zefriti, Laksour, Marrakech 40000, Morocco. Email: hello@derb.so" },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      { title: "Introduction", content: "Derb (\"we\", \"us\", or \"our\") respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you visit https://derb.so." },
      { title: "Information We Collect", content: "Information you provide: contact information (name, email) and communications you send us. Information collected automatically: device information, usage data, and cookies." },
      { title: "How We Use Your Information", content: "To communicate with you about inquiries, improve our website and services, and send occasional updates if you have opted in." },
      { title: "Your Rights", content: "You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at hello@derb.so." },
      { title: "Data Security", content: "We implement appropriate security measures including SSL/TLS encryption." },
      { title: "Contact", content: "Derb, 37 Derb Fhal Zefriti, Laksour, Marrakech 40000, Morocco. Email: hello@derb.so" },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    sections: [
      { title: "General", content: "The information provided on https://derb.so by Derb is for general informational purposes only. This content does not constitute professional travel, medical, legal, or financial advice." },
      { title: "Accuracy", content: "While we make every effort to ensure information is accurate and up-to-date, we cannot guarantee completeness. Conditions and regulations change frequently." },
      { title: "Limitation of Liability", content: "Derb shall not be liable for any damages arising from use or inability to use this site, reliance on information provided, or errors or omissions in content." },
      { title: "Contact", content: "Derb, 37 Derb Fhal Zefriti, Laksour, Marrakech 40000, Morocco. Email: hello@derb.so" },
    ],
  },
  "intellectual-property": {
    title: "Intellectual Property",
    sections: [
      { title: "Ownership", content: "All intellectual property on https://derb.so is owned by or licensed to Derb." },
      { title: "Copyrighted Material", content: "Website design and layout, written content and copy, photography and images, videos and multimedia, and descriptions are all protected." },
      { title: "Permitted Use", content: "You may view content for personal, non-commercial use, share links to our pages, print pages for personal reference, and quote brief excerpts with proper attribution." },
      { title: "Prohibited Use", content: "Without written permission, you may not copy, reproduce, or duplicate content, modify or create derivative works, distribute or use content commercially, remove copyright notices, or scrape content using automated tools." },
      { title: "Permission Requests", content: "To request permission to use our content, contact hello@derb.so with subject line 'IP License Request'." },
      { title: "Contact", content: "Derb, 37 Derb Fhal Zefriti, Laksour, Marrakech 40000, Morocco. Email: hello@derb.so" },
    ],
  },
};

export async function getLegalPageContent(pageId: string): Promise<{
  title: string;
  sections: { title: string; content: string }[];
}> {
  const page = LEGAL_PAGES[pageId];
  if (!page) return { title: "", sections: [] };
  return page;
}

export async function getLegalPageBySlug(slug: string): Promise<{ title: string; content: string } | null> {
  const page = LEGAL_PAGES[slug];
  if (!page) return null;
  const content = page.sections
    .map((s) => `<h2>${s.title}</h2>\n${s.content}`)
    .join("\n\n");
  return { title: page.title, content };
}

// ============================================================
// Content Sites Network (hardcoded — empty)
// ============================================================

export interface NexusContentSite {
  id: number;
  site_label: string;
  site_url: string;
  display_order: number;
  is_active: boolean;
}

export async function getNexusContentSites(): Promise<NexusContentSite[]> {
  return [];
}

// ============================================================
// Helpers
// ============================================================

export function getSiteId(): string {
  return "derb";
}
