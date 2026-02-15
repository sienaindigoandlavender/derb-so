import NexusLegalPage from "@/components/NexusLegalPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Derb",
  description: "Privacy policy for derb.so",
};

export default function PrivacyPage() {
  return <NexusLegalPage pageId="privacy" fallbackTitle="Privacy Policy" />;
}
