import NexusLegalPage from "@/components/NexusLegalPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Derb",
  description: "Privacy policy for derb.so",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://derb.so/privacy" },
};

export default function PrivacyPage() {
  return <NexusLegalPage pageId="privacy" fallbackTitle="Privacy Policy" />;
}
